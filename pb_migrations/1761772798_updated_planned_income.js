/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4021241261")

  // remove field
  collection.fields.removeById("date1624514900")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1624514900",
    "max": null,
    "min": null,
    "name": "income_date",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4021241261")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date1624514900",
    "max": "",
    "min": "",
    "name": "income_date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // remove field
  collection.fields.removeById("number1624514900")

  return app.save(collection)
})
