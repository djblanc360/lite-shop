import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'


import multer from 'multer'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 9000


// serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))



// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// client-side routing, return index.html for all non-api routes
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'dist', 'index.html')
  res.sendFile(filePath, err => {
    if (err) {
      res.status(500).send(err)
    }
  })
})



// handle image uploads, use multer for now
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('req.body in storage function:', req.body) // Add this console log
    const { handle } = req.body
    const dir = path.join(__dirname, 'assets', 'products', handle)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.array('images', 4), (req, res) => {
  console.log('req.body in /upload route:', req.body)
  console.log('req.files in /upload route:', req.files)
  res.status(200).send('Images uploaded successfully')
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
