/** @type {import('pocketpages').MiddlewareLoaderFunc} */
module.exports = function (api) {
  const { response } = api

  try {
    // Получить активную конфигурацию Точка банка
    const config = $app.findFirstRecordByFilter('tochka_config', 'is_active = true')

    // Проверка наличия конфигурации
    if (!config) {
      return response.json(503, { 
        error: 'Конфигурация Точка банка не найдена',
        message: 'Необходимо настроить интеграцию с Точка банком в админ-панели'
      })
    }

    // Валидация обязательных полей
    const jwt_token = config.getString('jwt_token')
    const client_id = config.getString('client_id')
    const account_id = config.getString('account_id')
    
    if (!jwt_token || !client_id || !account_id) {
      return response.json(503, { 
        error: 'Неполная конфигурация Точка банка',
        message: 'Отсутствуют обязательные поля: jwt_token, client_id или account_id'
      })
    }

    // Передать конфигурацию дальше
    return { 
      tochkaConfig: {
        jwt_token: jwt_token,
        client_id: client_id,
        account_id: account_id,
  id: config.id
      }
    }
  } catch (error) {
    return response.json(500, {
      error: 'Middleware Error',
      message: error.message || 'Ошибка в middleware',
      stack: error.stack
    })
  }
}
