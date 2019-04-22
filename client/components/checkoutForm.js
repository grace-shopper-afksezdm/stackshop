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
            <input name="email" type="text" value={this.state.email} />
            <h3>Shipping</h3>
            <input
              name="streetAddress"
              type="text"
              value={this.state.streetAddress}
            />
            <input name="city" type="text" value={this.state.city} />
            <input name="state" type="text" value={this.state.state} />
            <input name="zipCode" type="text" value={this.state.zipCode} />
            <h3>Payment</h3>
            <input
              name="creditCardNumber"
              type="text"
              value={this.state.creditCardNumber}
            />
            <input name="cvv" type="text" value={this.state.cvv} />
            <input name="expDate" type="text" value={this.state.expDate} />
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
