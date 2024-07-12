const render = (app, page) => {
    if (page === 'dashboard') {
      app.innerHTML = `
      <flex-layout>
        <h2>Create a new product</h2>
      </flex-layout>
      <flex-layout>
        <store-form></store-form>
      </flex-layout>
      `
    } else if (page === 'product') {
      app.innerHTML = `
        <store-product></store-product>
      `
    } else {
      const categories = Object.keys(window.collections).map(category => 
        `<option value="${category}">${category.replace('_', ' ')}</option>`
      ).join('')



      app.innerHTML = `
      <flex-layout>
        <label for="category-select">filter by category:</label>
        <select id="category-select">
          <option value="">All</option>
          ${categories}
        </select>
      </flex-layout>
        
        <flex-box>
        <store-collection category=""></store-collection>
        </flex-box>
      `

      const select = document.getElementById('category-select')
      const collection = document.querySelector('store-collection')

      select.addEventListener('change', (event) => {
        collection.setAttribute('category', event.target.value)
      })
    }
  }
  
  export default render
  