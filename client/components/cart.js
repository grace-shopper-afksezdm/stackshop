import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts, fetchCart} from '../store/product'
import {Link} from 'react-router-dom'
import {addToCart, updateCart, clearCart} from './cartUtilFunctions'

clearCart()
addToCart(1, 5)
addToCart(2, 3)
addToCart(5, 1)

class DisconnectedCart extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }

  async componentDidMount() {
    this.props.getProducts()
    this.props.getCart()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }



  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updateCart(props.)
  }

  render() {
    if (this.props.loading) return <div>Loading...</div>

    return (
      <div>
        <h4>Your Cart</h4>
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
                          type="text"
                          name={product.id}
                          onChange={this.handleChange}
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
    updateCart: () => dispatch(updateCart())
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
)
