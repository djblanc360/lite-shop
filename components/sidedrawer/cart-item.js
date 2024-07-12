import styles from './styles.scss'
import Cart from './cart.js'
import Util from '../../utils/index.js'

class CartItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  // 
  updateItem = (sku) => {
    console.log('updateItem', sku)
    const item = window.cart.items.find(cartItem => cartItem.sku === sku)
    console.log('item', item)
    if (item) {
      this.setAttribute('data', JSON.stringify(item))
      this.render()
    }
  }

  render() {
    const item = JSON.parse(this.getAttribute('data'))
    const thumbnail = `/assets/products/${item.handle}/${item.media[0]}`

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <li 
        class="cart-item" 
        product-id="${item.id}" 
        product-handle="${item.handle}"
        product-sku="${item.sku}"
      >
        <img src="${thumbnail}" alt="${item.name}" class="thumbnail">
        <div class="info">
          <div class="header">
            <span class="name">${item.name}</span>
            <button class="remove">&times</button>
          </div>
          <span class="category">${item.category}</span>
          <span class="price">${Util.currency.format(item.price)}</span>
          <div class="quantity">
            <button class="quantity" decrease>-</button>
            <span>Quantity: ${item.quantity}</span>
            <button class="quantity" increase>+</button>
          </div>
        </div>
      </li>
    `

    this.shadowRoot.querySelector('[decrease]').addEventListener('click', () => {
        Cart.updateItem(item.sku, -1)
        // this.render()
        this.updateItem(item.sku)
      })
      
      this.shadowRoot.querySelector('[increase]').addEventListener('click', () => {
        Cart.updateItem(item.sku, 1)
        // this.render()
        this.updateItem(item.sku)
      })
  
      this.shadowRoot.querySelector('button.remove').addEventListener('click', () => {
        Cart.removeItem(item.sku)
        this.remove()
      })
  }
}

customElements.define('cart-item', CartItem)
