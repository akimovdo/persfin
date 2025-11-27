/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_933361838")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_VGYG")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "_clone_Vuv0",
    "max": "",
    "min": "",
    "name": "payment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_933361838")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "_clone_VGYG",
    "max": "",
    "min": "",
    "name": "payment_date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("_clone_Vuv0")

  return app.save(collection)
})
