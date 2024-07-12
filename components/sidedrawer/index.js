import styles from './styles.scss'
import Cart from './cart.js'
import './cart-item.js'
import Util from '../../utils/index.js'

class Sidedrawer extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['open']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open') {
      this.render()
    }
  }

  connectedCallback() {
    this.render()
    window.addEventListener('cart-updated', this.render)
  }

  disconnectedCallback() {
    window.removeEventListener('cart-updated', this.render)
  }

  handleClose = () => {
    this.removeAttribute('open')
  }

  render = () => {
    const { items, item_count, subtotal_price, total_price } = window.cart //Cart.getCart()
    
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="sidedrawer ${this.hasAttribute('open') ? 'open' : ''}">
        <h2>Cart</h2>
        <ul>
          ${items.map(item => `
            <cart-item
              data='${JSON.stringify(item)}'
            ></cart-item>
          `).join('')}
        </ul>
        <hr>
        <p>Items: ${item_count}</p>
        <p>Subtotal: ${Util.currency.format(subtotal_price)}</p>
        <p>Total: ${Util.currency.format(total_price)}</p>
      </div>
      <div class="overlay ${this.hasAttribute('open') ? 'open' : ''}" id="overlay"></div>
    `
    this.shadowRoot.querySelectorAll('.close, .overlay').forEach(element => {
      if (element) element.addEventListener('click', this.handleClose)
    })
  }
}

customElements.define('store-sidedrawer', Sidedrawer)
