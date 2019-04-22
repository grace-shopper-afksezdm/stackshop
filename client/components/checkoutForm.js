import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'

class CheckoutFormView extends React.Component {
  constructor(props) {
    super(props)
    // if (this.props.user) {
    //   const user = this.props.user
    // }
    this.state = {
      email: 'Email',
      streetAddress: 'Street Address',
      city: 'City',
      state: 'State',
      zipCode: 'Zip Code',
      creditCardNumber: 'Credit Card Number',
      cvv: 'CVV',
      expDate: 'Expiration Date'
    }
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
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <h3>Shipping</h3>
            <input
              name="streetAddress"
              type="text"
              value={this.state.streetAddress}
              onChange={this.handleChange}
            />
            <input
              name="city"
              type="text"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <input
              name="state"
              type="text"
              value={this.state.state}
              onChange={this.handleChange}
            />
            <input
              name="zipCode"
              type="text"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
            <h3>Contact</h3>
            <input
              name="creditCardNumber"
              type="text"
              value={this.state.creditCardNumber}
              onChange={this.handleChange}
            />
            <input
              name="cvv"
              type="text"
              value={this.state.cvv}
              onChange={this.handleChange}
            />
            <input
              name="expDate"
              type="text"
              value={this.state.expDate}
              onChange={this.handleChange}
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(me())
})

export const CheckoutForm = connect(mapStateToProps, mapDispatchToProps)(
  CheckoutFormView
)
