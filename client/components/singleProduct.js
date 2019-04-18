import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleProduct } from '../store/product'
import { addToCart, updateCart, removeFromCart, clearCart, getCart } from './cartUtilFunctions'

class SingleProductView extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id)
  }
  render() {
    console.log('Single Product Render')
    const { singleProduct } = this.props
    return (
      <div>
        <img src={singleProduct.imageUrl} />
        <h2>{singleProduct.name}</h2>
        <h4>{singleProduct.cost}</h4>
        <p>{singleProduct.description}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  singleProduct: state.product.singleProduct
})
const mapDispatchToProps = (dispatch) => ({
  fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id))
})

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(SingleProductView)
