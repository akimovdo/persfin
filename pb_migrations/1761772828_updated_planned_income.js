/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4021241261")

  // update field
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4021241261")

  // update field
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
})
