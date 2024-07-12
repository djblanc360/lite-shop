import styles from './styles.scss'

class GridItem extends HTMLElement {
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
        <div class="grid-item">
          <slot></slot>
        </div>
      `
    }
  }
  
  customElements.define('grid-item', GridItem)
  