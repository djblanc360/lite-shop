import Collections from '../collection/collections.js'

class Product {
    constructor() {
      this.collections = Collections.get()
    }

    get = (handle) => {
      for (const category in this.collections) {
        for (const key in this.collections[category]) {
          if (this.collections[category][key].handle === handle) {
            return this.collections[category][key]
          }
        }
      }
      return null
    }

    getRelated = (category, currentHandle) => {
      const products = this.collections[category.toLowerCase().replace(/\s+/g, '_')]
      return Object.values(products).filter(product => product.handle !== currentHandle)
    }
}

export default new Product()