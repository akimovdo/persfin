/** @type {import('pocketpages').PageDataLoaderFunc} */
module.exports = function (api) {
  const { url } = api;
  
  try {
    // Получаем query параметры
    const query = url?.query || {};
    const search = (query.q || '').toString().trim();
    const partnerId = (query.partner || '').toString().trim();
    const status = (query.status || '').toString().trim();
    const page = Math.max(1, Number(query.page || 1));
    const perPage = 30;
    
    // Строим фильтр
    const filters = [];
    
    if (search) {
      const esc = (v) => String(v || '').replace(/"/g, '\\"');
      filters.push(`(name ~ "${esc(search)}" || number ~ "${esc(search)}")`);
    }
    
    if (partnerId) {
      filters.push(`partner = "${partnerId}"`);
    }
    
    if (status === 'active') {
      filters.push('Forced_closure = false');
    } else if (status === 'closed') {
      filters.push('Forced_closure = true');
    }
    
    const filterString = filters.join(' && ');
    
    // Загружаем начисления
    const allRecords = $app.findRecordsByFilter(
      'accruals',
      filterString,
      '-repayment_date',
      0, 0
    );
    
    // Преобразуем Records в plain objects с expand
    const allItems = [];
    for (let i = 0; i < allRecords.length; i++) {
      const record = allRecords[i];
      
      const item = {
        id: record.getString('id'),
        name: record.getString('name'),
        number: record.getString('number'),
        sum: record.getFloat('sum'),
        repayment_date: record.getString('repayment_date'),
        description: record.getString('description'),
        Forced_closure: record.getBool('Forced_closure'),
        created: record.getString('created'),
        expand: {}
      };
      
      // Expand партнёра
      try {
        const pId = record.getString('partner');
        if (pId) {
          const partner = $app.findRecordById('partners', pId);
          item.expand.partner = {
            id: partner.getString('id'),
            name: partner.getString('name')
          };
        }
      } catch (e) {
        console.error('[accruals +load] Error expanding partner:', e);
      }
      
      // Expand статьи затрат
      try {
        const cId = record.getString('cost_item');
        if (cId) {
          const costItem = $app.findRecordById('cost_items', cId);
          item.expand.cost_item = {
            id: costItem.getString('id'),
            name: costItem.getString('name')
          };
        }
      } catch (e) {
        console.error('[accruals +load] Error expanding cost_item:', e);
      }
      
      allItems.push(item);
    }
    
    // Пагинация
    const totalItems = allItems.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;
    const items = allItems.slice(startIndex, startIndex + perPage);
    
    // Статистика (по всем записям, не только текущей странице)
    const now = new Date();
    const stats = {
      total: totalItems,
      totalSum: allItems.reduce((sum, item) => sum + item.sum, 0),
      active: allItems.filter(i => !i.Forced_closure).length,
      closed: allItems.filter(i => i.Forced_closure).length,
      overdue: allItems.filter(i => !i.Forced_closure && new Date(i.repayment_date) < now).length
    };
    
    // Загружаем списки для фильтров
    const partnersRecords = $app.findRecordsByFilter('partners', '', 'name', 0, 0);
    const partners = partnersRecords.map(p => ({
      id: p.getString('id'),
      name: p.getString('name')
    }));
    
    return { 
      items,
      stats,
      partners,
      pagination: {
        page,
        perPage,
        totalItems,
        totalPages,
        hasMore: page < totalPages
      },
      filters: { search, partnerId, status },
      error: null
    };
    
  } catch (e) {
    console.error('[accruals +load] Error:', e);
    return { 
      items: [],
      stats: null,
      partners: [],
      pagination: null,
      filters: { search: '', partnerId: '', status: '' },
      error: e.message || 'Ошибка загрузки данных'
    };
  }
};
