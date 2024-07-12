import styles from './styles.scss'
import Cart from '../sidedrawer/cart.js'
import Product from '../product/product.js'
import Util from '../../utils/index.js'

class ProductItem extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback() {
      this.render()
    }
  
    render() {
      const handle = this.getAttribute('handle')
      const media = this.getAttribute('media')
      const name = this.getAttribute('name')
      const price = this.getAttribute('price')
      const url = this.getAttribute('url')

      const product = Product.get(handle)
      // console.log('product', product)

      // console.log('media', media)

      const thumbnail = `http://localhost:9000/assets/products/${handle}/${media}`
      // console.log('thumbnail', thumbnail)
  
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="product-item">
          <img src="${thumbnail}" alt="${name}">
          <a href="${url}"><h3>${name}</h3></a>
          <p>Price: ${Util.currency.format(price)}</p>
          <button add-to-cart>Quick Add</button>
        </div>
      `
  
  
      this.shadowRoot.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        window.history.pushState({}, '', url)
        const router = new PopStateEvent('popstate')
        dispatchEvent(router)
      })
      /* // open modal of quick view
      this.shadowRoot.querySelector('#quick-view').addEventListener('click', () => {
        const product = {
          name,
          price,
          url
        }
        document.querySelector('store-modal').setAttribute('product', JSON.stringify(product))
        document.querySelector('store-modal').open()
      })
      */

      this.shadowRoot.querySelector('[add-to-cart]').addEventListener('click', () => {
        console.log('add to cart', product)
        Cart.addItem(product)
        alert(`${product.name} has been added to the cart.`)
      })

    }
  }
  
  customElements.define('product-item', ProductItem)
  