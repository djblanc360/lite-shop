import styles from './styles.scss'

class Carousel extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.currentIndex = 0
    this.slidesToShow = 1
  }

  connectedCallback() {
    this.render()
    this.init()
  }

  init() {
    this.items = this.shadowRoot.querySelectorAll('.carousel-item')
    this.totalItems = this.items.length
    this.prevButton = this.shadowRoot.querySelector('.prev')
    this.nextButton = this.shadowRoot.querySelector('.next')

    this.prevButton.addEventListener('click', () => this.prev())
    this.nextButton.addEventListener('click', () => this.next())

    this.update()
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems
    this.update()
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems
    this.update()
  }

  update() {}


  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="carousel">
        <div class="carousel-inner">
          <slot></slot>
        </div>
        <button class="prev">❮</button>
        <button class="next">❯</button>
      </div>
    `
  }
}

customElements.define('store-carousel', Carousel)
