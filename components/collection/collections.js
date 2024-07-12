
import Util from '../../utils/index.js'

class Collections {
  constructor() {
    this.collections = this.load()
  }

  load = () => Util.storage.get('collections') || window.collections

  save = () => {
    Util.storage.set('collections', this.collections)
    window.collections = this.collections
  }

  getProducts = (category) => {
    if (category) {
      return Object.values(this.collections[category] || {})
    } else {
      const products = []
      const skuSet = new Set()
      for (let key in this.collections) {
        for (let handle in this.collections[key]) {
          const product = this.collections[key][handle]
          if (!skuSet.has(product.sku)) {
            skuSet.add(product.sku)
            products.push(product)
          }
        }
      }
      return products
    }
  }

  addProduct = (product) => {
    const category = product.category.toLowerCase().replace(/\s+/g, '_')
    if (!this.collections[category]) {
      this.collections[category] = {}
    }
    this.collections[category][product.name.toLowerCase().replace(/\s+/g, '-')] = product
    this.save()
  }
}

export default new Collections()
