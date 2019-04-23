import React from 'react'
import {connect} from 'react-redux'

class ConfirmationView extends React.Component {
  render() {
    return (
      <div id="confirmation">
        <h2>
          Success! Thank you for your business {this.props.user.email}! Please
          check your email for confirmation and shipping details.
        </h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export const Confirmation = connect(mapStateToProps, null)(ConfirmationView)
