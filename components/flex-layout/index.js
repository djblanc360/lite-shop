import styles from './styles.scss'

class FlexLayout extends HTMLElement {
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
      <div class="flex-layout">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('flex-layout', FlexLayout)
