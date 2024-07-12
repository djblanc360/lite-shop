import styles from './styles.scss'
import '../product-item/index.js'
import '../grid/index.js'
import '../grid-item/index.js'
import Collections from './collections.js'

class Collection extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.collections = Collections.load()
  }

  static get observedAttributes() {
    return ['category']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'category') {
      this.render()
    }
  }

  connectedCallback() {
    this.render()
  }
  
  render() {
    const category = this.getAttribute('category')

    let products = []

    // get products from that category
    if (category) {
      const collection = this.collections[category]
      products = Object.values(collection)
    } else {
      // get products from all categories
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
    }

    this.shadowRoot.innerHTML = `
    <style>${styles}</style>
    <store-grid>
      ${products.map(product => `
        <grid-item>
          <product-item
            handle="${product.handle}"
            media="${product.media[0]}"
            name="${product.name}"
            price="${product.price}"
            url="${product.url}"
          ></product-item>
        </grid-item>
      `).join('')}
    </store-grid>
  `
  }
}

customElements.define('store-collection', Collection)
