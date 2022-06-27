const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ ping: 'pong' })
})

app.get('/store', (req, res) => {
  fs.readFile('./data/db.json', 'utf-8', (err, jsonString) => {
    if (err) {
      console.log(err)
    } else {
      try {
        const data = JSON.parse(jsonString)
        res.status(200).json(data)
      } catch (error) {
        console.log(error)
      }
    }
  })
})

app.get('/store/:productId', (req, res) => {
  const productId = req.params.productId - 1
  fs.readFile('./data/db.json', 'utf-8', (err, jsonString) => {
    if (err) {
      console.log(err)
    } else {
      try {
        const data = JSON.parse(jsonString)
        res.status(200).json({product: data.products[productId]})
      } catch (error) {
        console.log(error)
      }
    }
  })
})

module.exports = app
