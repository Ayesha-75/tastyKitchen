import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import PaymentView from '../PaymentView'
import CartItem from '../CartItem'
import Footer from '../Footer'
import CartItemsContext from '../../Context/CartItemsContext'

import './index.css'

class CartListView extends Component {
  state = {
    isOrderPlaced: false,
  }

  orderPlaced = () => {
    this.setState(prevState => ({isOrderPlaced: !prevState.isOrderPlaced}))
  }

  render() {
    const {isOrderPlaced} = this.state

    return (
      <CartItemsContext.Consumer>
        {value => {
          const {cartList} = value
          const stringifyCartList = localStorage.getItem('cartData')
          const parsedCartList = JSON.parse(stringifyCartList)

          let total = 0
          cartList.forEach(eachCart => {
            total += eachCart.cost * eachCart.quantity
          })

          return isOrderPlaced ? (
            <PaymentView />
          ) : (
            <>
              <div className="cart-items-box">
                <div className="t-header">
                  <h1 className="t-h-item">Item</h1>
                  <h1 className="t-h-item-1">Quantity</h1>
                  <h1 className="t-h-item">Price</h1>
                </div>
                <ul className="cart-items-list">
                  {parsedCartList.map(e => (
                    <CartItem key={e.id} itemDetails={e} value={value} />
                  ))}
                  <hr className="cart-items-line" />
                </ul>
                <div className="total-price-box">
                  <h1 className="order-total-text">Order Total:</h1>
                  <div className="box" testid="total-price">
                    <h1 className="total-price">
                      <BiRupee /> {total}.00
                    </h1>
                  </div>
                </div>
                <div className="plaord-ref-btn-box">
                  <button
                    className="place-order-btn"
                    onClick={this.orderPlaced}
                    type="button"
                  >
                    Place Order
                  </button>
                </div>
              </div>
              <Footer />
            </>
          )
        }}
      </CartItemsContext.Consumer>
    )
  }
}
// const CartListView = () => (
//   <CartItemsContext.Consumer>
//     {value => {
//       const {cartList} = value

//       return (
//         <ul className="cart-list">
//           {cartList.map(eachCartItem => (
//             <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
//           ))}
//         </ul>
//       )
//     }}
//   </CartItemsContext.Consumer>
// )

export default CartListView
