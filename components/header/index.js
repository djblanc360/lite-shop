import styles from './styles.scss'

class Header extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback() {
      this.render()
      this.addEventListeners()
      window.addEventListener('cart-updated', this.updateCartCount)
    }
  
    disconnectedCallback() {
      window.removeEventListener('cart-updated', this.updateCartCount)
    }
    
    addEventListeners = () => {
      const cartIcon = this.shadowRoot.querySelector('[cart]')
      cartIcon.addEventListener('click', (e) => {
        e.preventDefault()
        const sidedrawer = document.querySelector('store-sidedrawer')
        if (sidedrawer) {
          if (sidedrawer.hasAttribute('open')) {
            sidedrawer.removeAttribute('open')
          } else {
            sidedrawer.setAttribute('open', '')
          }
        }
      })

    }

    updateCartCount = () => {
      const cartCount = this.shadowRoot.querySelector('#cart-count')
      cartCount.innerText = window.cart.item_count
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <header class="header">
          <a href="/"><h1>anti-framework shop</h1></a>
          <nav>
            <a href="/dashboard">Account</a>
            <a href="#" cart>Cart (<span id="cart-count">${cart.item_count}</span>)</a>
          </nav>
        </header>
      `
    }
  }
  
  customElements.define('store-header', Header)
  