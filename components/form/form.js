import Collections from '../collection/collections.js'
import Util from '../../utils/index.js'

class Form {
  constructor() {
    this.collections = Collections.load()
  }

  addProduct = (product) => {
    const category = product.category.toLowerCase().replace(/\s+/g, '_')
    if (!this.collections[category]) {
      this.collections[category] = {}
    }
    this.collections[category][product.handle] = product

    // Save updated collections to local storage
    Util.storage.set('collections', this.collections)
    window.collections = this.collections
  }

  generateProps = (product) => {
    const handle = product.name.toLowerCase().replace(/\s+/g, '-')
    const url = `/products/${handle}`
    product.id = Object.values(this.collections).reduce((acc, collection) => acc + Object.keys(collection).length, 0) + 1
    product.handle = handle
    product.url = url
  }

  submit = async (event, shadowRoot) => {
    event.preventDefault()
    const form = shadowRoot.querySelector('form')
    const formData = new FormData(form)
    const product = {}
    const media = []

    formData.forEach((value, key) => {
      if (key === 'media') {
        media.push(value)
        if (!product.media) product.media = []
        if (product.media.length < 4) product.media.push(value.name)
      } else if(key === 'price') {
        product[key] = Util.currency.convert(value)
      } else {
        product[key] = value
      }
    })

    this.generateProps(product)
    console.log('product after props', product)

    this.addProduct(product)
    
    this.uploadImages(product.handle, media)

    form.reset()
    alert('Product added successfully!')
  }

  uploadImages = async (handle, images) => {
    // console.log('handle', handle)
    const formData = new FormData()
    formData.append('handle', handle)
    images.forEach(image => {
      formData.append('images', image)
    })

    // console.log('FormData  to server:')
    // formData.forEach((value, key) => {
    //   console.log(key, value)
    // })
  

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      })
      if (!response.ok) {
        throw new Error('Image upload failed')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default new Form()
