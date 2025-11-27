// +load.js для partners
// Загрузка данных с фильтрами и пагинацией

module.exports = function(api) {
try {
    const { url, request } = api;
    // url это функция! Вызываем её с request.url
    const parsedUrl = url(request.url);
    const query = parsedUrl.query || {};
    const searchQuery = (query.search || '').toString().trim();
    const page = Math.max(1, Number(query.page || 1));
    const perPage = Math.max(1, Number(query.per_page || 20));
    
    // Загружаем все записи и фильтруем на уровне JS (так избегаем проблем с dbx.Expression)
    const allRecords = $app.findRecordsByFilter('partners', '', '-created', 0, 0);
    const allPartners = allRecords.map(record => ({
        id: record.id,
        name: record.getString('name') || '',
        created: record.getString('created'),
        updated: record.getString('updated')
    }));
    
    const searchLower = searchQuery.toLowerCase();
    const filteredPartners = searchLower
        ? allPartners.filter(item => item.name.toLowerCase().includes(searchLower))
        : allPartners;
    
    const totalItems = filteredPartners.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const safePage = totalPages > 0 ? Math.min(page, totalPages) : 1;
    const startIndex = (safePage - 1) * perPage;
    const partners = filteredPartners.slice(startIndex, startIndex + perPage);
    
    const stats = {
        total: totalItems
    };
    
    // Возвращаем данные в шаблон
    return {
        partners,
        pagination: {
            page: safePage,
            perPage,
            totalItems,
            totalPages,
            hasNext: safePage < totalPages,
            hasPrev: safePage > 1
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
};
