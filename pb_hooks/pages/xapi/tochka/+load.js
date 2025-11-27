/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { data } = api

  // Базовый URL API Точка банка
  const TOCHKA_API_BASE = 'https://enter.tochka.com/uapi/open-banking/v1.0'

  /**
   * Выполнить запрос к API Точка банка
   * @param {string} endpoint - Путь эндпоинта (например, '/statements')
   * @param {object} options - Опции запроса
   * @param {string} options.method - HTTP метод (GET, POST, и т.д.)
   * @param {object} options.body - Тело запроса (будет сериализовано в JSON)
   * @param {object} options.headers - Дополнительные заголовки
   * @returns {object} Ответ от API или объект с ошибкой
   */
  const makeApiRequest = (endpoint, options = {}) => {
    const url = `${TOCHKA_API_BASE}${endpoint}`
    
    const headers = {
      'Authorization': `Bearer ${data.tochkaConfig.jwt_token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers
    }

    try {
      const response = $http.send({
        url: url,
        method: options.method || 'GET',
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        timeout: 30 // 30 секунд
      })

      // Проверка успешности запроса
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return {
          success: true,
          data: response.json,
          statusCode: response.statusCode
        }
      } else {
        return {
          success: false,
          error: 'API Error',
          message: response.json?.message || 'Ошибка при запросе к API Точка банка',
          statusCode: response.statusCode,
          details: response.json
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Request Failed',
        message: error.message || 'Не удалось выполнить запрос к API Точка банка',
        details: error
      }
    }
  }

  /**
   * Обновить дату последней синхронизации в конфигурации
   */
  const updateLastSyncDate = () => {
    try {
      const config = $app.findRecordById('tochka_config', data.tochkaConfig.id)
      config.set('last_sync_date', new Date().toISOString())
      $app.save(config)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Обновить баланс по окончанию периода выписки
   * @param {number|string} balance
   */
  const updateEndDateBalance = (balance) => {
    try {
      const config = $app.findRecordById('tochka_config', data.tochkaConfig.id)
      config.set('endDateBalance', balance)
      config.set('last_sync_date', new Date().toISOString())
      $app.save(config)
      return true
    } catch (error) {
      return false
    }
  }

  /**
   * Сохранить транзакции выписки в коллекцию payments
   * @param {Array<any>} transactions
   */
  const saveTransactions = (transactions) => {
    const result = {
      saved: 0,
      skipped: 0,
      skippedInternal: 0,
      errors: []
    }

    if (!Array.isArray(transactions) || transactions.length === 0) {
      return result
    }

    const toNumber = (value) => {
      if (value === null || value === undefined) return 0
      if (typeof value === 'number') return value
      const str = String(value).replace(',', '.').replace(/[^0-9.\-]/g, '')
      const parsed = Number(str)
      return Number.isFinite(parsed) ? parsed : 0
    }

    const toIsoDate = (value) => {
      if (!value) return new Date().toISOString()
      const date = value instanceof Date ? value : new Date(value)
      if (Number.isNaN(date.getTime())) return new Date().toISOString()
      return date.toISOString()
    }

    const escapeFilterValue = (val) => String(val).replace(/"/g, '\\"')
    
    /**
     * Проверка: является ли транзакция внутренним переводом (перевод собственных средств)
     * @param {object} tx - транзакция
     * @returns {boolean}
     */
    const isInternalTransfer = (tx) => {
      // Признак 1: Описание содержит ключевые слова
      const description = tx.description || tx.remittanceInformationUnstructured || ''
      if (description.includes('Перевод собственных средств')) {
        return true
      }
      
      // Признак 2: ИНН плательщика и получателя совпадают (и не пустые)
      const debtorINN = tx.DebtorParty?.inn || tx.debtorParty?.inn
      const creditorINN = tx.CreditorParty?.inn || tx.creditorParty?.inn
      
      if (debtorINN && creditorINN && debtorINN === creditorINN) {
        return true
      }
      
      // Признак 3: Счета плательщика и получателя совпадают (и в том же банке)
      const debtorAccount = tx.DebtorAccount?.identification || tx.debtorAccount?.identification
      const creditorAccount = tx.CreditorAccount?.identification || tx.creditorAccount?.identification
      const debtorBIK = tx.DebtorAgent?.identification || tx.debtorAgent?.identification
      const creditorBIK = tx.CreditorAgent?.identification || tx.creditorAgent?.identification
      
      if (debtorAccount && creditorAccount && 
          debtorAccount === creditorAccount && 
          debtorBIK === creditorBIK) {
        return true
      }
      
      return false
    }

    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i] || {}

      try {
        const transactionId = tx.transactionId || tx.TransactionId || tx.entryReference

        if (!transactionId) {
          result.errors.push({ index: i, error: 'transactionId отсутствует' })
          continue
        }
        
        // Проверяем, не является ли это внутренним переводом
        if (isInternalTransfer(tx)) {
          result.skippedInternal += 1
          continue
        }

        // Улучшенное извлечение суммы с множественными попытками
        let amount = 0
        
        // Попытка 1: Amount.amount (с заглавной - основной формат API Точка)
        if (tx.Amount && typeof tx.Amount.amount !== 'undefined') {
          amount = toNumber(tx.Amount.amount)
        }
        // Попытка 2: transactionAmount.amount
        else if (tx.transactionAmount && typeof tx.transactionAmount.amount !== 'undefined') {
          amount = toNumber(tx.transactionAmount.amount)
        }
        // Попытка 3: transactionAmount.Amount (с заглавной)
        else if (tx.transactionAmount && typeof tx.transactionAmount.Amount !== 'undefined') {
          amount = toNumber(tx.transactionAmount.Amount)
        }
        // Попытка 4: amount напрямую
        else if (typeof tx.amount !== 'undefined') {
          amount = toNumber(tx.amount)
        }
        // Попытка 5: Amount напрямую (если это число)
        else if (typeof tx.Amount === 'number') {
          amount = toNumber(tx.Amount)
        }
        // Попытка 6: sum / Sum
        else if (typeof tx.sum !== 'undefined') {
          amount = toNumber(tx.sum)
        }
        else if (typeof tx.Sum !== 'undefined') {
          amount = toNumber(tx.Sum)
        }
        
        // Если сумма всё равно 0, логируем предупреждение
        if (amount === 0) {
          result.errors.push({ 
            index: i, 
            transactionId: transactionId,
            warning: 'Сумма транзакции = 0 или не найдена',
            availableFields: Object.keys(tx).join(', ')
          })
        }

        const creditDebitIndicator = tx.creditDebitIndicator || tx.creditDebit || ''
        const bookingDate = tx.bookingDate || tx.documentProcessDate || tx.valueDate || tx.date || null
        
        // Извлекаем плательщика из разных возможных полей
        const payer = tx.debtorName || 
                      tx.creditorName || 
                      tx.counterpartyName || 
                      tx.DebtorParty?.name || 
                      tx.debtorParty?.name || 
                      tx.CreditorParty?.name || 
                      tx.creditorParty?.name || 
                      ''

        let description = ''
        if (typeof tx.remittanceInformationUnstructured === 'string') {
          description = tx.remittanceInformationUnstructured
        } else if (Array.isArray(tx.remittanceInformationUnstructured) && tx.remittanceInformationUnstructured.length > 0) {
          description = tx.remittanceInformationUnstructured.join('; ')
        } else if (tx.remittanceInformation && typeof tx.remittanceInformation === 'object') {
          const unstructured = tx.remittanceInformation.unstructured
          if (Array.isArray(unstructured) && unstructured.length > 0) {
            description = unstructured.join('; ')
          } else if (typeof unstructured === 'string') {
            description = unstructured
          }
        } else if (typeof tx.description === 'string') {
          description = tx.description
        }

        const filterValue = escapeFilterValue(transactionId)
        let existing = null
        try {
          existing = $app.findFirstRecordByFilter('payments', `transactionId = "${filterValue}"`)
        } catch (findError) {
          existing = null
        }

  const record = existing ? existing : new Record($app.findCollectionByNameOrId('payments'))

        record.set('transactionId', transactionId)
        record.set('date', toIsoDate(bookingDate))
        record.set('creditDebitIndicator', creditDebitIndicator)
        record.set('payer', payer)
  record.set('sum', amount)
        record.set('description', description)
        // Сохраняем raw как строку JSON для совместимости
        record.set('raw', JSON.stringify(tx))

        if (!existing) {
          record.set('accural', '')
          record.set('wait_income', '')
          record.set('ignore', false)
        }

  $app.save(record)
  result.saved += 1
      } catch (error) {
        result.errors.push({ index: i, error: error.message || String(error) })
      }
    }

  const processed = result.saved + result.errors.length
  result.skipped = Math.max(0, transactions.length - processed)
    return result
  }

  /**
   * Форматировать дату для API Точка (YYYY-MM-DD)
   * @param {Date|string} date - Дата для форматирования
   * @returns {string} Отформатированная дата
   */
  const formatDateForApi = (date) => {
    const d = date instanceof Date ? date : new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Константы эндпоинтов
  const ENDPOINTS = {
    STATEMENTS: '/statements',
    STATEMENT: (accountId, statementId) => `/accounts/${accountId}/statements/${statementId}`
  }

  return {
    TOCHKA_API_BASE,
    makeApiRequest,
    updateLastSyncDate,
    updateEndDateBalance,
    saveTransactions,
    formatDateForApi,
    ENDPOINTS
  }
}
