const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Order
