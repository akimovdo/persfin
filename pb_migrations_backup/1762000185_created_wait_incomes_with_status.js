/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_2063686102",
        "hidden": false,
        "id": "relation_wait_income_id",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "wait_income_id",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text_name",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": true,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number_sum",
        "max": null,
        "min": null,
        "name": "sum",
        "onlyInt": false,
        "presentable": true,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number_total_received",
        "max": null,
        "min": null,
        "name": "total_received",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number_balance",
        "max": null,
        "min": null,
        "name": "balance",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number_payments_count",
        "max": null,
        "min": null,
        "name": "payments_count",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "date_accrual_month",
        "max": "",
        "min": "",
        "name": "accrual_month",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "number_days_difference",
        "max": null,
        "min": null,
        "name": "days_difference",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "autodate_created",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate_updated",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_wait_incomes_status",
    "indexes": [],
    "listRule": "",
    "name": "wait_incomes_with_status",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewRule": "",
    "viewQuery": "SELECT \n  w.id as id,\n  w.id as wait_income_id,\n  w.name as name,\n  w.sum as sum,\n  COALESCE(SUM(p.sum), 0) as total_received,\n  (w.sum - COALESCE(SUM(p.sum), 0)) as balance,\n  COUNT(p.id) as payments_count,\n  w.accural_month as accrual_month,\n  CAST((julianday(w.accural_month) - julianday('now')) AS INTEGER) as days_difference,\n  w.created as created,\n  w.updated as updated\nFROM wait_incomes w\nLEFT JOIN payments p ON p.wait_income = w.id AND p.ignore = FALSE\nGROUP BY w.id"
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_wait_incomes_status");

  return app.delete(collection);
})
