import {expect} from 'chai'
import {fetchProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios
  let fakeProducts = [
    {name: 'Roses', cost: 45},
    {name: 'Peonies', cost: 20},
    {name: 'Carnations', cost: 10}
  ]

  const initialState = {all: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProducts', () => {
    it('eventually dispatches the GETTING PRODUCTS and SET PRODUCTS actions', async () => {
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GETTING_PRODUCTS')
      expect(actions[1].type).to.be.equal('SET_PRODUCTS')
      expect(actions[1].all).to.be.deep.equal(fakeProducts)
    })
  })
})