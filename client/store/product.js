import axios from 'axios'

// ACTION TYPES
const GETTING_PRODUCTS = 'GETTING_PRODUCTS'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

// ACTION CREATORS
const gettingProducts = () => ({type: GETTING_PRODUCTS, loading: true})
const setProducts = all => ({type: SET_PRODUCTS, all, loading: false})
const setSingleProduct = (product) => ({type: SET_SINGLE_PRODUCT, singleProduct: product, loading: false})

// THUNK CREATORS

export const fetchProducts = () => async dispatch => {
  try {
    dispatch(gettingProducts())
    const {data} = await axios.get('/api/products')
    dispatch(setProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleProduct = (productId) => async dispatch => {
  try {
    dispatch(gettingProducts())
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(setSingleProduct(data))
  } catch (error) {
    next(error)
  }
}

// REDUCER
const initialState = {all: [], singleProduct: {}, loading: false}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_PRODUCTS:
      return {...state, loading: action.loading}
    case SET_PRODUCTS:
      return {...state, all: action.all, loading: action.loading}
    case SET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.singleProduct, loading: action.loading}
    default:
      return state
  }
}

export default reducer
