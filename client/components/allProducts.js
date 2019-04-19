/* eslint-disable react/jsx-key */
// All Products React Component
import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
// Link to single product view

class AllProductView extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    if (this.props.loading) return <div>Loading...</div>

    return (
      <div>
        <h1>Our Products</h1>
        <div className="allProducts">
          {Array.isArray(this.props.all) &&
            this.props.all.map(product => {
              return (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <div className="prodCard">
                    <img id="allProdImg" src={product.imageUrl} />
                    <div className="prodInfo">
                      <h3>{product.name}</h3>
                      <p>${product.cost}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    all: state.product.all,
    loading: state.product.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export const AllProducts = connect(mapStateToProps, mapDispatchToProps)(
  AllProductView
)
