const express = require('express')
const fs = require('fs')
const Store = require('./models/store')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ ping: 'pong' })
})

app.get('/store', (req, res) => {
//   fs.readFile('./data/db.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//       console.log(err)
//     } else {
//       try {
//         const data = JSON.parse(jsonString)
//         res.status(200).json(data)
//       } catch (error) {
//         console.log(error)
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
  //       console.log(err)
  //     } else {
  //       try {
  //         const data = JSON.parse(jsonString)
  //         res.status(200).json({ product: data.products[productId] })
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }
  //   })
  const data = Store.getProduct(productId)
  res.status(200).json({ product: data })
})

app.post('/store', (req, res) => {
  const shoppingCart = req.body.shoppingCart
  const user = req.body.user
  if (!shoppingCart || !user) {
    res.status(400)
  }
  const duplicates = shoppingCart => shoppingCart.filter((item, index) => shoppingCart.indexOf(item) !== index)
  if (duplicates) {
    res.status(400)
  }

  shoppingCart.forEach(item => {
    if (!item.itemId || !item.quantity) {
      res.status(400)
    }
  })
})

module.exports = app
