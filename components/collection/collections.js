
import Util from '../../utils/index.js'
import products from '../../data/products.js'

class Collections {
  constructor() {
    console.log('collections constructor')
    this.collections = this.load() || this.init(products)
    this.save()
  }

  // organize products into collections by category and then by handle
  init = (products) => {
    const updatedProducts = this.products.addProperties(products)
    return updatedProducts.reduce((acc, product) => {
      const { category, handle } = product
      const key = category.toLowerCase().replace(/\s+/g, '_')
      if (!acc[key]) {
          acc[key] = {}
      }
      acc[key][handle] = product
      return acc
    }, {})
  }

  get = () => {
    console.log('collections get', this.collections)
    return this.collections
  }

  load = () => {
    console.log('collections load')
    return Util.storage.get('collections')
  }

  save = () => {
    Util.storage.set('collections', this.collections)
  }

  products = {

    get: (category) => {
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
    },

    add: (product) => {
      const category = product.category.toLowerCase().replace(/\s+/g, '_')
      if (!this.collections[category]) {
        this.collections[category] = {}
      }
      this.collections[category][product.name.toLowerCase().replace(/\s+/g, '-')] = product
      this.save()
    },

    addProperties: (products) => {
      return products.map((product, index) => {
          const handle = product.name.toLowerCase().replace(/\s+/g, '-')
          const url = `/products/${handle}`
          return {
              ...product,
              id: index + 1,
              handle: handle,
              url: url,
          }
      })
  }

  }

}

export default new Collections()
