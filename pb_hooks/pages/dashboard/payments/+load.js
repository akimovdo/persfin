// +load.js для payments
// Загрузка данных с фильтрами и пагинацией

module.exports = function(api) {
try {
    const { url, request } = api;
    
    // url это функция! Нужно вызвать её с request.url
    const parsedUrl = url(request.url);
    const query = parsedUrl.query || {};
    
    const searchQuery = query.search ? String(query.search).trim() : '';
    const filterIgnore = query.ignore ? String(query.ignore) : ''; // 'true', 'false', или ''
    const page = Math.max(1, Number(query.page || 1));
    const perPage = Math.max(1, Number(query.per_page || 20));
    
    // Загружаем все платежи и фильтруем на уровне JS
    const allRecords = $app.findRecordsByFilter('payments', '', '-date', 0, 0);
    const allPayments = [];
    
    for (let i = 0; i < allRecords.length; i++) {
        const record = allRecords[i];
        
        const payment = {
            id: record.id,
            creditDebitIndicator: record.getString('creditDebitIndicator') || '',
            payer: record.getString('payer') || '',
            sum: record.getFloat('sum') || 0,
            date: record.getString('date') || '',
            description: record.getString('description') || '',
            transactionId: record.getString('transactionId') || '',
            ignore: record.getBool('ignore') || false,
            created: record.getString('created'),
            updated: record.getString('updated')
        };
        
        // Загружаем связь с начислением вручную
        try {
            const accrualId = record.getString('accural');
            if (accrualId) {
                const accrualRecord = $app.findRecordById('accruals', accrualId);
                if (accrualRecord) {
                    payment.accural = {
                        id: accrualRecord.getString('id'),
                        name: accrualRecord.getString('name') || ''
                    };
                }
            }
        } catch (e) {
            console.error('[payments/+load] Error expanding accural:', e);
        }
        
        allPayments.push(payment);
    }
    
    // Фильтрация по признакам ignore/search
    let filteredPayments = allPayments;
    if (filterIgnore === 'true') {
        filteredPayments = filteredPayments.filter(item => item.ignore === true);
    } else if (filterIgnore === 'false') {
        filteredPayments = filteredPayments.filter(item => item.ignore === false);
    }
    
    const searchLower = searchQuery.toLowerCase();
    if (searchLower) {
        filteredPayments = filteredPayments.filter(item =>
            item.payer.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower)
        );
    }
    
    // Пагинация
    const totalItems = filteredPayments.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const safePage = totalPages > 0 ? Math.min(page, totalPages) : 1;
    const startIndex = (safePage - 1) * perPage;
    const payments = filteredPayments.slice(startIndex, startIndex + perPage);
    
    // Статистика по текущему фильтру
    const totalSum = filteredPayments.reduce((sum, item) => sum + (item.sum || 0), 0);
    
    // Считаем статистику из уже загруженных данных (не из БД)
    const ignoredCount = allPayments.filter(p => p.ignore === true).length;
    const activeCount = allPayments.filter(p => p.ignore === false).length;
    
    const stats = {
        total: totalItems,
        totalSum: totalSum.toFixed(2),
        ignored: ignoredCount,
        active: activeCount
    };
    
    // Возвращаем данные в шаблон
    return {
        payments,
        pagination: {
            page: safePage,
            perPage,
            totalItems,
            totalPages,
            hasNext: safePage < totalPages,
            hasPrev: safePage > 1
        },
        filters: {
            search: searchQuery,
            ignore: filterIgnore
        },
        stats
    };
    
} catch (error) {
    console.error('[payments/+load] Error:', error);
    return {
        payments: [],
        pagination: {
            page: 1,
            perPage: 20,
            totalItems: 0,
            totalPages: 0,
            hasNext: false,
            hasPrev: false
        },
        filters: {
            search: '',
            ignore: ''
        },
        stats: {
            total: 0,
            totalSum: '0.00',
            ignored: 0,
            active: 0
        },
        error: error.message || 'Ошибка загрузки данных'
    };
}
};
