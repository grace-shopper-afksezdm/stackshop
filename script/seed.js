'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const products = [
  {
    name: 'Rose Bouquet',
    description: `Rose flower arrangements and bouquets are the perfect gift to express your feelings and emotions to the one's you love most without using words. The symbolic meaning of a rose flower delivery can range from passionate love to everlasting friendship. So, send your special someone a thematic and elegant bouquet of roses, delivered fresh and right to their door.  Includes 24 red roses and glass vase.`,
    cost: 45,
    imageUrl: '../images/peachRose.jpg'
  },
  {
    name: 'Peonies',
    description: `Nothing says "It's Spring!" more than peonies. The tight round heads gradually open up to reveal multitudes of petals and a lovely scent. 6 elegant stems in a glass provide as much "wow" factor as a dozen roses!`,
    cost: 20,
    imageUrl: '../images/peony-pink.jpg'
  },
  {
    name: 'Carnations',
    description:
      'Carnations are a fun and affordable way to show someone you care. Our sweet-smelling varietal has cream colored petals with a fuschia edge for a splash of color. Each shipment includes 20 stems and a glass vase.',
    cost: 10,
    imageUrl: '../images/carnation.jpg'
  },
  {
    name: 'Mixed Bouquet',
    description: `Say "I love you" or "thanks so much" with a wonderful touch of Spring. A gorgeous collection of white hydrangea, yellow roses, peach spray roses, and pink alstroemeria come together to make up our mixed bouquet. Arranged in a glass vase with greenery.`,
    cost: 30,
    imageUrl: '../images/mixed-bouquet.jpg'
  },
  {
    name: `Lily Bouquet`,
    description: `Lily bouquets make beautiful and unique floral delivery gifts for those special occasions! Beautiful lilies and lily bouquets will impress your loved one or make an elegant statement for your wedding flowers. Whatever the occasion, lilies always delight and dazzle. Bouquet includes 8 stems and a glass vase.`,
    cost: 16,
    imageUrl: '../images/oriental-lily.jpg'
  },
  {
    name: 'Hydrangeas',
    description: `Dazzle someone you care about with our lush large hydrangea heads. They are an impressive and elegant accent for any room or dining arrangement. Seasonal offerings coming in shades of white, light green and blue-violet.`,
    cost: 20,
    imageUrl: '../images/hydrangea-purple.jpg'
  },
  {
    name: 'Tulips',
    description: `A perennial favorite of our customers, tulips provide an elegant splash of color and are so easy to arrange. Our favorite shade is coral. We source our tulips from an organic farm in Virginia and ship them directly to customers to ensure maximum freshness. A bunch includes 20 stems and a glass vase.`,
    cost: 22,
    imageUrl: '../images/tulip.jpg'
  },
  {
    name: 'Alstroemeria',
    description: `A perennial favorite of our customers, alstroemeria provide an cheerful splash of color to lift the spirits of a friend. Our favorite shade is coral. Sourced from an organic farm in Michigan and shipped directly to customers for maximum freshness. A bunch includes 10 stems and a glass vase.`,
    cost: 14,
    imageUrl: '../images/alstroemeria.jpg'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      streetAddress: '5 Hanover Square',
      city: 'New York',
      state: 'NY',
      zipCode: 10004,
      isAdmin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      streetAddress: '5 Hanover Square',
      city: 'New York',
      state: 'NY',
      zipCode: 10004
    })
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
