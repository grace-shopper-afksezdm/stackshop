import React from 'react'
import { addToCart } from './cartUtilFunctions'
import axios from 'axios';

export class AddQuantityToCart extends React.Component {
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
    // addToCart(this.props.id, Number(this.state.quantity))
    axios.post(`/api/products/${this.props.id}`, { quantity: this.state.quantity })
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
