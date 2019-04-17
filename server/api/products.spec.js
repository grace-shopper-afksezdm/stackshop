const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/products', () => {
    const testProductName = 'daffodil'
    const testProductCost = 3.99

    beforeEach(() => {
      return Product.create({
        name: testProductName,
        cost: testProductCost
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(testProductName)
      expect(res.body[0].cost).to.be.equal(testProductCost)
    })
  }) // end describe('/api/products')

  describe('/api/products/:productId', () => {
    const testProductName1 = 'daffodil'
    const testProductCost1 = 3.99
    const testProductId1 = 1
    const testProductName2 = 'rose'
    const testProductCost2 = 5.99
    const testProductId2 = 2

    beforeEach(() => {
      return Product.bulkCreate([{
        name: testProductName1,
        cost: testProductCost1,
        id: testProductId1
      }, {
        name: testProductName2,
        cost: testProductCost2,
        id: testProductId2
      }])
    })

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/2')
        .expect(200)

      // expect(res.body).to.be.an('array')
      expect(res.body.name).to.be.equal(testProductName2)
      expect(res.body.cost).to.be.equal(testProductCost2)
    })
  }) //end describe("/api/products/:productId")

}) //end describe('Product routes')
