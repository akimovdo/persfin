/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2063686102")

  // update collection data
  unmarshal({
    "name": "wait_income"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2063686102")

  // update collection data
  unmarshal({
    "name": "plan_income"
  }, collection)

  return app.save(collection)
})
