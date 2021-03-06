import React from 'react'
import {connect} from 'react-redux'
import {me, settingUser} from '../store/user'
import {clearCart} from './cartUtilFunctions'
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
    this.setState({
      ...this.state,
      email: this.props.user.email,
      streetAddress: this.props.user.streetAddress,
      city: this.props.user.city,
      state: this.props.user.state,
      zipCode: this.props.user.zipCode
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    localStorage.clear()
    console.log('OUR USER', this.props.user)
    if (!this.props.user.id) {
      this.props.settingUser({email: this.state.email})
    }

    // this allows confirmation view to render via handleSubmit
    this.props.history.push('/checkout/confirmation')

    // need thunk to handle database request -- mark order as complete
    // use their submitted address data to update database address fields
  }

  render() {
    return (
      <div className="checkoutForm">
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

          <button id="checkoutSubmitBtn" type="submit">
            Complete Purchase
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me()),
  clearCart: () => clearCart(),
  settingUser: user => dispatch(settingUser(user))
})

export const CheckoutForm = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutFormView
)
