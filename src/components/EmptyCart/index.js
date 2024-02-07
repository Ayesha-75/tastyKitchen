import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div className="empty-cart-box">
    <img
      src="https://res.cloudinary.com/dadtgoi5h/image/upload/v1705918952/cooking_1bowl_lxca4a.png"
      alt="empty cart"
      className="bowl-image"
    />
    <h1 className="no-orders-text">No Order Yet!</h1>
    <p className="cart-empty-text">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button className="order-btn" type="button">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCart
