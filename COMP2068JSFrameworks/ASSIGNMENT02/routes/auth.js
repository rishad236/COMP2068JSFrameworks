const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User'); // Ensure the User model is imported

// Handle Local Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/movies', // Redirect to /movies after successful login
  failureRedirect: '/login', // Redirect to /login if authentication fails
  failureFlash: true, // Enable flash messages for failure
}));

// GitHub Login
router.get('/auth/github', passport.authenticate('github'));

// GitHub Callback
router.get('/auth/github/callback',
  passport.authenticate('github', { 
    failureRedirect: '/login', // Redirect to /login on GitHub login failure
  }),
  (req, res) => {
    res.redirect('/movies'); // Redirect to /movies on successful GitHub login
  }
);

// User Registration Page
router.get('/register', (req, res) => {
  res.render('auth/register'); // Render the registration page
});

// Handle User Registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username });
    await User.register(newUser, password);
    res.redirect('/login');
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.redirect('/register');
  }
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
