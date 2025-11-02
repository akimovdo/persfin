/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "bool227071714",
    "name": "ignore",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("fzbeoyse5d2vrlx")

  // remove field
  collection.fields.removeById("bool227071714")

  return app.save(collection)
})
