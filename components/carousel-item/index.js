import styles from './styles.scss'

class CarouselItem extends HTMLElement {
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
      <div class="carousel-item">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('carousel-item', CarouselItem)

  