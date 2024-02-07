import {Component} from 'react'
// import {Link} from 'react-router-dom'
// import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
// import CartItem from '../CartItem'
import CartItemsContext from '../../Context/CartItemsContext'
import CartListView from '../CartListView'
import EmptyCart from '../EmptyCart'
// import CartSummary from '../CartSummary'

import './index.css'

// const cartStatusConstants = {
//   initial: 'INITIAL',
//   cartItemsList: 'SUCCESS',
//   emptyCart: 'FAILURE',
//   paymentSuccess: 'PAYMENT',
// }

// class Cart extends Component {
//   state = {
//     cartData: [],
//     cartStatus: cartStatusConstants.initial,
//   }

// componentDidMount() {
//   this.getCartData()
// }

// onRefresh = () => {
//   const itemsList = JSON.parse(localStorage.getItem('cartData'))
//   this.setState({itemsList})
// }

// goToHomePage = () => {
//   const {history} = this.props
//   history.replace('/')
// }

// getCartData = () => {
//   const cartData = JSON.parse(localStorage.getItem('cartData')) || []
//   if (cartData.length === 0) {
//     // console.log(cartData.length)
//     this.setState({cartStatus: cartStatusConstants.emptyCart})
//   } else {
//     this.setState({
//       cartData,
//       cartStatus: cartStatusConstants.cartItemsList,
//     })
//   }
// }

// incrementCartItemQuantity = id => {
//   const cartData = JSON.parse(localStorage.getItem('cartData'))
//   const updatedCartData = cartData.map(eachItem => {
//     if (eachItem.id === id) {
//       // console.log(eachItem.quantity)
//       const updatedQuantity = eachItem.quantity + 1
//       return {...eachItem, quantity: updatedQuantity}
//     }
//     return eachItem
//   })
//   localStorage.setItem('cartData', JSON.stringify(updatedCartData))
//   this.getCartData()
// }

// decrementCartItemQuantity = id => {
//   const cartData = JSON.parse(localStorage.getItem('cartData'))
//   const updatedCartData = cartData.map(eachItem => {
//     if (eachItem.id === id) {
//       // if (eachItem.quantity > 0) {
//       //   // console.log(eachItem.quantity)
//       const updatedQuantity = eachItem.quantity - 1
//       // console.log('updated:>>', updatedQuantity)
//       return {...eachItem, quantity: updatedQuantity}
//     }

//     return eachItem
//   })

//   // localStorage.setItem('cartData', JSON.stringify(updatedCartData))
//   // this.getCartData()
//   // console.log('updatedCartData :>> ', updatedCartData)
//   // // localStorage.setItem('cart_data', JSON.stringify(updatedCartData))
//   // // this.getTheCartData()
//   // this.removeCartItem(updatedCartData)
// }

// componentDidMount() {
//   const itemsList = JSON.parse(localStorage.getItem('cart_items'))
//   this.setState({itemsList})
// }

// componentWillUnmount() {
//   const itemsList = JSON.parse(localStorage.getItem('cart_items'))

//   // console.log(typeof(Object.entries(itemsList)), "000000")

//   if (itemsList === null || itemsList.length === 0) {
//     localStorage.removeItem('cart_items')
//   }
// }

// onRefresh = () => {
//     const itemsList = JSON.parse(localStorage.getItem('cartData'))
//     this.setState({itemsList})
// }

// onPlaceOrder = () => {
//   this.setState({cartStatus: cartStatusConstants.paymentSuccess})
//   localStorage.clear('cartData')
// }

// renderEmptyCartView = () => (
//   <div className="empty-cart-box">
//     <img
//       src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1705918952/cooking_1bowl_lxca4a.png"
//       alt="empty cart"
//       className="bowl-image"
//     />
//     <h1 className="no-orders-text">No Order Yet!</h1>
//     <p className="cart-empty-text">
//       Your cart is empty. Add something from the menu.
//     </p>
//     <Link to="/">
//       <button className="order-btn" type="button">
//         Order Now
//       </button>
//     </Link>
//   </div>
// )

