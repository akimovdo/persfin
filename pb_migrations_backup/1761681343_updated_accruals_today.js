/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3202511858")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_pZLd")

  // remove field
  collection.fields.removeById("_clone_ty84")

  // remove field
  collection.fields.removeById("_clone_Y8cT")

  // remove field
  collection.fields.removeById("_clone_yowK")

  // remove field
  collection.fields.removeById("_clone_rHku")

  // remove field
  collection.fields.removeById("_clone_xXdJ")

  // remove field
  collection.fields.removeById("_clone_FfIA")

  // remove field
  collection.fields.removeById("_clone_Rri0")

  // remove field
  collection.fields.removeById("_clone_hT5e")

  // remove field
  collection.fields.removeById("_clone_UrLn")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_p5DV",
    "max": 0,
    "min": 0,
    "name": "number",
    "pattern": "",
    "presentable": true,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_sJxk",
    "max": 0,
    "min": 0,
    "name": "accrual_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "1szejta0lfkygfb",
    "hidden": false,
    "id": "_clone_uMFe",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "partner_id",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_dfwx",
    "max": 0,
    "min": 0,
    "name": "partner_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1143762905",
    "hidden": false,
    "id": "_clone_tcHu",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cost_item_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_iuCL",
    "max": 0,
    "min": 0,
    "name": "cost_item_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_J8vW",
    "max": null,
    "min": null,
    "name": "total_accrued",
    "onlyInt": false,
    "presentable": true,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "_clone_OCzD",
    "max": "",
    "min": "",
    "name": "repayment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_hrSk",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "_clone_CVgF",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3202511858")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_pZLd",
    "max": 0,
    "min": 0,
    "name": "number",
    "pattern": "",
    "presentable": true,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_ty84",
    "max": 0,
    "min": 0,
    "name": "accrual_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "1szejta0lfkygfb",
    "hidden": false,
    "id": "_clone_Y8cT",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "partner_id",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_yowK",
    "max": 0,
    "min": 0,
    "name": "partner_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1143762905",
    "hidden": false,
    "id": "_clone_rHku",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cost_item_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_xXdJ",
    "max": 0,
    "min": 0,
    "name": "cost_item_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_FfIA",
    "max": null,
    "min": null,
    "name": "total_accrued",
    "onlyInt": false,
    "presentable": true,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "_clone_Rri0",
    "max": "",
    "min": "",
    "name": "repayment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_hT5e",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "_clone_UrLn",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // remove field
  collection.fields.removeById("_clone_p5DV")

  // remove field
  collection.fields.removeById("_clone_sJxk")

  // remove field
  collection.fields.removeById("_clone_uMFe")

  // remove field
  collection.fields.removeById("_clone_dfwx")

  // remove field
  collection.fields.removeById("_clone_tcHu")

  // remove field
  collection.fields.removeById("_clone_iuCL")

  // remove field
  collection.fields.removeById("_clone_J8vW")

  // remove field
  collection.fields.removeById("_clone_OCzD")

  // remove field
  collection.fields.removeById("_clone_hrSk")

  // remove field
  collection.fields.removeById("_clone_CVgF")

  return app.save(collection)
})
