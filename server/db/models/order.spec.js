const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definition and validations', () => {
    it(`has an 'orderNumber', 'complete', and 'quantity'`, async () => {
      const order1 = await Order.create({
        orderNumber: 1,
        quantity: 2
      })

      expect(order1.orderNumber).to.equal(1)
      expect(order1.complete).to.equal(false)
      expect(order1.quantity).to.equal(2)
    })

    it(`'quantity' is required`, () => {
      const order1 = Order.build()
      return order1.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
  })
})
