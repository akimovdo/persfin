<%
// +load.js для partners
// Загрузка данных с фильтрами и пагинацией

try {
    // Извлекаем query-параметры
    const searchQuery = request.query.search || '';
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.per_page) || 20;
    
    // Строим фильтр для поиска
    let filter = '';
    if (searchQuery) {
        filter = `name ~ "${searchQuery}"`;
    }
    
    // Запрашиваем партнеров с пагинацией
    const collection = $app.findCollectionByNameOrId('partners');
    const resultList = $app.findRecordsByFilter(
        'partners',
        filter,
        '-created', // сортировка по дате создания (новые первыми)
        perPage,
        (page - 1) * perPage
    );
    
    // Преобразуем Records в plain objects для EJS
    const partners = resultList.map(record => ({
        id: record.id,
        name: record.getString('name') || '',
        created: record.getString('created'),
        updated: record.getString('updated')
    }));
    
    // Считаем общее количество записей для пагинации
    const totalItems = $app.countRecords('partners', filter);
    const totalPages = Math.ceil(totalItems / perPage);
    
    // Статистика
    const stats = {
        total: totalItems
    };
    
    // Возвращаем данные в шаблон
    return {
        partners,
        pagination: {
            page,
            perPage,
            totalItems,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
        },
        filters: {
            search: searchQuery
        },
        stats
    };
    
} catch (error) {
    console.error('[partners/+load] Error:', error);
    return {
        partners: [],
        pagination: {
            page: 1,
            perPage: 20,
            totalItems: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false
        },
        filters: {
            search: ''
        },
        stats: {
            total: 0
        },
        error: error.message || 'Ошибка загрузки данных'
    };
}
%>
