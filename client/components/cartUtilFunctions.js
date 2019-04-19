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
