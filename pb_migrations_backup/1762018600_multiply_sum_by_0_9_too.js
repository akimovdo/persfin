/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Update the wait_incomes_with_status collection's viewQuery
  const collection = app.findCollectionByNameOrId("wait_incomes_with_status");
  
  if (collection) {
    collection.viewQuery = `SELECT 
      w.id as id,
      w.id as wait_income_id,
      w.name as name,
      (w.sum * 0.9) as sum,
      COALESCE(SUM(p.sum * 0.9), 0) as total_received,
      ((w.sum * 0.9) - COALESCE(SUM(p.sum * 0.9), 0)) as balance,
      COUNT(p.id) as payments_count,
      w.accural_month as accrual_month,
      CAST((julianday(w.accural_month) - julianday(date('now'))) AS INTEGER) as days_difference,
      w.created as created,
      w.updated as updated
    FROM wait_incomes w
    LEFT JOIN payments p ON p.wait_income = w.id AND p.ignore = FALSE
    GROUP BY w.id`;
    
    return app.save(collection);
  }
}, (app) => {
  const collection = app.findCollectionByNameOrId("wait_incomes_with_status");
  
  if (collection) {
    collection.viewQuery = `SELECT 
      w.id as id,
      w.id as wait_income_id,
      w.name as name,
      w.sum as sum,
      COALESCE(SUM(p.sum * 0.9), 0) as total_received,
      (w.sum - COALESCE(SUM(p.sum * 0.9), 0)) as balance,
      COUNT(p.id) as payments_count,
      w.accural_month as accrual_month,
      CAST((julianday(w.accural_month) - julianday(date('now'))) AS INTEGER) as days_difference,
      w.created as created,
      w.updated as updated
    FROM wait_incomes w
    LEFT JOIN payments p ON p.wait_income = w.id AND p.ignore = FALSE
    GROUP BY w.id`;
    
    return app.save(collection);
  }
});