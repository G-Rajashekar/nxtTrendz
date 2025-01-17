import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const tempList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        const updatedQuantity = eachItem.quantity - 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    const updatedList = tempList.filter(eachItem => eachItem.quantity >= 1)
    this.setState({cartList: updatedList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isProductExist = cartList.find(eachItem => product.id === eachItem.id)
    if (isProductExist) {
      const updatedList = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          const {updatedQuantity} = eachItem.quantity + product.quantity
          return {...eachItem, quantity: updatedQuantity}
        }
        return eachItem
      })
      this.setState({cartList: updatedList})
    } else {
      const updatedList = [...cartList, product]
      this.setState({cartList: updatedList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
