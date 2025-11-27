/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1445307046")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_cPa0")

  // remove field
  collection.fields.removeById("_clone_lemo")

  // remove field
  collection.fields.removeById("_clone_HoMk")

  // remove field
  collection.fields.removeById("_clone_9zfT")

  // remove field
  collection.fields.removeById("_clone_0WHI")

  // remove field
  collection.fields.removeById("_clone_5e83")

  // remove field
  collection.fields.removeById("_clone_sSRH")

  // remove field
  collection.fields.removeById("_clone_CtRv")

  // remove field
  collection.fields.removeById("_clone_pVZV")

  // remove field
  collection.fields.removeById("_clone_ultx")

  // remove field
  collection.fields.removeById("_clone_mMhd")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_uARK",
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
    "id": "_clone_YFVa",
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
    "id": "_clone_OYyA",
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
    "id": "_clone_blK8",
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
    "id": "_clone_c8IA",
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
    "id": "_clone_vK8y",
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
    "id": "_clone_1J0p",
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
    "id": "_clone_HJQz",
    "max": "",
    "min": "",
    "name": "repayment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_YAmm",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "_clone_ByJj",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "_clone_IZc0",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1445307046")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_cPa0",
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
    "id": "_clone_lemo",
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
    "id": "_clone_HoMk",
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
    "id": "_clone_9zfT",
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
    "id": "_clone_0WHI",
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
    "id": "_clone_5e83",
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
    "id": "_clone_sSRH",
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
    "id": "_clone_CtRv",
    "max": "",
    "min": "",
    "name": "repayment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_pVZV",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "_clone_ultx",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "_clone_mMhd",
    "name": "updated",
    "onCreate": true,
    "onUpdate": true,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // remove field
  collection.fields.removeById("_clone_uARK")

  // remove field
  collection.fields.removeById("_clone_YFVa")

  // remove field
  collection.fields.removeById("_clone_OYyA")

  // remove field
  collection.fields.removeById("_clone_blK8")

  // remove field
  collection.fields.removeById("_clone_c8IA")

  // remove field
  collection.fields.removeById("_clone_vK8y")

  // remove field
  collection.fields.removeById("_clone_1J0p")

  // remove field
  collection.fields.removeById("_clone_HJQz")

  // remove field
  collection.fields.removeById("_clone_YAmm")

  // remove field
  collection.fields.removeById("_clone_ByJj")

  // remove field
  collection.fields.removeById("_clone_IZc0")

  return app.save(collection)
})
