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
}) //end describe('Product routes')
