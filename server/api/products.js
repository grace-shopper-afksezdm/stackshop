const router = require('express').Router()
const Product = require('../db/models/product')
module.exports = router

router.get('/:productId', async(req, res, next)=> {
  try {

    const singleProduct = await Product.findByPk(req.params.productId);
    if (!singleProduct) {
      res.sendStatus(404)
    } else {
      res.json(singleProduct)
    }

  } catch(err){
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
