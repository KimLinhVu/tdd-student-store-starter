const express = require('express')
// const fs = require('fs')
const Store = require('./models/store')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ ping: 'pong' })
})

app.get('/store', (req, res) => {
//   fs.readFile('./data/db.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//
//     } else {
//       try {
//         const data = JSON.parse(jsonString)
//         res.status(200).json(data)
//       } catch (error) {
//
//       }
//     }
//   })
  const data = Store.getProducts()
  res.status(200).json({ products: data })
})

app.get('/store/:productId', (req, res) => {
  const productId = req.params.productId - 1
  //   fs.readFile('./data/db.json', 'utf-8', (err, jsonString) => {
  //     if (err) {
  //
  //     } else {
  //       try {
  //         const data = JSON.parse(jsonString)
  //         res.status(200).json({ product: data.products[productId] })
  //       } catch (error) {
  //
  //       }
  //     }
  //   })
  const data = Store.getProduct(productId)
  res.status(200).json({ product: data })
})

app.post('/store', (req, res) => {
  const { shoppingCart, user } = req.body

  if (!shoppingCart || !user) {
    return res.status(400)
  }
  const duplicates = shoppingCart => shoppingCart.filter((item, index) => shoppingCart.indexOf(item) !== index)
  if (duplicates) {
    return res.status(400)
  }

  shoppingCart.forEach(item => {
    if (!item.itemId || !item.quantity) {
      return res.status(400)
    }
  })

  const purchase = Store.createPurchase(shoppingCart, user)
  Store.savePurchase(purchase)
  res.status(201).json({ purchase })
})

module.exports = app
