/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3987185601")

  // update view query to include accrual_id
  collection.options = {
    "query": "SELECT \n  a.id as id,\n  a.id as accrual_id,\n  a.number as number,\n  a.name as accrual_name,\n  a.partner as partner_id,\n  p.name as partner_name,\n  a.cost_item as cost_item_id,\n  ci.name as cost_item_name,\n  a.sum as total_accrued,\n  COALESCE(SUM(pay.sum), 0) as total_paid,\n  (a.sum - COALESCE(SUM(pay.sum), 0)) as balance,\n  COUNT(pay.id) as payments_count,\n  a.repayment_date as repayment_date,\n  CAST((julianday(a.repayment_date) - julianday('now')) AS INTEGER) as days_difference,\n  a.is_forced_closed as is_forced_closed,\n  a.description as description,\n  a.created as created,\n  a.updated as updated\nFROM accruals a\nLEFT JOIN partners p ON a.partner = p.id\nLEFT JOIN cost_items ci ON a.cost_item = ci.id\nLEFT JOIN payments pay ON pay.accural = a.id AND pay.ignore = FALSE\nGROUP BY a.id"
  }

  // add field for accrual_id
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "accrual_id",
    "max": 0,
    "min": 0,
    "name": "accrual_id",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3987185601")

  // revert to old query without accrual_id
  collection.options = {
    "query": "SELECT \n  a.id as id,\n  a.number as number,\n  a.name as accrual_name,\n  a.partner as partner_id,\n  p.name as partner_name,\n  a.cost_item as cost_item_id,\n  ci.name as cost_item_name,\n  a.sum as total_accrued,\n  COALESCE(SUM(pay.sum), 0) as total_paid,\n  (a.sum - COALESCE(SUM(pay.sum), 0)) as balance,\n  COUNT(pay.id) as payments_count,\n  a.repayment_date as repayment_date,\n  CAST((julianday(a.repayment_date) - julianday('now')) AS INTEGER) as days_difference,\n  a.is_forced_closed as is_forced_closed,\n  a.description as description,\n  a.created as created,\n  a.updated as updated\nFROM accruals a\nLEFT JOIN partners p ON a.partner = p.id\nLEFT JOIN cost_items ci ON a.cost_item = ci.id\nLEFT JOIN payments pay ON pay.accural = a.id AND pay.ignore = FALSE\nGROUP BY a.id"
  }

  // remove accrual_id field
  collection.fields.removeById("accrual_id")

  return app.save(collection)
})
