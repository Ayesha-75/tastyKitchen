import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Cart from './components/Cart'
import CartItemsContext from './Context/CartItemsContext'
import RestaurantDetailedPage from './components/RestaurantDetailedPage'
import './App.css'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }
  return parsedCartList
}

class App extends Component {
  state = {
    cartList: getCartListFromLocalStorage(),
  }

  // componentDidMount() {
  //   const cartList = JSON.parse(localStorage.getItem('cartData'))
  //   this.setState({cartList})
  // }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachCart => eachCart.id !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCart => {
        if (id === eachCart.id) {
          const updatedQuantity = eachCart.quantity + 1
          return {...eachCart, quantity: updatedQuantity}
        }
        return eachCart
      }),
    }))
  }

  decrementItemQuantity = id => {
    const {cartList} = this.state
    const itemObj = cartList.find(eachCart => eachCart.id === id)

    if (itemObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (id === eachCart.id) {
            const updatedQuantity = eachCart.quantity - 1
            return {...eachCart, quantity: updatedQuantity}
          }
          return eachCart
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = newItem => {
    const {cartList} = this.state
    const itemObj = cartList.find(eachCart => eachCart.id === newItem.id)
    if (itemObj) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (itemObj.id === eachCart.id) {
            const updatedQuantity = newItem.quantity
            return {...eachCart, quantity: updatedQuantity}
          }
          return eachCart
        }),
      }))
    } else {
      const updatedCartList = [...cartList, newItem]
      this.setState({cartList: updatedCartList})
    }
  }
  // addCartItem = newItem => {
  //   this.setState(prevState => ({
  //     cartList: [...prevState.cartList, newItem],
  //   }))
  // }

  // updateQunatity = item => {
  //   const cartItems = JSON.parse(localStorage.getItem('cart_items'))
  //   for (let i of cartItems) {
  //     if (i.id === item.id) {
  //       i.quantity = item.quantity
  //     }
  //   }
  //   localStorage.setItem('cart_items', JSON.stringify(cartItems))
  // }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <CartItemsContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementItemQuantity: this.incrementItemQuantity,
          decrementItemQuantity: this.decrementItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurants-list/:id"
            component={RestaurantDetailedPage}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartItemsContext.Provider>
    )
  }
}

export default App
