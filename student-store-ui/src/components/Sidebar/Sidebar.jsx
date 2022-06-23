import * as React from "react"
import "./Sidebar.css"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"


export default function Sidebar({
  isOpen, 
  shoppingCart, 
  products, 
  subtotalPrice, 
  taxPrice, 
  totalPrice, 
  checkoutForm, 
  handleOnCheckoutFormChange, 
  handleOnSubmitCheckoutForm, 
  handleOnToggle
}) {
  return (
    <section className={isOpen == true ? "sidebar open" : "sidebar closed"}>
      <button className="toggle-button" onClick={handleOnToggle}>{isOpen == true ? <i className="material-icons md-48">arrow_back</i> : <i className="material-icons md-48">arrow_forward</i>}</button>
      {isOpen == true ?
      <>
        <ShoppingCart 
          isOpen={isOpen} 
          shoppingCart={shoppingCart} 
          subtotalPrice={subtotalPrice} 
          taxPrice={taxPrice} 
          totalPrice={totalPrice} 
          products={products}
        />
        <CheckoutForm 
          checkoutForm={checkoutForm} 
          handleOnCheckoutFormChange={handleOnCheckoutFormChange}
          handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
        />
      </> : null}
    </section>
  )
}
