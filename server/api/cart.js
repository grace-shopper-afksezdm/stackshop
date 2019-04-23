const router = require('express').Router()
const { Order, Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    const cart = await order.getProducts()
    console.log('*******CART***', cart)
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/', (req, res, next) => { })
