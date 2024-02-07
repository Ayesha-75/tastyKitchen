import React from 'react'

const CartItemsContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  incrementItemQuantity: () => {},
  decrementItemQuantity: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
})

export default CartItemsContext
