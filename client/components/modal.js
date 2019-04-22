import React from 'react'
import {Link} from 'react-router-dom'

export class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null
    }

    //The gray background style
    const greybackground = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 50
    }

    //The modal "window"
    const modalStyle = {
      // backgroundColor: '#D5ACA9',
      backgroundColor: '#E5989B',
      borderRadius: 5,
      maxWidth: 300,
      minHeight: 150,
      margin: '0 auto',
      padding: 30
    }

    const buttonStyle1 = {
      position: 'fixed',
      top: 150,
      left: 360,
      width: 80,
      height: 38,
      borderRadius: 5,
      backgroundColor: '#e10b7e',
      color: '#FFFFFF'
    }

    const buttonStyle2 = {
      position: 'fixed',
      top: 150,
      left: 480,
      width: 80,
      height: 38,
      borderRadius: 5,
      backgroundColor: '#e10b7e',
      color: '#FFFFFF'
    }

    return (
      <div className="backdrop" style={greybackground}>
        <div className="modal" style={modalStyle}>
          <p>Your selection has been added to the cart!</p>
          <Link to="/products">
            <button style={buttonStyle1}>Continue Shopping</button>
          </Link>
          <Link to="/cart">
            <button style={buttonStyle2}>Go To Cart</button>
          </Link>
        </div>
      </div>
    )
  }
}
