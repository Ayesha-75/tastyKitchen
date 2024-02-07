import {Link} from 'react-router-dom'
import CartItemsContext from '../../Context/CartItemsContext'

import './index.css'

const PaymentView = () => (
  <CartItemsContext.Consumer>
    {value => {
      const {removeAllCartItems} = value

      const clearCart = () => {
        removeAllCartItems()
      }

      return (
        <div className="payment-container">
          <img
            src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1705919090/check-circle.1_1s_pewitu.png"
            alt="payment success"
            className="pay-success-img"
          />
          <h1 className="pay-success-text">Payment Successful</h1>
          <p className="thanks-text">
            Thank you for ordering
            <br />
            Your payment is successfully completed.
          </p>
          <Link to="/">
            <button
              className="go-to-home-btn"
              type="button"
              onClick={clearCart}
            >
              Go To Home
            </button>
          </Link>
        </div>
      )
    }}
  </CartItemsContext.Consumer>
)

//   const onPlaceOrder = () => {
//     localStorage.clear('cartData')
//   }

//   return (
//     <div className="payment-container">
//       <img
//         src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1705919090/check-circle.1_1s_pewitu.png"
//         alt="payment success"
//         className="pay-success-img"
//       />
//       <h1 className="pay-success-text">Payment Successful</h1>
//       <p className="thanks-text">
//         Thank you for ordering
//         <br />
//         Your payment is successfully completed.
//       </p>
//       <Link to="/">
//         <button className="go-to-home-btn" type="button" onClick={onPlaceOrder}>
//           Go To Home
//         </button>
//       </Link>
//     </div>
//   )
// }

export default PaymentView
