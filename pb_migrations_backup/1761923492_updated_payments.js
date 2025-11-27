/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1103846297",
    "max": 0,
    "min": 0,
    "name": "payer",
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
  collection.fields.removeById("text1103846297")

  return app.save(collection)
})
