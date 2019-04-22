import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/product'
import {
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
  getCart
} from './cartUtilFunctions'
import {AddQuantityToCart} from './addQuantitytoCart'

class SingleProductView extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  render() {
    console.log('Single Product Render')
    const {singleProduct} = this.props
    return (
      <div className="container">
        <div>
          <img src={singleProduct.imageUrl} />
        </div>
        <div id="prodDetails">
          <h2>{singleProduct.name}</h2>
          <br />
          <h4>Details:</h4>
          <p>{singleProduct.description}</p>
          <br />
          <h4>Our Price: ${singleProduct.cost}</h4>
          <br />
          <AddQuantityToCart id={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.product.singleProduct
})
const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SingleProductView
)
