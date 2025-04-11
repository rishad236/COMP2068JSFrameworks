const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/login', (req, res) => {
  console.log('Is User Authenticated?', req.isAuthenticated());
  res.render('login');
});

// Add more routes here if needed
module.exports = router;
