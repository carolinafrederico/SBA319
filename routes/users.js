// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { users } = require('../data/db');

const { checkAuthenticated, checkNotAuthenticated } = require('../middleware/auth');


router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login', { title: 'Login Page' });
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register', { title: 'Register Page' });
});

router.post('/register', checkNotAuthenticated, async (req, res) => {
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

router.delete('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

module.exports = router;
