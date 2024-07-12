import Collections from '../collection/collections.js'

class Product {
    constructor() {
      this.collections = Collections.load() || window.collections
    }

    get = (handle) => {
      for (const category in collections) {
        for (const key in collections[category]) {
          if (collections[category][key].handle === handle) {
            return collections[category][key]
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