import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {clearCart} from '../store/product'
import {Link} from 'react-router-dom'

class CheckoutFormView extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      creditCardNumber: '',
      cvv: '',
      expDate: ''
    }
    this.state = this.initialState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getUser()
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.clearCart()
    this.setState(this.initialState)

    // render confirmation page
    // clear local storage
    // need thunk to handle database request -- mark order as complete
    // use their submitted address data to update database address fields
  }

  render() {
    return (
      <div>
        <h2>Checkout</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3>Contact</h3>
            <input
              className="longForm"
              name="email"
              type="text"
              value={this.state.email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <h3>Shipping</h3>
            <input
              className="longForm"
              name="streetAddress"
              type="text"
              placeholder="Street Address"
              value={this.state.streetAddress}
              onChange={this.handleChange}
            />
            <br />
            <input
              name="city"
              type="text"
              placeholder="City"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <input
              name="state"
              type="text"
              placeholder="State"
              value={this.state.state}
              onChange={this.handleChange}
            />
            <input
              name="zipCode"
              type="text"
              placeholder="Zip Code"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
            <h3>Billing</h3>
            <input
              className="longForm"
              name="creditCardNumber"
              type="password"
              placeholder="Credit Card Number"
              value={this.state.creditCardNumber}
              onChange={this.handleChange}
            />
            <br />
            <input
              name="cvv"
              type="password"
              placeholder="CVV"
              value={this.state.cvv}
              onChange={this.handleChange}
            />
            <input
              name="expDate"
              type="text"
              placeholder="Expiration Date"
              value={this.state.expDate}
              onChange={this.handleChange}
            />
          </div>
          <br />

          <button id="checkoutBtn" type="submit">
            <Link to="/confirmation">Complete Purchase</Link>
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me()),
  clearCart: () => dispatch(clearCart())
})

export const CheckoutForm = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutFormView
)
