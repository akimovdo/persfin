/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2063686102")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date1146156890",
    "max": "",
    "min": "",
    "name": "accural_month",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2063686102")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date1146156890",
    "max": "",
    "min": "",
    "name": "wait_day",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
