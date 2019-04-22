import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchProducts, fetchCart} from '../store/product'
import {getCart} from './cartUtilFunctions'

class CheckoutView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.summarizeOrder = this.summarizeOrder.bind(this)
    this.getCartDetails = this.getCartDetails.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getCart()
  }

  getCartDetails() {
    // Create array of ids of current products in cart
    let prodIds = Object.keys(this.props.cart).map(id => Number(id))

    // Filter products by ids to select only those in cart
    const currProds = this.props.products.filter(product =>
      prodIds.includes(product.id)
    )
    return currProds
  }

  summarizeOrder() {
    const currProds = this.getCartDetails()
    // Add property to current products that holds the cart quantity
    const prodSummary = currProds.map(product => ({
      ...product,
      quantity: this.props.cart[product.id]
    }))

    return prodSummary
  }

  calculateTotal() {
    const currProds = this.getCartDetails()
    const costArr = currProds.map(
      product => product.cost * this.props.cart[product.id]
    )
    return costArr.reduce((acc, currVal) => acc + currVal, 0)
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    const order = this.summarizeOrder()
    console.log('ORDER', order)
    console.log('PROPS', this.props)

    return (
      <div className="container">
        <div className="orderSummary">
          <h4>Order Summary</h4>
          <div>
            {order.map(product => {
              return (
                <div key={product.id}>
                  <div>
                    {product.name}: {product.quantity} - ${product.quantity *
                      product.cost}
                  </div>
                </div>
              )
            })}
          </div>
          <div>Total Cost: ${this.calculateTotal()}</div>
        </div>
        <div className="checkoutForms" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.product.cart,
  products: state.product.all,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getCart: () => dispatch(fetchCart())
  // write/import thunk creator to send order info to db
})

export const Checkout = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutView
)
