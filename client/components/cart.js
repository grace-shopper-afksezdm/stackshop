import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts, fetchCart, updateCart} from '../store/product'
import {Link} from 'react-router-dom'
import {addToCart, clearCart} from './cartUtilFunctions'

addToCart(1, 1)
addToCart(2, 1)
addToCart(3, 1)

class DisconnectedCart extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    this.props.getProducts()
    this.props.getCart()
  }

  handleChange(evt, id) {
    console.log('EVT type', evt.target.value)
    console.log('id', id)
    this.props.updateCart(id, evt.target.value)
    console.log(this.props.cart)
    this.props.getCart()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    // this.props.updateCart(props.)
  }

  render() {
    if (this.props.loading) return <div>Loading...</div>
    return (
      <div>
        <h1>Your Cart</h1>
        <div className="table">
          <div className="Rtable">
            <div className="Rtable-cell">Item</div>
            <div className="Rtable-cell">Quantity</div>
            <div className="Rtable-cell">Unit Price</div>
            <div className="Rtable-cell">Subtotal</div>
          </div>
          {Array.isArray(this.props.products) &&
            this.props.products
              .filter(product =>
                Object.keys(this.props.cart).includes(String(product.id))
              )
              .map(product => {
                return (
                  <div className="Rtable" key={product.id}>
                    <div className="Rtable-cell">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </div>
                    <div className="Rtable-cell">
                      <form onSubmit={this.handleSubmit}>
                        <input
                          type="number"
                          name="quantity"
                          onChange={evt => this.handleChange(evt, product.id)}
                          value={this.props.cart[product.id]}
                        />
                      </form>
                    </div>
                    <div className="Rtable-cell">${product.cost}</div>
                    <div className="Rtable-cell">
                      ${this.props.cart[product.id] * product.cost}
                    </div>
                  </div>
                )
              })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.all,
    loading: state.product.loading,
    cart: state.product.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getCart: () => dispatch(fetchCart()),
    updateCart: (id, quantity) => dispatch(updateCart(id, quantity))
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
)
