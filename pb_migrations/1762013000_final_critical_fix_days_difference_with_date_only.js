/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ: используем DATE() для репейment_date тоже
  console.log('=== ФИНАЛЬНОЕ КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: days_difference с DATE() ===');
  
  const collection = app.findCollectionByNameOrId("pbc_3987185601")

  // Обновляем запрос представления с исправленной формулой DATE для обеих дат
  collection.options = {
    "query": "SELECT \n  a.id,\n  a.number,\n  a.name as accrual_name,\n  a.partner as partner_id,\n  p.name as partner_name,\n  a.cost_item as cost_item_id,\n  ci.name as cost_item_name,\n  a.sum as total_accrued,\n  COALESCE(SUM(pay.sum), 0) as total_paid,\n  (a.sum - COALESCE(SUM(pay.sum), 0)) as balance,\n  a.Forced_closure as is_forced_closed,\n  a.repayment_date,\n  CAST((julianday(DATE(a.repayment_date)) - julianday(date('now'))) AS INTEGER) as days_difference,\n  COUNT(pay.id) as payments_count,\n  a.description,\n  a.created,\n  a.updated\nFROM accruals a\nLEFT JOIN partners p ON a.partner = p.id\nLEFT JOIN cost_items ci ON a.cost_item = ci.id\nLEFT JOIN payments pay ON pay.accural = a.id\nGROUP BY a.id, a.number, a.name, a.partner, p.name, a.cost_item, ci.name, a.sum, a.Forced_closure, a.repayment_date, a.description, a.created, a.updated\nORDER BY a.Forced_closure ASC, a.repayment_date ASC"
  }

  console.log('ИСПРАВЛЕНИЕ: Используется DATE(a.repayment_date) и date(\'now\') для точного сравнения дат');
  
  return app.save(collection)
  
}, (app) => {
  // rollback - возвращаем предыдущую формулу
  console.log('ОТКАТ: Возвращаем формулу без DATE для repayment_date');
  
  const collection = app.findCollectionByNameOrId("pbc_3987185601")

  collection.options = {
    "query": "SELECT \n  a.id,\n  a.number,\n  a.name as accrual_name,\n  a.partner as partner_id,\n  p.name as partner_name,\n  a.cost_item as cost_item_id,\n  ci.name as cost_item_name,\n  a.sum as total_accrued,\n  COALESCE(SUM(pay.sum), 0) as total_paid,\n  (a.sum - COALESCE(SUM(pay.sum), 0)) as balance,\n  a.Forced_closure as is_forced_closed,\n  a.repayment_date,\n  CAST((julianday(a.repayment_date) - julianday(date('now'))) AS INTEGER) as days_difference,\n  COUNT(pay.id) as payments_count,\n  a.description,\n  a.created,\n  a.updated\nFROM accruals a\nLEFT JOIN partners p ON a.partner = p.id\nLEFT JOIN cost_items ci ON a.cost_item = ci.id\nLEFT JOIN payments pay ON pay.accural = a.id\nGROUP BY a.id, a.number, a.name, a.partner, p.name, a.cost_item, ci.name, a.sum, a.Forced_closure, a.repayment_date, a.description, a.created, a.updated\nORDER BY a.Forced_closure ASC, a.repayment_date ASC"
  }

  return app.save(collection)
})