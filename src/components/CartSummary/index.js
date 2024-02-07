// import {BiRupee} from 'react-icons/bi'

// import Footer from '../Footer'
// import CartItem from '../CartItem'
// import CartItemsContext from '../../Context/CartItemsContext'

// import './index.css'

// const CartSummary = () => (
//   <CartItemsContext.Consumer>
//     {value => {
//       const {cartList} = value

//       const stringifyCartList = localStorage.getItem('cartData')
//       const parsedCartList = JSON.parse(stringifyCartList)

//       let total = 0
//       cartList.forEach(eachCart => {
//         total += eachCart.cost * eachCart.quantity
//       })
//       return (
//         <>
//           <div className="cart-items-box">
//             <div className="t-header">
//               <h1 className="t-h-item">Item</h1>
//               <h1 className="t-h-item-1">Quantity</h1>
//               <h1 className="t-h-item">Price</h1>
//             </div>
//             <ul className="cart-items-list">
//               {parsedCartList.map(e => (
//                 <CartItem key={e.id} itemDetails={e} />
//               ))}
//               <hr className="cart-items-line" />
//             </ul>
//             <div className="total-price-box">
//               <h1 className="order-total-text">Order Total:</h1>
//               <div className="box">
//                 <h1 className="total-price">
//                   <BiRupee /> {total}
//                 </h1>
//               </div>
//             </div>
//             <div className="plaord-ref-btn-box">
//               <button className="place-order-btn">Place Order</button>
//             </div>
//           </div>
//           <Footer />
//         </>
//       )
//     }}
//   </CartItemsContext.Consumer>
// )

// export default CartSummary
