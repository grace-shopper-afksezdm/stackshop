import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {Link} from 'react-router-dom'

const cartArr = {1: 2, 3: 1}
const cartStorage = JSON.stringify(cartArr)
localStorage.setItem('cart', cartStorage)

// const cart = []
// for (let i = 0; i < localStorage.length; i++) {
//   let key = localStorage.key(i)
//   cart[i] = localStorage.getItem(key)
// }

const fetchedCart = JSON.parse(localStorage.getItem('cart')) //{1: 2, 3: 1}
const selectedProducts = Object.keys(fetchedCart).map(key => Number(key))

class DisconnectedCart extends React.Component {
  async componentDidMount() {
    this.props.getProducts()
    console.log(selectedProducts)
  }

  render() {
    if (this.props.loading) return <div>Loading...</div>

    return (
      <div>
        <h4>Your Cart</h4>
        <table>
          <tbody>
            <tr>
              <td>Item</td>
              <td>Quantity</td>
              <td>Unit Price</td>
              <td>Subtotal</td>
            </tr>
          </tbody>
        </table>
        <ul>
          {Array.isArray(this.props.products) &&
            this.props.products
              .filter(product => selectedProducts.includes(product.id))
              .map(product => {
                return (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <li>
                      <h3>{product.name}</h3>
                      <p>{product.cost}</p>
                    </li>
                  </Link>
                )
              })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.all,
    loading: state.product.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export const Cart = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedCart
)

// {Array.isArray(this.props.products) &&
//   this.props.products
//     .filter(product => selectedProducts.includes(product.id))
//     .map(product => {
//       return (
//         <tr>
//           <td>{product.name}</td>
//           <td>{fetchedCart[product.id]}</td>
//           <td>{product.cost}</td>
//         </tr>
//       )
//     })}
