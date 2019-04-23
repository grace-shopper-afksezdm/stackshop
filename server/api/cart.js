const router = require('express').Router()
const { Order, OrderProduct } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    const cart = await OrderProduct.findAll({
      where: {
        orderId: order.id
      }
    }).reduce((obj, product) => {
      obj[product.productId] = product.quantity
      return obj
    }, {})
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/', (req, res, next) => { })
