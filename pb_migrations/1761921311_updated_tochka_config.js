/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1234567890")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number1234567896",
    "max": null,
    "min": null,
    "name": "endDateBalance",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1234567890")

  // remove field
  collection.fields.removeById("number1234567896")

  return app.save(collection)
})
