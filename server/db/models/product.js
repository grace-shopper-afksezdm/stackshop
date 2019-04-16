const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  cost: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    default:
      'https://smhttp-ssl-80650.nexcesscdn.net/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/j/o/josephs-coat-web-3.jpg'
  }
})

module.exports = Product
