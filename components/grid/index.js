import styles from './styles.scss'

class Grid extends HTMLElement {
    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback() {
      this.render()
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="grid">
          <slot></slot>
        </div>
      `
    }
  }
  
  customElements.define('store-grid', Grid)
  