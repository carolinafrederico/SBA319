const express = require('express');
const app = express()
const PORT = 3003;
const bcrypt = require('bcrypt')

const users =[]
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.render('index.ejs', {name: 'Carolinda'})

})

app.get('/login', (req, res) => {
    res.render('login.ejs',)
})
app.post('/login', (req, res) => {
    // TODO: Implement login logic
    res.send('Login route hit')
})
app.get('/register', (req, res) => {
    res.render('register.ejs',)
})
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword

        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
    // console.log(users)

})

app.listen(PORT, () => {
    console.log(`Express Server is listening on PORT:${PORT}`)
});