import styles from './styles.scss'

class FlexBox extends HTMLElement {
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
      <div class="flex-box">
        <slot></slot>
      </div>
    `
  }
}

customElements.define('flex-box', FlexBox)
export default FlexBox
