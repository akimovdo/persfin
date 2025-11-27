/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  try {
    const collection = app.findCollectionByNameOrId("pbc_wait_incomes_status")

    // update view query to fix days_difference calculation by using date('now') instead of 'now'
    collection.options = {
      "viewQuery": "SELECT \n  w.id as id,\n  w.id as wait_income_id,\n  w.name as name,\n  w.sum as sum,\n  COALESCE(SUM(p.sum), 0) as total_received,\n  (w.sum - COALESCE(SUM(p.sum), 0)) as balance,\n  COUNT(p.id) as payments_count,\n  w.accural_month as accrual_month,\n  CAST((julianday(w.accural_month) - julianday(date('now'))) AS INTEGER) as days_difference,\n  w.created as created,\n  w.updated as updated\nFROM wait_incomes w\nLEFT JOIN payments p ON p.wait_income = w.id AND p.ignore = FALSE\nGROUP BY w.id"
    }

    return app.save(collection)
  } catch (e) {
    console.log("Collection pbc_wait_incomes_status not found, skipping migration")
    return null
  }
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("pbc_wait_incomes_status")

    // revert to old query with julianday('now')
    collection.options = {
      "viewQuery": "SELECT \n  w.id as id,\n  w.id as wait_income_id,\n  w.name as name,\n  w.sum as sum,\n  COALESCE(SUM(p.sum), 0) as total_received,\n  (w.sum - COALESCE(SUM(p.sum), 0)) as balance,\n  COUNT(p.id) as payments_count,\n  w.accural_month as accrual_month,\n  CAST((julianday(w.accural_month) - julianday('now')) AS INTEGER) as days_difference,\n  w.created as created,\n  w.updated as updated\nFROM wait_incomes w\nLEFT JOIN payments p ON p.wait_income = w.id AND p.ignore = FALSE\nGROUP BY w.id"
    }

    return app.save(collection)
  } catch (e) {
    console.log("Collection pbc_wait_incomes_status not found, skipping rollback")
    return null
  }
})