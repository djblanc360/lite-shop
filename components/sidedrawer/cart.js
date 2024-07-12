
import Util from '../../utils/index.js'

class Cart {
  constructor() {
    this.cart = this.loadCart()
  }

  buildCart = () => ({
    item_count: 0,
    items: [],
    subtotal_price: 0,
    total_price: 0
  })

  getCart = () => this.cart

  loadCart = () => Util.storage.get('cart') || this.buildCart()

  saveCart = () => Util.storage.set('cart', this.cart)

  addItem = (item) => {
    const exists = this.cart.items.find(cartItem => cartItem.sku === item.sku)
    console.log(exists)
    if (exists) {
      exists.quantity += 1
    } else {
      item.quantity = 1
      this.cart.items.push(item)
    }
    this.updateCart()
    this.saveCart()
  }

  removeItem = (sku) => {
    this.cart.items = this.cart.items.filter(cartItem => cartItem.sku !== sku)
    this.updateCart()
    this.saveCart()
  }

  updateItem = (sku, quantity) => {
    const item = this.cart.items.find(cartItem => cartItem.sku === sku)
    if (item) {
      item.quantity += quantity
      if (item.quantity <= 0) {
        this.removeItem(sku)
      } else {
        this.updateCart()
        this.saveCart()
      }
    }
  }

  updateCart = () => {
    this.cart.item_count = this.cart.items.reduce((count, item) => count + item.quantity, 0)
    this.cart.subtotal_price = this.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    this.cart.total_price = this.cart.subtotal_price // no taxes or shipping
    window.dispatchEvent(new CustomEvent('cart-updated'))
  }
}

const newCart = new Cart()
window.cart = newCart.cart

export default newCart
