/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2467149474")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_Hxzd")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1143762905",
    "hidden": false,
    "id": "_clone_MwD6",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cost_item_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2467149474")

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
    "id": "_clone_Hxzd",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "cost_item_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_MwD6")

  return app.save(collection)
})
