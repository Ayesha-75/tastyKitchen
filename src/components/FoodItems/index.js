import {Component} from 'react'
// import {withRouter} from 'react-router-dom'

import {BiRupee} from 'react-icons/bi'
import {
  AiFillStar,
  AiOutlinePlusSquare,
  AiOutlineMinusSquare,
} from 'react-icons/ai'
import CartItemsContext from '../../Context/CartItemsContext'

import './index.css'

class FoodItems extends Component {
  state = {
    quantity: 0,
  }

  // onIncrease = () => {
  //   this.setState(prev => ({quantity: prev.quantity + 1}))
  // }

  // onDecrease = () => {
  //   this.setState(prevState => ({quantity: prevState.quantity - 1}))
  // }

  // componentDidMount() {
  //   this.findCartItem()
  // }

  // findCartItem = () => {
  //   const storageCart = JSON.parse(localStorage.getItem('cartData')) || []
  //   const {foodItemDetails} = this.props
  //   const getItem = storageCart.filter(each => each.id === foodItemDetails.id)
  //   if (getItem.length > 0) {
  //     if (getItem[0].quantity >= 1) {
  //       this.setState({quantity: getItem[0].quantity, isFound: true})
  //     } else {
  //       this.setState({isFound: false})
  //     }
  //   }
  // }

  // incrementCartItemQuantity = () => {
  //   const cartData = JSON.parse(localStorage.getItem('cartData'))
  //   const {foodItemDetails} = this.props
  //   const updatedCartData = cartData.map(eachItem => {
  //     if (eachItem.id === foodItemDetails.id) {
  //       // console.log('found')
  //       const updatedQuantity = eachItem.quantity + 1
  //       return {...eachItem, quantity: updatedQuantity}
  //     }
  //     return eachItem
  //   })
  //   // const stringifyData = JSON.stringify(updatedCartData)
  //   localStorage.setItem('cartData', JSON.stringify(updatedCartData))
  //   // this.findCartItem()
  // }

  // decrementCartItemQuantity = () => {
  //   const cartData = JSON.parse(localStorage.getItem('cartData'))
  //   const {foodItemDetails} = this.props
  //   const updatedCartData = cartData.map(eachItem => {
  //     if (eachItem.id === foodItemDetails.id) {
  //       // console.log('found')
  //       if (eachItem.quantity > 0) {
  //         const updatedQuantity = eachItem.quantity - 1
  //         return {...eachItem, quantity: updatedQuantity}
  //       }
  //     }
  //     return eachItem
  //   })
  //   localStorage.setItem('cartData', JSON.stringify(updatedCartData))
  //   // this.findCartItem()
  // }

  // goToCart = () => {
  //   const {history} = this.props
  //   history.replace('/cart')
  // }

  // handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }
  //   this.setState({open: false})
  // }

  render() {
    return (
      <CartItemsContext.Consumer>
        {value => {
          const {addCartItem, incrementItemQuantity, decrementItemQuantity} =
            value

          const {quantity} = this.state
          const {foodItemDetails} = this.props
          const {id, name, cost, rating, imageUrl} = foodItemDetails

          const onAddItem = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            addCartItem({...foodItemDetails, quantity: quantity + 1})
          }

          const onDecrease = () => {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decrementItemQuantity(id)
          }

          const onIncrease = () => {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            incrementItemQuantity(id)
          }

          return (
            <li className="food-item" testid="foodItem">
              <img
                src={imageUrl}
                alt="restaurant"
                className="food-item-image"
              />
              <div className="food-item-details">
                <h1 className="food-item-name" testid="foodItem">
                  {name}
                </h1>
                <p className="food-item-cost" testid="foodItem">
                  <BiRupee aria-label="close" /> {cost}
                </p>
                <p className="food-item-rating" testid="foodItem">
                  <AiFillStar className="star" /> {rating}
                </p>
                {quantity === 0 ? (
                  <button
                    className="add-item-btn"
                    onClick={onAddItem}
                    type="button"
                  >
                    Add
                  </button>
                ) : (
                  <div className="add-btn-box">
                    <div className="add-box">
                      <button
                        className="add-buttons"
                        onClick={onDecrease}
                        testid="decrement-count"
                      >
                        <AiOutlineMinusSquare aria-label="close" />
                      </button>
                      <p className="food-quantity" testid="active-count">
                        {quantity}
                      </p>
                      <button
                        className="add-buttons"
                        onClick={onIncrease}
                        testid="increment-count"
                        type="button"
                      >
                        <AiOutlinePlusSquare aria-label="close" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartItemsContext.Consumer>
    )
  }
}

export default FoodItems
