/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2063686102")

  // remove field
  collection.fields.removeById("number1624514900")

  // add field
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2063686102")

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

  // remove field
  collection.fields.removeById("date1146156890")

  return app.save(collection)
})