// renderPaymentSuccessView = () => (
// <div className="payment-container">
//   <img
//     src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1705919090/check-circle.1_1s_pewitu.png"
//     alt="payment success"
//     className="pay-success-img"
//   />
//   <h1 className="pay-success-text">Payment Successful</h1>
//   <p className="thanks-text">
//     Thank you for ordering
//     <br />
//     Your payment is successfully completed.
//   </p>
//   <Link to="/">
//     <button className="go-to-home-btn" type="button">
//       Go To Home
//     </button>
//   </Link>
// </div>
// )

// DeleteCartItem = id => {
//   const itemsList = JSON.parse(localStorage.getItem('cart_items'))
//   if (itemsList === null) {
//     localStorage.removeItem('cart_tems')
//   } else {
//     const updatedList = itemsList.filter(each => each.id !== id)
//     this.setState({itemsList: updatedList})
//     localStorage.setItem('cart_items', JSON.stringify(updatedList))
//   }
// }

// totalPrice = () => {
//   const cartData = JSON.parse(localStorage.getItem('cartData')) || []
//   if (cartData.length > 0) {
//     const cartValue = cartData.map(each => each.quantity * each.cost)
//     const reduceValue = cartValue.reduce((a, b) => a + b)
//     return reduceValue
//   }
//   // const {cartData} = this.state
//   // const amountList = cartData.map(each => each.quantity * each.cost)
//   // // console.log(amountList)
//   // const totalAmount = amountList.reduce((a, b) => a + b)
//   // return totalAmount
//   return 0
// }

class Cart extends Component {
  render() {
    return (
      <CartItemsContext.Consumer>
        {value => {
          const {cartList} = value
          const showEmpty = cartList.length === 0

          return (
            <>
              <Header />
              <div className="cart-container">
                {showEmpty ? <EmptyCart /> : <CartListView />}
              </div>
              <Footer />
            </>
          )
        }}
      </CartItemsContext.Consumer>
    )
  }
}

// renderCartItems = () => {
//   const {cartData} = this.state
//   const total = this.totalPrice()
//   return (
//     <>
// <div className="cart-items-box" testid="cartItem">
//   <div className="t-header">
//     <h1 className="t-h-item">Item</h1>
//     <h1 className="t-h-item-1">Quantity</h1>
//     <h1 className="t-h-item">Price</h1>
//   </div>
//   <ul className="cart-items-list">
//     {cartData.map(eachCart => (
//       <CartItem
//         key={eachCart.id}
//         itemDetails={eachCart}
//         incrementQuantity={this.incrementCartItemQuantity}
//         decrementQuantity={this.decrementCartItemQuantity}
//       />
//     ))}
//     <hr className="cart-items-line" />
//   </ul>
//   <div className="total-price-box" alt="total-price">
//     <h1 className="order-total-text">Order Total:</h1>
//     <div className="box">
//       <h1 className="total-price">
//         <BiRupee /> {total}.00
//       </h1>
//     </div>
//   </div>
//   <div className="plaord-ref-btn-box">
//     <button
//       className="place-order-btn"
//       type="button"
//       onClick={this.onPlaceOrder}
//     >
//       Place Order
//     </button>
//   </div>
// </div>
// <Footer />
//     </>
//   )
// }

// renderCartView = () => {
//   const {itemsList, placeOrder} = this.state
//   if (itemsList === null || itemsList.length === 0) {
//     return this.renderEmptyCartView()
//   }
//   if (
//     (itemsList !== null || itemsList.length !== 0) &&
//     placeOrder === false
//   ) {
//     return this.renderCartItems()
//   }
//   return this.renderPaymentSuccessView()
// }

// renderCartView = () => {
//   const {cartStatus} = this.state
//   switch (cartStatus) {
//     case cartStatusConstants.cartItemsList:
//       return this.renderCartItems()
//     case cartStatusConstants.emptyCart:
//       return this.renderEmptyCartView()
//     case cartStatusConstants.paymentSuccess:
//       return this.renderPaymentSuccessView()
//     default:
//       return null
//   }
// }

//   render() {
//     return (
//       <div className="cart-container">
//         <Header />
//         <div className="cart-responsive-box">{this.renderCartView()}</div>
//       </div>
//     )
//   }
// }

export default Cart
