/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json1843675174",
    "maxSize": 0,
    "name": "raw",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "json1843675174",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
