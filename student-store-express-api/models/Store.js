const { storage } = require('../data/storage')

class Store {
  static getProducts () {
    const data = storage.get('products').value()
    return data
  }

  static getProduct (id) {
    const data = storage.get('products').value()
    return data[id]
  }
}

module.exports = Store
