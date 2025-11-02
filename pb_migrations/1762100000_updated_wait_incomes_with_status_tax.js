/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_wait_incomes_status");

  collection.viewQuery = `SELECT 
  w.id as id,
  w.id as wait_income_id,
  w.name as name,
  w.sum as sum,
  COALESCE(SUM(p.sum * 0.9), 0) as total_received,
  (w.sum - COALESCE(SUM(p.sum * 0.9), 0)) as balance,
  COUNT(p.id) as payments_count,
  w.accural_month as accrual_month,
  CAST((julianday(w.accural_month) - julianday('now')) AS INTEGER) as days_difference,
  w.created as created,
  w.updated as updated
FROM wait_incomes w
LEFT JOIN payments p ON p.wait_income = w.id AND p.ignore = FALSE
GROUP BY w.id`;

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_wait_incomes_status");

  collection.viewQuery = `SELECT 
  w.id as id,
  w.id as wait_income_id,
  w.name as name,
  w.sum as sum,
  COALESCE(SUM(p.sum), 0) as total_received,
  (w.sum - COALESCE(SUM(p.sum), 0)) as balance,
  COUNT(p.id) as payments_count,
  w.accural_month as accrual_month,
  CAST((julianday(w.accural_month) - julianday('now')) AS INTEGER) as days_difference,
  w.created as created,
  w.updated as updated
FROM wait_incomes w
LEFT JOIN payments p ON p.wait_income = w.id AND p.ignore = FALSE
GROUP BY w.id`;

  return app.save(collection);
})
