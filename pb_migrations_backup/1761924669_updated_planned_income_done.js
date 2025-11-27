/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_301843697")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date3317178062",
    "max": "",
    "min": "",
    "name": "period",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_301843697")

  // remove field
  collection.fields.removeById("date3317178062")

  return app.save(collection)
})
