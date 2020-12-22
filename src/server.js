import express from 'express'
import path from 'path'

const app = express()
const DIST_DIR = __dirname
console.log(path.join(DIST_DIR, 'index.html'))
const HTML_FILE = path.join(DIST_DIR, 'index.html')
const port = 3000

app.use('/js', express.static('js'))
app.use('/meta', express.static('meta'))
app.use('/sounds', express.static('sounds'))
app.use(express.static(DIST_DIR))

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.listen(port)