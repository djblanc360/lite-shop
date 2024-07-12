import styles from './styles.scss'
import '../grid/index.js'
import '../grid-item/index.js'
import '../collection/index.js'
import Cart from '../sidedrawer/cart.js'
import Product from './product.js'
import Util from '../../utils/index.js'

class StoreProduct extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const url = window.location.pathname
    const handle = url.split('/').pop()
    const product = Product.get(handle)

    // console.log('url', url)
    // console.log('handle', handle)
    // console.log('product', product)

    if (!product) {
      this.shadowRoot.innerHTML = `<p>Product not found</p>`
      return
    }

    const thumbnail = `/assets/products/${product.handle}/${product.media[0]}`
    const media = product.media.map((media) => 
      `<img src="/assets/products/${product.handle}/${media}" alt="${product.name}">`
    ).join('')
    const category = product.category.toLowerCase()
    const relatedProducts = Product.getRelated(product.category, product.handle)

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="product">
        <div class="media-grid" style="width:50%">
          <store-grid>
            ${product.media.map((media) => `
            <grid-item>
              <img src="/assets/products/${product.handle}/${media}" alt="${product.name}">
            </grid-item>
            `).join('')}
          </store-grid>
        </div>
        <div class="product-details">
          <h1>${product.name}</h1>
          <img class="main-image" src="${thumbnail}" alt="${product.name}">
          <p>${product.description}</p>
          <p>Price: ${Util.currency.format(product.price)}</p>
          <button add-to-cart>Add to Cart</button>
          ${relatedProducts.length > 0 ? `
            <hr>
            <h2>Related Products</h2>
          ` : ''}
          <store-grid>
            ${relatedProducts.map(product => `
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
        </div>
      </div>
    `

    this.shadowRoot.querySelector('.media-grid').addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const modal = document.querySelector('store-modal')
        modal.innerHTML = media
        modal.open()
      }
    })

    this.shadowRoot.querySelector('[add-to-cart]').addEventListener('click', () => {
      Cart.addItem(product)
      alert(`${product.name} has been added to the cart.`)
    })

  }
}

customElements.define('store-product', StoreProduct)
