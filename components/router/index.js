import render from '../layout.js'

const router = () => {
  const app = document.getElementById('app')
  const path = window.location.pathname
  console.log('path', path)

  if (path === '/dashboard') {
    render(app, 'dashboard')
  } else if (path.startsWith('/products/')) {
    render(app, 'product')
  } else {
    render(app, 'home')
  }
}

window.addEventListener('popstate', router)
document.addEventListener('DOMContentLoaded', () => {
  router()
  document.querySelector('store-header').addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault()
      window.history.pushState({}, '', e.target.href)
      router()
    }
  })
})

export default router
