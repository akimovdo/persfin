/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_301843697")

  // update collection data
  unmarshal({
    "name": "planned_income_fix"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_301843697")

  // update collection data
  unmarshal({
    "name": "planned_income"
  }, collection)

  return app.save(collection)
})
