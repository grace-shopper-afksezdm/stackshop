import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Link} from 'react-router-dom'

const cartArr = {1: 2, 3: 1, 4: 7, 5: 1}
const cartStorage = JSON.stringify(cartArr)
localStorage.setItem('cart', cartStorage)

const fetchedCart = JSON.parse(localStorage.getItem('cart')) //{1: 2, 3: 1}
const selectedProducts = Object.keys(fetchedCart).map(key => Number(key))

class DisconnectedCart extends React.Component {
  async componentDidMount() {
    this.props.getProducts()
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
              .filter(product => selectedProducts.includes(product.id))
              .map(product => {
                return (
                  <div className="Rtable" key={product.id}>
                    <div className="Rtable-cell">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </div>
                    <div className="Rtable-cell">
                      <form>
                        <input type="text" name="Qty" />
                      </form>
                    </div>
                    <div className="Rtable-cell">${product.cost}</div>
                    <div className="Rtable-cell">
                      ${fetchedCart[product.id] * product.cost}
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
    loading: state.product.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
)
