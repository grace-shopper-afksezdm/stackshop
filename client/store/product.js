import axios from 'axios'
import { getCart, changeCart, addToCart } from '../components/cartUtilFunctions'

// ACTION TYPES
const GETTING_PRODUCTS = 'GETTING_PRODUCTS'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const CLEAR_CART = 'CLEAR_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_DB_CART = 'ADD_DB_CART'
const DELETE_DB_CART = 'DELETE_DB_CART'

// ACTION CREATORS
const gettingProducts = () => ({ type: GETTING_PRODUCTS, loading: true })
const setProducts = all => ({ type: SET_PRODUCTS, all, loading: false })
const setSingleProduct = product => ({
  type: SET_SINGLE_PRODUCT,
  singleProduct: product,
  loading: false
})
const gettingCart = cart => ({ type: GET_CART, cart })
const clearingCart = () => ({ type: CLEAR_CART })
const updatingCart = (id, quantity) => ({ type: UPDATE_CART, id, quantity })
const addingDbCart = (id, quantity) => ({type: ADD_DB_CART, id, quantity})
const deleteDbCart = (id) => ({ type: DELETE_DB_CART, id })

// THUNK CREATORS

export const clearCart = () => dispatch => {
  dispatch(clearingCart())
}

export const fetchCart = (isLoggedIn) => async dispatch => {
  try {
    if (isLoggedIn) {
      const {data} = await axios.get('/api/cart')
      dispatch(gettingCart(data))
    } else {
      const cart = getCart()
      dispatch(gettingCart(cart))
    }

  } catch (error) {
    console.error(error)
  }
}

export const addProdToCart = (id, quantity) => dispatch => {
  try {
    addToCart(id, quantity)
    let newCart = getCart()
    dispatch(updatingCart(newCart))
  } catch (error) {
    console.error(error)
  }
}

export const updateCart = (id, quantity, isLoggedIn) => async dispatch => {
  try {
    let changeObj = { productId: id, quantity }
    if (isLoggedIn) {
      const {data} = await axios.put('/api/cart', changeObj)
      const productId = data[1][0].productId
      const quantity = data[1][0].quantity
      dispatch(updatingCart( productId, quantity ))
    } else {
      changeCart(id, quantity)
      dispatch( updatingCart(id, quantity))
    }

  } catch (error) {
    console.error(error)
  }
}

export const fetchProducts = () => async dispatch => {
  try {
    dispatch(gettingProducts())
    const { data } = await axios.get('/api/products')
    dispatch(setProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleProduct = productId => async dispatch => {
  try {
    dispatch(gettingProducts())
    const { data } = await axios.get(`/api/products/${productId}`)
    dispatch(setSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const addProdToDBCart = (cart, id, quantity) => async dispatch => {
  try {
    if(Object.keys(cart).includes(id)){
      const updatedQuantity = Number(quantity) + Number(cart[id])
      await axios.put(`/api/products/${id}`, { quantity: updatedQuantity })
      dispatch(addingDbCart(id, updatedQuantity))
    } else {
      await axios.post(`/api/products/${id}`, { quantity: quantity });
      dispatch( addingDbCart(id, quantity) )
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteProdFromDBCart = (id) => async dispatch => {
  try {
    await axios.delete('/api/cart',  { data : { productId: id}})
    dispatch ( deleteDbCart(id))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER
const initialState = { all: [], singleProduct: {}, cart: {}, loading: false }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETTING_PRODUCTS:
      return { ...state, loading: action.loading }
    case SET_PRODUCTS:
      return { ...state, all: action.all, loading: action.loading }
    case SET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.singleProduct,
        loading: action.loading
      }
    case GET_CART:
      return { ...state, cart: action.cart }
    case ADD_TO_CART:
      return { ...state, cart: action.cart }
    case CLEAR_CART:
      return { ...state, cart: {} }
    case UPDATE_CART:
      return { ...state, cart: {...state.cart, [action.id]: action.quantity}}
    case ADD_DB_CART:
      return {...state, cart: {...state.cart, [action.id]: action.quantity} }
    case DELETE_DB_CART:
      const keys = Object.keys(state.cart).filter( id => id !== action.id)
      const newCart = keys.reduce((acu, cur) => {
        acu[cur] = state.cart[cur]
        return acu
      },{})
      return {...state, cart: newCart}
    default:
      return state
  }
}


export default reducer
