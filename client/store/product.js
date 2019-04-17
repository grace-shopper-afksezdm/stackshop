import axios from 'axios'

// ACTION TYPES
const GETTING_PRODUCTS = 'GETTING_PRODUCTS'
const SET_PRODUCTS = 'SET_PRODUCTS'

// ACTION CREATORS
const gettingProducts = () => ({type: GETTING_PRODUCTS, loading: true})
const setProducts = all => ({type: SET_PRODUCTS, all, loading: false})

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

// REDUCER
const initialState = {all: [], loading: false}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, all: action.all, loading: action.loading}
    default:
      return state
  }
}

export default reducer
