const express = require('express');
const app = express()
const PORT = 3003;

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index.ejs', {name: 'Carolinda'})

})


app.listen(PORT, () => {
    console.log(`Express Server is listening on PORT:${PORT}`)
});