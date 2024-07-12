import styles from './styles.scss'

class Modal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  open() {
    this.shadowRoot.querySelector('.modal').classList.add('open')
  }

  close() {
    this.shadowRoot.querySelector('.modal').classList.remove('open')
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="modal">
        <div class="content">
          <button class="close">Close</button>
          <slot></slot>
        </div>
      </div>
    `

    this.shadowRoot.querySelector('.close').addEventListener('click', () => this.close())
  }
}

customElements.define('store-modal', Modal)
