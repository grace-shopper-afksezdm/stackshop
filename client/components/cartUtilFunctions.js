export const addToCart = (id, quantity) => {
  const prevQuantity = localStorage.getItem(id)

  if (prevQuantity) {
    const updatedQuantity = Number(prevQuantity) + quantity
    localStorage.setItem(id, updatedQuantity)
  } else {
    localStorage.setItem(id, quantity)
  }
}

export const changeCart = (id, quantity) => {
  localStorage.setItem(id, quantity)
}

export const removeFromCart = id => {
  localStorage.removeItem(id)
}

export const clearCart = () => {
  localStorage.clear()
}

export const getCart = () => {
  const cart = {}

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    cart[key] = Number(localStorage.getItem(key))
  }

  return cart
}

// export const calculateTotal = () => {
//   let prodIds = Object.keys(this.props.cart).map(id => Number(id))
//   const currProds = this.props.products.filter(product =>
//     prodIds.includes(product.id)
//   )
//   const costArr = currProds.map(
//     product => product.cost * this.props.cart[product.id]
//   )
//   return costArr.reduce((acc, currVal) => acc + currVal, 0)
// }
