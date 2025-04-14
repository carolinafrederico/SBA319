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
  
  // View Engine
  app.engine('ejs', engine);
  app.set('view engine', 'ejs');
  
  // Middleware
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
  
  // Global template variables
  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
  });
  
  // Passport Config
  const initializePassport = require('./password-config');
  const { users } = require('./data/db');
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  );
  
  // Middleware
  const { checkAuthenticated } = require('./middleware/auth');
  
  // Routes
  const userRoutes = require('./routes/users');
  const postRoutes = require('./routes/posts');
  const commentRoutes = require('./routes/comments');
  
  app.use('/', userRoutes);          // Login, Register, Logout
  app.use('/posts', postRoutes);     // Posts CRUD
  app.use('/comments', commentRoutes); // Comments CRUD
  
  // Pages
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
  
  // Error Handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.');
  });
  
  // Start Server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  