/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4021241261")

  // update collection data
  unmarshal({
    "name": "planned_income_old"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4021241261")

  // update collection data
  unmarshal({
    "name": "planned_income"
  }, collection)

  return app.save(collection)
})
