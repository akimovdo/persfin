/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2247033813")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": ""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_Mk2E")

  // remove field
  collection.fields.removeById("_clone_1EJU")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "1szejta0lfkygfb",
    "hidden": false,
    "id": "_clone_2k1X",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "partner_id",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_YXjV",
    "max": 0,
    "min": 0,
    "name": "partner_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2247033813")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "1szejta0lfkygfb",
    "hidden": false,
    "id": "_clone_Mk2E",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "partner_id",
    "presentable": true,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_1EJU",
    "max": 0,
    "min": 0,
    "name": "partner_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_2k1X")

  // remove field
  collection.fields.removeById("_clone_YXjV")

  return app.save(collection)
})
