/* eslint-disable react/jsx-key */
// All Products React Component
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/product'
// Link to single product view

class AllProductView extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    if (this.props.loading) return <div>Loading...</div>

    return (
      <div>
        <h1>ALL PRODUCTS</h1>
        <ul>
          {Array.isArray(this.props.all) &&
            this.props.all.map(product => {
              return (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <li>
                    <img src={product.imageUrl} />
                    <h3 >{product.name}</h3>
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
    all: state.product.all,
    loading: state.product.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
}

export const AllProducts = connect(mapStateToProps, mapDispatchToProps)(AllProductView)
