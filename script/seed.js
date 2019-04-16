'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const products = [
  {name: 'Roses', description: '24 red roses', cost: 45},
  {name: 'Peonies', description: '6 peach peonies', cost: 20},
  {name: 'Carnations', description: '12 pink carnations', cost: 10},
  {name: 'Mixed Bouquet', description: 'Seasonal', cost: 30},
  {name: 'Lilies', description: '8 stems', cost: 16},
  {name: 'Hydrangeas', description: '6 large stems', cost: 20}
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
