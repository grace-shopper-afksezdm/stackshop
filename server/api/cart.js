const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = req.user.dataValue
    const order = await Order.findOne({
      where: {
        userId: user.id,
        complete: false
      }
    })
    const cart = await order.getProducts()
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/', (req, res, next) => { })
