import React from 'react'
import './CheckoutForm.css'

export default function CheckoutForm ({
  isOpen,
  shoppingCart,
  checkoutForm,
  checkoutMessage,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm
}) {
  return (
    <div className='checkout-form'>
      <div className="input-field">
        <label className="label">Name</label>
        <div className="control">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={checkoutForm.name}
            onChange={(e) => handleOnCheckoutFormChange('name', e.target.value)}
            className="checkout-form-input"
          />
        </div>
      </div>
      <div className="input-field">
        <label className="label">Email</label>
        <div className="control">
          <input
            type="email"
            name="email"
            placeholder="student@codepath.org"
            value={checkoutForm.email}
            onChange={(e) => handleOnCheckoutFormChange('email', e.target.value)}
            className='checkout-form-input'
          />
        </div>
      </div>

      {shoppingCart.length > 0 ? <button className="checkout-button" onClick={handleOnSubmitCheckoutForm}>Checkout</button> : null }
      {checkoutMessage === true ? <p className='success'>Success!</p> : null}
      {checkoutMessage === false ? <p className='error'>Error</p> : null}
    </div>
  )
}
