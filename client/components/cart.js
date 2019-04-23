/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, fetchCart, updateCart} from '../store/product'
import {Link} from 'react-router-dom'
import {removeFromCart} from './cartUtilFunctions'

class DisconnectedCart extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.calculateTotal = this.calculateTotal.bind(this)
  }

  async componentDidMount() {
    const {getProducts, getCart, isLoggedIn} = this.props
    getProducts()
    getCart(isLoggedIn)
  }

  handleChange(evt, id) {
    const {updateCart, getCart, isLoggedIn} = this.props
    updateCart(id, evt.target.value, isLoggedIn)
    getCart(isLoggedIn)
  }

  handleSubmit(evt, id) {
    evt.preventDefault()
    removeFromCart(id)
    this.props.getCart()
  }

  calculateTotal() {
    let prodIds = Object.keys(this.props.cart).map(id => Number(id))
    const currProds = this.props.products.filter(product =>
      prodIds.includes(product.id)
    )
    const costArr = currProds.map(
      product => product.cost * this.props.cart[product.id]
    )
    return costArr.reduce((acc, currVal) => acc + currVal, 0)
  }

  render() {
    if (this.props.loading) return <div>Loading...</div>

    const {cart, products} = this.props

    return (
      <div>
        <div className="container">
          <h1>Your Cart</h1>
          <Link to="/checkout">
            <div id="checkoutBtn">
              <h1>Checkout</h1>
            </div>
          </Link>
        </div>
        <div className="table">
          <div className="Rtable">
            <div className="Rtable-cell">
              <h3>Item</h3>
            </div>
            <div className="Rtable-cell">
              <h3>Quantity</h3>
            </div>
            <div className="Rtable-cell">
              <h3>Unit Price</h3>
            </div>
            <div className="Rtable-cell">
              <h3>Subtotal</h3>
            </div>
          </div>
          {Array.isArray(products) &&
            products
              .filter(product => Object.keys(cart).includes(String(product.id)))
              .map(product => {
                return (
                  <div className="Rtable" key={product.id}>
                    <div className="Rtable-cell">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </div>
                    <div className="Rtable-cell">
                      <form onSubmit={this.handleSubmit}>
                        <input
                          id="qty"
                          type="number"
                          name="quantity"
                          onChange={evt => this.handleChange(evt, product.id)}
                          value={cart[product.id]}
                        />
                      </form>
                    </div>
                    <div className="Rtable-cell">${product.cost}</div>
                    <div className="Rtable-cell">
                      ${cart[product.id] * product.cost}
                      <button
                        id="rmvBtn"
                        onClick={(evt, id) =>
                          this.handleSubmit(evt, product.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              })}
          <div className="Rtable">
            <div className="Rtable-cell">
              <h3>Total Cost:</h3>
            </div>
            <div className="Rtable-cell"> </div>
            <div className="Rtable-cell"> </div>
            <div className="Rtable-cell" id="totalBox">
              <h3>${this.calculateTotal()}</h3>
            </div>
          </div>
          <div className="container" id="cartBottom">
            <Link to="/checkout">
              <div id="checkoutBtnBtm">
                <h1>Checkout</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.all,
    loading: state.product.loading,
    cart: state.product.cart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getCart: (isLoggedIn) => dispatch(fetchCart(isLoggedIn)),
    updateCart: (id, quantity, isLoggedIn) => dispatch(updateCart(id, quantity, isLoggedIn))
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
)
