const express = require('express');
const app = express()
const PORT = 3003;

app.get('/', (req, res) => {
    res.send('Express Server Home')
});
app.get('/home', (req, res) => {
    res.send('<h1>Hello World</h1>')
});
app.get('/list', (req, res) => {
    res.send(`
        <h1>My List</h1>
        <ul>
        <li>Topic 1</li>
        <li>Topic 2</li>
        <li>Topic 3</li>
        </ul>
        `)
});
app.get('/go-home', (req, res) => {
    res.redirect('/home');
})
app.get ('/json', (req, res)=>{
    res.json({
        author: "Carolinda",
        ratings: [100, 95, 90],
        topic: "Hard News",
        published: true
    }) 
})    
app.listen(PORT, () => {
    console.log(`Express Server is listening on PORT:${PORT}`)
})