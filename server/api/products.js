const router = require('express').Router()
const { Product, Order } = require('../db/models')
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
    const user = req.user.dataValues
    const existingOrder = await Order.findOne({
      where: {
        userId: user.id,
        complete: false
      }
    })
    if (existingOrder) {
      await existingOrder.addProduct(req.params.productId, { through: { quantity: req.body.quantity } })
    } else {
      const newOrder = await Order.create().then(order => order.setUser(user.id))
      await newOrder.addProduct(req.params.productId, { through: { quantity: req.body.quantity } })
    }
  }
  catch (err) {
    next(err)
  }
})
