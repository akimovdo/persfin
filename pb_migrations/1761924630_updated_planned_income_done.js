/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_301843697")

  // remove field
  collection.fields.removeById("number1624514900")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_301843697")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1624514900",
    "max": 31,
    "min": 1,
    "name": "income_date",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
