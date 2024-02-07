// import {Component} from 'react'
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai'

import {BiRupee} from 'react-icons/bi'

import CartItemsContext from '../../Context/CartItemsContext'

import './index.css'

const CartItem = props => (
  <CartItemsContext.Consumer>
    {value => {
      const {incrementItemQuantity, decrementItemQuantity} = value
      const {itemDetails} = props
      const {name, imageUrl, id, quantity, cost} = itemDetails

      const decreaseQuantity = () => {
        decrementItemQuantity(id)
      }

      const increaseQuantity = () => {
        incrementItemQuantity(id)
      }

      return (
        <li className="cart-item" testid="cartItem">
          <div className="image-name-box" testid="cartItem">
            <img src={imageUrl} alt="cart-img" className="cart-item-image" />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0px',
                marginLeft: '10px',
              }}
              testid="cartItem"
            >
              <h1 className="cart-item-name">{name}</h1>
            </div>
          </div>
          <div className="quantity-box">
            <button
              className="cart-item-quantity-icon"
              onClick={decreaseQuantity}
              testid="decrement-quantity"
              type="button"
            >
              <AiOutlineMinusSquare aria-label="close" />
            </button>
            <p className="cart-item-quantity" testid="item-quantity">
              {quantity}
            </p>
            <button
              className="cart-item-quantity-icon"
              onClick={increaseQuantity}
              testid="increment-quantity"
              type="button"
            >
              <AiOutlinePlusSquare aria-label="close" />
            </button>
          </div>
          <div className="cart-price-box">
            <p className="cart-item-price" testid="total-price">
              <BiRupee /> {quantity * cost}.00
            </p>
          </div>
          <img src={imageUrl} alt="cart img" className="mob-cart-item-image" />
          <div className="cart-item-details">
            <h1 className="cart-item-name">{name}</h1>
            <div className="mob-cart-quantity-box">
              <button
                type="button"
                className="cart-item-quantity-icon"
                onClick={decreaseQuantity}
                testid="decrement-quantity"
              >
                <AiOutlineMinusSquare aria-label="close" />
              </button>
              <p className="cart-item-quantity" testid="item-quantity">
                {quantity}
              </p>
              <button
                className="cart-item-quantity-icon"
                onClick={increaseQuantity}
                testid="increment-quantity"
                type="button"
              >
                <AiOutlinePlusSquare aria-label="close" />
              </button>
            </div>
            <p className="cart-item-price" testid="total-price">
              <BiRupee /> {quantity * cost}.00
            </p>
          </div>
        </li>
      )
    }}
  </CartItemsContext.Consumer>
)

export default CartItem
