/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1035770529")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_4eWk")

  // remove field
  collection.fields.removeById("_clone_4e5f")

  // remove field
  collection.fields.removeById("_clone_T7xV")

  // remove field
  collection.fields.removeById("_clone_kBH6")

  // remove field
  collection.fields.removeById("_clone_RKxq")

  // remove field
  collection.fields.removeById("_clone_rmdB")

  // remove field
  collection.fields.removeById("_clone_Xafl")

  // remove field
  collection.fields.removeById("_clone_lrbK")

  // remove field
  collection.fields.removeById("_clone_kUb1")

  // remove field
  collection.fields.removeById("_clone_Tzuk")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_a6Hm",
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
    "id": "_clone_61EC",
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
    "id": "_clone_wVxj",
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
    "id": "_clone_FoVf",
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
    "id": "_clone_tfy5",
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
    "id": "_clone_RIIH",
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
    "id": "_clone_1jDc",
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
    "id": "_clone_tT1Q",
    "max": "",
    "min": "",
    "name": "original_repayment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_zMWi",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "_clone_Uk4M",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1035770529")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_4eWk",
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
    "id": "_clone_4e5f",
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
    "id": "_clone_T7xV",
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
    "id": "_clone_kBH6",
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
    "id": "_clone_RKxq",
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
    "id": "_clone_rmdB",
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
    "id": "_clone_Xafl",
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
    "id": "_clone_lrbK",
    "max": "",
    "min": "",
    "name": "original_repayment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_kUb1",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "_clone_Tzuk",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // remove field
  collection.fields.removeById("_clone_a6Hm")

  // remove field
  collection.fields.removeById("_clone_61EC")

  // remove field
  collection.fields.removeById("_clone_wVxj")

  // remove field
  collection.fields.removeById("_clone_FoVf")

  // remove field
  collection.fields.removeById("_clone_tfy5")

  // remove field
  collection.fields.removeById("_clone_RIIH")

  // remove field
  collection.fields.removeById("_clone_1jDc")

  // remove field
  collection.fields.removeById("_clone_tT1Q")

  // remove field
  collection.fields.removeById("_clone_zMWi")

  // remove field
  collection.fields.removeById("_clone_Uk4M")

  return app.save(collection)
})
