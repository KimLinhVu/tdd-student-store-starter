const express = require('express')
const { BadRequestError } = require('./util/errors')
const Store = require('./models/store')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ ping: 'pong' })
})

app.get('/store', (req, res) => {
  const data = Store.getProducts()
  res.status(200).json({ products: data })
})

app.get('/store/:productId', (req, res) => {
  const productId = req.params.productId - 1
  const data = Store.getProduct(productId)
  res.status(200).json({ product: data })
})

app.post('/store', (req, res, next) => {
  const { shoppingCart, user } = req.body

  if (shoppingCart === [] || user.name === '' || user.email === '') {
    return next(new BadRequestError())
  }

  if (new Set(shoppingCart).size !== shoppingCart.length) {
    return next(new BadRequestError())
  }

  shoppingCart.forEach(item => {
    if (!item.itemId || !item.quantity) {
      return next(new BadRequestError())
    }
  })

  const purchase = Store.createPurchase(shoppingCart, user)
  Store.savePurchase(purchase)
  res.status(201).json({ purchase })
})

function genericErrorHandler (error, req, res, next) {
  const status = error.status || 500
  const message = error.message || "Something wen't wrong in the application"

  return res.status(status).json({ error: { message, status } })
}

app.use(genericErrorHandler)

module.exports = app
