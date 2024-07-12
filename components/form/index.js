import styles from './styles.scss'
import Form from  './form.js'

class StoreForm extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
    this.addEventListeners()
  }

  addEventListeners() {
    this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
      Form.submit(event, this.shadowRoot) // so submit can access shadowRoot
    })
  }


  render() {
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <form>
        <label>Name: <input type="text" name="name" required></label>
        <label>Description: <textarea name="description" required></textarea></label>
        <label>Price: <input type="number" name="price" required></label>
        <label>Category: <input type="text" name="category" required></label>
        <label>SKU: <input type="text" name="sku" required></label>
        <label>Images: <input type="file" name="media" accept="image/*" multiple required></label>
        <button type="submit">Add Product</button>
      </form>
    `
  }
}

customElements.define('store-form', StoreForm)
