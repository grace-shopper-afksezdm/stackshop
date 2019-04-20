import React from 'react'
import { addToCart } from './cartUtilFunctions'
import { Modal } from './modal'


export class AddQuantityToCart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      isOpen: false,
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
    addToCart(this.props.id, Number(this.state.quantity));
    this.setState({
      isOpen: !this.state.isOpen
    })
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
            style={{width: 40, height: 25}}
          />
          <button type="submit" style={{height:32,  borderRadius: 5}}>Add to Cart</button>
        </form>
        <Modal show={this.state.isOpen} />
      </div>
    )
  }
}
