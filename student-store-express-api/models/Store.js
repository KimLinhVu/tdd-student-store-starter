const { storage } = require('../data/storage')

class Store {
  static getProducts () {
    const data = storage.get('products').value()
    return data
  }

  static getOrders () {
    const data = storage.get('purchases').value()
    return data
  }

  static getProduct (id) {
    const data = storage.get('products').value()
    return data[id]
  }

  static getOrder (id) {
    const data = storage.get('purchases').value()
    return data[id]
  }

  static createPurchase (shoppingCart, user) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    const products = Store.getProducts()
    const purchases = storage.get('purchases').value()
    const today = new Date().toLocaleString('en-US')
    let total = 0
    let subtotal = 0

    shoppingCart.forEach(item => {
      const idx = item.itemId - 1
      subtotal = (products[idx].price * item.quantity) + subtotal
    })
    total = (subtotal * 0.0875) + subtotal

    subtotal = formatter.format(subtotal)
    total = formatter.format(total)

    const receipt = Store.createReceipt(shoppingCart, user, subtotal, total)

    const purchase = {
      id: purchases.length,
      name: user.name,
      email: user.email,
      order: shoppingCart,
      total,
      createdAt: today,
      receipt
    }
    return purchase
  }

  static savePurchase (purchase) {
    storage.get('purchases').push(purchase).write()
  }

  static createReceipt (shoppingCart, user, subtotal, total) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    const products = Store.getProducts()
    const result = [`Showing receipt for ${user.name} available at ${user.email}`]

    shoppingCart.forEach(item => {
      const idx = item.itemId - 1
      const newLine = `${item.quantity} total ${products[idx].name} purchased at a cost of ${formatter.format(products[idx].price)} for a total cost of ${formatter.format(products[idx].price * item.quantity)}`
      result.push(newLine)
    })
    result.push(`Before taxes, the subtotal was ${subtotal}`)
    result.push(`After taxes and fees were applied, the total comes out to ${total}`)
    return result
  }
}

module.exports = Store
