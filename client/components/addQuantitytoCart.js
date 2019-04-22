import React from 'react'
import { addToCart } from './cartUtilFunctions'
import axios from 'axios';
import { connect } from 'react-redux'
import { addProdToDBCart } from '../store/product'

class DisAddQuantityToCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleSumbit(event) {
    event.preventDefault();
    const { isLoggedIn, id, cart, addProdToDBCart} = this.props
    isLoggedIn ?
     addProdToDBCart(cart, id, this.state.quantity):
     addToCart(id, Number(this.state.quantity))
  }

  render() {
    return (
      <div>
        <form className="addquantityform" onSubmit={this.handleSumbit}>
          <label htmlFor="quantity">Qty:</label>
          <input
            type="number"
            name="quantity"
            value={this.state.quantity}
            required={true}
            onChange={this.handleChange}
            style={{ width: 50 }}
          />
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn : !!state.user.id,
    cart: state.product.cart
  }
}

const mapDispatch = dispatch => ({
  addProdToDBCart: (cart, id, quantity) => dispatch(addProdToDBCart(cart, id, quantity))
})

export const AddQuantityToCart = connect(mapState, mapDispatch)(DisAddQuantityToCart)
