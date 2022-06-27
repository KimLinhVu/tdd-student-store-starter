import * as React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import Home from '../Home/Home'
import { NotFound } from '../NotFound/NotFound'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../ProductDetail/ProductDetail'
import axios from 'axios'

import './App.css'

export default function App () {
  const [baseProducts, setBaseProducts] = useState([])
  const [products, setProducts] = useState([])
  const [type, setType] = useState('')
  const [search, setSearch] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '' })
  const [subtotalPrice, setSubtotalPrice] = useState(0)
  const [taxPrice, setTaxPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [checkoutMessage, setCheckoutMessage] = useState(null)

  const isEmptyString = (arg) => {
    return arg === ''
  }

  useEffect(() => {
    setIsFetching(true)
    axios.get('http://localhost:3001/store').then(res => {
      console.log(res)
      let newProduct = res.data.products
      setBaseProducts(newProduct)
      if (!isEmptyString(search)) {
        setProducts(newProduct = newProduct.filter((product) => {
          return product.name.toLowerCase().includes(search)
        }))
      } else {
        setProducts(newProduct)
      }
      if (!isEmptyString(type)) {
        setProducts(newProduct = newProduct.filter((product) => {
          return product.category === type
        }))
      }
    }).catch(err => {
      setError(err)
    })
    setIsFetching(false)
  }, [search, type])

  const handleOnToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleAddItemToCart = (productId) => {
    const shopIdx = shoppingCart.findIndex(item => item.itemId === productId)
    const prodIdx = products.findIndex(item => item.id === productId)
    if (shopIdx !== -1) {
      const newCart = [...shoppingCart]
      newCart[shopIdx].quantity += 1
      setShoppingCart(newCart)
    } else {
      const newProduct = { itemId: productId, quantity: 1 }
      setShoppingCart([...shoppingCart, newProduct])
    }
    setSubtotalPrice(subtotalPrice + products[prodIdx].price)
  }

  const handleRemoveItemFromCart = (productId) => {
    const shopIdx = shoppingCart.findIndex(item => item.itemId === productId)
    const prodIdx = products.findIndex(item => item.id === productId)
    if (shopIdx !== -1) {
      const newCart = [...shoppingCart]
      newCart[shopIdx].quantity -= 1
      if (newCart[shopIdx].quantity === 0) {
        newCart.splice(shopIdx, 1)
        setShoppingCart(newCart)
      } else {
        setShoppingCart(newCart)
      }
      setSubtotalPrice(subtotalPrice - products[prodIdx].price)
    }
  }

  useEffect(() => {
    setTaxPrice(subtotalPrice * 0.0875)
    setTotalPrice(taxPrice + subtotalPrice)
  }, [subtotalPrice, taxPrice])

  const handleOnCheckoutFormChange = (name, value) => {
    setCheckoutForm({ ...checkoutForm, [name]: value })
  }

  const handleOnSubmitCheckoutForm = async () => {
    try {
      const data = await axios.post('https://codepath-store-api.herokuapp.com/store',
        {
          user: {
            name: checkoutForm.name,
            email: checkoutForm.email
          },
          shoppingCart
        })
      data.statusText === 'Created' ? setCheckoutMessage(true) : setCheckoutMessage(false)
      setShoppingCart([])
      setCheckoutForm({ name: '', email: '' })
    } catch (err) {
      setCheckoutMessage(false)
    }
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
        <Sidebar
          products={products}
          baseProducts={baseProducts}
          shoppingCart={shoppingCart}
          subtotalPrice={subtotalPrice}
          taxPrice={taxPrice}
          totalPrice={totalPrice}
          checkoutForm={checkoutForm}
          checkoutMessage={checkoutMessage}
          isOpen={isOpen}
          handleOnToggle={handleOnToggle}
          handleOnCheckoutFormChange={handleOnCheckoutFormChange}
          handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
        />
          {isFetching
            ? <h1>Loading...</h1>
            : <><Navbar isOpen={isOpen}/>
          <div className={isOpen === true ? 'content-open' : 'content'}>
            <Routes>
              <Route path="/"
                element={
                <Home
                  products={products}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemToCart={handleRemoveItemFromCart}
                  search={search}
                  setSearch={setSearch}
                  setType={setType}
                  type={type}
                  shoppingCart={shoppingCart}
                />}
              />
              <Route path="/products/:productId"
                element={
                <ProductDetail
                  isFetching={isFetching}
                  setIsFetching={setIsFetching}
                  shoppingCart={shoppingCart}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemToCart={handleRemoveItemFromCart}
                  setError={setError}
                />}
              />
              <Route path="*" element={<NotFound />}/>

            </Routes>
          </div></>}
        </main>
      </BrowserRouter>
    </div>
  )
}
