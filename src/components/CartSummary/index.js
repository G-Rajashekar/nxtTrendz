import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const getTotalValue = () =>
        cartList.reduce(
          (total, eachItem) => total + eachItem.price * eachItem.quantity,
          0,
        )

      const cost = getTotalValue()
      return (
        <div>
          <h1>Order Total: Rs {cost}/-</h1>
          <p>{cartList.length} Items in cart</p>
          <button type="button" aria-label="Proceed to Checkout">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
