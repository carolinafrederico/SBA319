if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const app = express();
  const PORT = process.env.PORT || 3003;
  
  const bcrypt = require('bcrypt');
  const passport = require('passport');
  const flash = require('express-flash');
  const session = require('express-session');
  const methodOverride = require('method-override');
  
  const engine = require('ejs-mate');
  app.engine('ejs', engine); // Enable ejs-mate for layouts
  app.set('view engine', 'ejs');
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));
  app.use(flash());
  app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride('_method'));
  
  // Make authentication status available in templates
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
  });
  
  // Load Passport config
  const initializePassport = require('./password-config');
  const { users } = require('./data/db'); // Shared data array for users
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  );
  
  // Middleware
  const { checkAuthenticated, checkNotAuthenticated } = require('./middleware/auth');
  
  // Routes
  const postRoutes = require('./routes/posts');
  const commentRoutes = require('./routes/comments');
  app.use('/posts', postRoutes);
  app.use('/comments', commentRoutes);
  
  // ---------- Auth Routes ----------
  app.get('/', (req, res) => {
    res.redirect('/home');
  });

  app.get('/dashboard', checkAuthenticated, (req, res) => {
  res.render('index', {
    title: 'Dashboard',
    name: req.user?.name || 'User'
  });
});
  app.get('/home', (req, res) => {
    const post = {
      title: 'Welcome!',
      content: 'Authentication with Passport.js is set up.'
    };
    const name = req.user?.name || 'Guest';
    res.render('home', { title: 'Home Page', name, post });
  });
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login', { title: 'Login Page' });
  });
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register', { title: 'Register Page' });
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
    } catch (err) {
      req.flash('error', 'Registration failed. Try again.');
      res.redirect('/register');
    }
  });
  
  app.delete('/logout', (req, res, next) => {
    req.logout(err => {
      if (err) return next(err);
      res.redirect('/login');
    });
  });
  
  // ---------- Error Handling ----------
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.');
  });
  
  // Start Server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  