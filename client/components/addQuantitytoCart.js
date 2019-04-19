import React from 'react'
import { addToCart } from './cartUtilFunctions'

class AddQuantityToCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }

  handleSumbit(event) {
    event.preventDefault()
  }
  redner() {
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
            style={{width: 150}}
          />
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    )
  }
}
