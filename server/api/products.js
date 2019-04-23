const router = require('express').Router()
const { Product, Order, OrderProduct } = require('../db/models')
module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {

    const singleProduct = await Product.findByPk(req.params.productId);
    if (!singleProduct) {
      res.sendStatus(404)
    } else {
      res.json(singleProduct)
    }

  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.send(allProducts)
  }
  catch (err) {
    next(err)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    let existingOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    if (existingOrder) {
      existingOrder = await existingOrder.addProduct(req.params.productId, { through: { quantity: req.body.quantity } })
      res.json(existingOrder)
    } else {
      let newOrder = await Order.create().then(order => order.setUser(user.id))
      newOrder =  await newOrder.addProduct(req.params.productId, { through: { quantity: req.body.quantity } })
      res.json(newOrder)
    }
  }
  catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const existingOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        complete: false
      }
    })
    const updatingQuantity = await OrderProduct.update({
      quantity: req.body.quantity
    }, {
      where: {
        orderId: existingOrder.id,
        productId: req.params.productId
      },
      returning: true
    })
    res.send(updatingQuantity)
  }
  catch (error) {
    next(error)
  }
})
