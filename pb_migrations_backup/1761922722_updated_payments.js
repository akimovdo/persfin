/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text110297516",
    "max": 0,
    "min": 0,
    "name": "creditDebitIndicator",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // remove field
  collection.fields.removeById("text110297516")

  return app.save(collection)
})
