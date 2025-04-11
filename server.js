const express = require('express');
const app = express()
const PORT = 3003;

app.get('/', (req, res) => {
    res.send('Express Server Home')
})

app.get('/home', (req, res) => {
    res.send('<h1>Hello World</h1>')

})
app.listen(PORT, () => {
    console.log(`Express Server is listening on PORT:${PORT}`)
}) 