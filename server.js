if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();

const PORT = 3003;
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')

const engine = require('ejs-mate');
app.engine('ejs', engine); // use ejs-mate for layout support

app.use(express.static('public'));

const initializePassport = require('./password-config');

const users = []; // Dummy user storage

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

// ROUTES//
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index", { title: "Login Page" });

});
app.get('/home', (req, res) => {
    const post = {
        title: 'Welcome to My Node Auth App!',
        content: 'This is a demo post showing off the authentication system using Express and Passport.js.'
    };

    const name = req.user?.name || 'Guest';
    const isAuthenticated = req.isAuthenticated();

    res.render("home", { 
        title: "Home Page", 
        name, 
        post,
        isAuthenticated
    }); 
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login', { 
        title: "Login Page", 
        isAuthenticated: req.isAuthenticated() 
    });
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register", { 
        title: "Register Page", 
        isAuthenticated: req.isAuthenticated() 
    });
});


app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch (error) {
        req.flash('error', 'Registration failed. Try again.');
        res.redirect('/register');
    }
    
    // console.log(users);
});

app.delete('/logout', (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login'); // Or wherever you want to send the user after logout
    });
  });

//AUTHENTICATE MIDDLEWARE FUNCTIONS//
function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
app.listen(PORT, () => {
    console.log(`Express Server is listening on PORT: ${PORT}`);
});
