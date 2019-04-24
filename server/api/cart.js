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

router.put('/', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    const updatingQuantity = await OrderProduct.update({
      quantity: Number(req.body.quantity)
    }, {
      where: {
        orderId: existingOrder.id,
        productId: req.body.productId
      },
      returning: true
    })
    res.send(updatingQuantity)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    const data = await OrderProduct.destroy({
      where: {
        orderId:existingOrder.id,
        productId: req.body.productId
      }
    })
    if (data) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  } catch(error) {
    next(error)
  }
})
