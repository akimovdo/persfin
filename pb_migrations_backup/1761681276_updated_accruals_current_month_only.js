/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1392098309")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_aaMS")

  // remove field
  collection.fields.removeById("_clone_d4y1")

  // remove field
  collection.fields.removeById("_clone_TEjX")

  // remove field
  collection.fields.removeById("_clone_GRBY")

  // remove field
  collection.fields.removeById("_clone_ZBcW")

  // remove field
  collection.fields.removeById("_clone_rzrE")

  // remove field
  collection.fields.removeById("_clone_pwcm")

  // remove field
  collection.fields.removeById("_clone_VNW0")

  // remove field
  collection.fields.removeById("_clone_Hb0L")

  // remove field
  collection.fields.removeById("_clone_Bhp2")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_yhzq",
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
    "id": "_clone_8E6X",
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
    "id": "_clone_kG63",
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
    "id": "_clone_ja0G",
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
    "id": "_clone_CnI1",
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
    "id": "_clone_Zm3f",
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
    "id": "_clone_kEI8",
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
    "id": "_clone_uf60",
    "max": "",
    "min": "",
    "name": "repayment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_aIfW",
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
    "id": "_clone_dPuF",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1392098309")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_aaMS",
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
    "id": "_clone_d4y1",
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
    "id": "_clone_TEjX",
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
    "id": "_clone_GRBY",
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
    "id": "_clone_ZBcW",
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
    "id": "_clone_rzrE",
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
    "id": "_clone_pwcm",
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
    "id": "_clone_VNW0",
    "max": "",
    "min": "",
    "name": "repayment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_Hb0L",
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
    "id": "_clone_Bhp2",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // remove field
  collection.fields.removeById("_clone_yhzq")

  // remove field
  collection.fields.removeById("_clone_8E6X")

  // remove field
  collection.fields.removeById("_clone_kG63")

  // remove field
  collection.fields.removeById("_clone_ja0G")

  // remove field
  collection.fields.removeById("_clone_CnI1")

  // remove field
  collection.fields.removeById("_clone_Zm3f")

  // remove field
  collection.fields.removeById("_clone_kEI8")

  // remove field
  collection.fields.removeById("_clone_uf60")

  // remove field
  collection.fields.removeById("_clone_aIfW")

  // remove field
  collection.fields.removeById("_clone_dPuF")

  return app.save(collection)
})
