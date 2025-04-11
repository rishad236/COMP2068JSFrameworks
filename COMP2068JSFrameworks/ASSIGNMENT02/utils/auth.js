const express = require('express');
const passport = require('passport');
const router = express.Router();

// GitHub Login
router.get('/auth/github', passport.authenticate('github'));

// GitHub Callback
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to /movies
    res.redirect('/movies');
  }
);

module.exports = router;
