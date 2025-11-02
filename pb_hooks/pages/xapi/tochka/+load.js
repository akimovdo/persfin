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
  const makeApiRequest = async (endpoint, options = {}) => {
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
      console.error('Ошибка при обновлении last_sync_date:', error)
      return false
    }
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
    formatDateForApi,
    ENDPOINTS
  }
}
