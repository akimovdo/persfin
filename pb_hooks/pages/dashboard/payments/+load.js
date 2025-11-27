<%
// +load.js для payments
// Загрузка данных с фильтрами и пагинацией

try {
    // Извлекаем query-параметры
    const searchQuery = request.query.search || '';
    const filterIgnore = request.query.ignore || ''; // all, true, false
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.per_page) || 20;
    
    // Строим фильтр для поиска
    let filters = [];
    
    if (searchQuery) {
        filters.push(`(payer ~ "${searchQuery}" || description ~ "${searchQuery}")`);
    }
    
    if (filterIgnore === 'true') {
        filters.push('ignore = true');
    } else if (filterIgnore === 'false') {
        filters.push('ignore = false');
    }
    
    const filter = filters.join(' && ') || '';
    
    // Запрашиваем платежи с пагинацией и expand для связанных записей
    const resultList = $app.findRecordsByFilter(
        'payments',
        filter,
        '-date', // сортировка по дате (новые первыми)
        perPage,
        (page - 1) * perPage,
        'accural' // expand связанного начисления
    );
    
    // Преобразуем Records в plain objects для EJS
    const payments = resultList.map(record => {
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
        
        // Expand accural (начисление)
        const accrualRecord = record.expandedOne('accural');
        if (accrualRecord) {
            payment.accural = {
                id: accrualRecord.id,
                name: accrualRecord.getString('name') || ''
            };
        }
        
        return payment;
    });
    
    // Считаем общее количество записей для пагинации
    const totalItems = $app.countRecords('payments', filter);
    const totalPages = Math.ceil(totalItems / perPage);
    
    // Статистика
    const totalSum = $app.findRecordsByFilter('payments', filter, '', 0, 0)
        .reduce((sum, record) => sum + (record.getFloat('sum') || 0), 0);
    
    const ignoredCount = $app.countRecords('payments', 'ignore = true');
    const activeCount = $app.countRecords('payments', 'ignore = false');
    
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
            page,
            perPage,
            totalItems,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
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
%>
