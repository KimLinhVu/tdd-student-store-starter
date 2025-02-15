import * as React from 'react'
import './Sidebar.css'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import { Receipt } from '../Receipt/Receipt'

export default function Sidebar ({
  isOpen,
  shoppingCart,
  products,
  baseProducts,
  subtotalPrice,
  taxPrice,
  totalPrice,
  checkoutForm,
  checkoutMessage,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
  handleOnToggle,
  receipt
}) {
  return (
    <section className={isOpen === true ? 'sidebar open' : 'sidebar closed'}>
      <button className="toggle-button" onClick={handleOnToggle}>{isOpen === true ? <i className="material-icons md-48">arrow_back</i> : <i className="material-icons md-48">arrow_forward</i>}</button>
      {isOpen === true
        ? <>
        <ShoppingCart
          isOpen={isOpen}
          shoppingCart={shoppingCart}
          subtotalPrice={subtotalPrice}
          taxPrice={taxPrice}
          totalPrice={totalPrice}
          products={products}
          baseProducts={baseProducts}
        />
        <CheckoutForm
          checkoutForm={checkoutForm}
          checkoutMessage={checkoutMessage}
          shoppingCart={shoppingCart}
          handleOnCheckoutFormChange={handleOnCheckoutFormChange}
          handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
        />
        <Receipt receipt={receipt}/>
      </>
        : null}
    </section>
  )
}
