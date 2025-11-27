/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4282115598")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_SrGp")

  // remove field
  collection.fields.removeById("_clone_5W3q")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1143762905",
    "hidden": false,
    "id": "_clone_Mb2t",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cost_item_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_qO5f",
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4282115598")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1143762905",
    "hidden": false,
    "id": "_clone_SrGp",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cost_item_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_5W3q",
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

  // remove field
  collection.fields.removeById("_clone_Mb2t")

  // remove field
  collection.fields.removeById("_clone_qO5f")

  return app.save(collection)
})
