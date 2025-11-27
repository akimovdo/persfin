/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "q2xujhghickdktv",
    "hidden": false,
    "id": "jbjtp7of",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "accural",
    "presentable": true,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "q2xujhghickdktv",
    "hidden": false,
    "id": "jbjtp7of",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "accural",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
