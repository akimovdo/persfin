/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Пересоздаём представление accruals_all_with_status с исправленной формулой days_difference
  console.log('=== КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: ОБНОВЛЕНИЕ days_difference ===');
  
  const collection = app.findCollectionByNameOrId("pbc_3987185601")

  // Обновляем запрос представления с исправленной формулой
  collection.options = {
    "query": "SELECT \n  a.id as id,\n  a.id as accrual_id,\n  a.number as number,\n  a.name as accrual_name,\n  a.partner as partner_id,\n  p.name as partner_name,\n  a.cost_item as cost_item_id,\n  ci.name as cost_item_name,\n  a.sum as total_accrued,\n  COALESCE(SUM(pay.sum), 0) as total_paid,\n  (a.sum - COALESCE(SUM(pay.sum), 0)) as balance,\n  COUNT(pay.id) as payments_count,\n  a.repayment_date as repayment_date,\n  CAST((julianday(a.repayment_date) - julianday(date('now'))) AS INTEGER) as days_difference,\n  a.is_forced_closed as is_forced_closed,\n  a.description as description,\n  a.created as created,\n  a.updated as updated\nFROM accruals a\nLEFT JOIN partners p ON a.partner = p.id\nLEFT JOIN cost_items ci ON a.cost_item = ci.id\nLEFT JOIN payments pay ON pay.accural = a.id AND pay.ignore = FALSE\nGROUP BY a.id"
  }

  console.log('ИСПРАВЛЕНИЕ: Используется julianday(date(\'now\')) вместо julianday(\'now\')');
  
  return app.save(collection)
  
}, (app) => {
  // rollback - возвращаем старую формулу
  console.log('ОТКАТ: Возвращаем старую формулу days_difference');
  
  const collection = app.findCollectionByNameOrId("pbc_3987185601")

  collection.options = {
    "query": "SELECT \n  a.id as id,\n  a.id as accrual_id,\n  a.number as number,\n  a.name as accrual_name,\n  a.partner as partner_id,\n  p.name as partner_name,\n  a.cost_item as cost_item_id,\n  ci.name as cost_item_name,\n  a.sum as total_accrued,\n  COALESCE(SUM(pay.sum), 0) as total_paid,\n  (a.sum - COALESCE(SUM(pay.sum), 0)) as balance,\n  COUNT(pay.id) as payments_count,\n  a.repayment_date as repayment_date,\n  CAST((julianday(a.repayment_date) - julianday('now')) AS INTEGER) as days_difference,\n  a.is_forced_closed as is_forced_closed,\n  a.description as description,\n  a.created as created,\n  a.updated as updated\nFROM accruals a\nLEFT JOIN partners p ON a.partner = p.id\nLEFT JOIN cost_items ci ON a.cost_item = ci.id\nLEFT JOIN payments pay ON pay.accural = a.id AND pay.ignore = FALSE\nGROUP BY a.id"
  }

  return app.save(collection)
})