const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

app.use('/js', express.static('js'))
app.use('/style', express.static('style'))
app.use('/meta', express.static('meta'))
app.use('/sounds', express.static('sounds'))
app.use('/images', express.static('images'))

app.get('/', (req, res) => {
    fs.createReadStream('index.html').pipe(res)
})

app.listen(port)