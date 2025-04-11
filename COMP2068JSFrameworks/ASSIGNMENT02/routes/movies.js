const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const ensureAuthenticated = require('../utils/auth'); // Middleware to ensure the user is authenticated

// Public route: List all movies (can be accessed without logging in)
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('movies/index', { title: 'Movies', movies });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading movies');
  }
});

// Protected route: List user-specific movies
router.get('/my-movies', ensureAuthenticated, async (req, res) => {
  try {
    // Log user to check if req.user is defined
    console.log('User:', req.user);
    
    if (!req.user) {
      return res.redirect('/login'); // If the user is not authenticated, redirect to login
    }
    
    const movies = await Movie.find({ user: req.user._id });
    res.render('movies/my-movies', { title: 'My Movies', movies });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Protected route: Add a new movie
router.post('/add', ensureAuthenticated, async (req, res) => {
  try {
    const { title, genre, watched } = req.body;
    
    // Ensure req.user is populated before accessing _id
    if (!req.user) {
      return res.redirect('/login');
    }
    
    // Creating a new movie with the 'watched' field
    await Movie.create({ title, genre, watched: watched || false, user: req.user._id });
    res.redirect('/movies/my-movies');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Protected route: Update a movie
router.post('/update/:id', ensureAuthenticated, async (req, res) => {
  try {
    const { title, genre, watched } = req.body;
    
    if (!req.user) {
      return res.redirect('/login');
    }
    
    // Updating the movie, including the 'watched' status
    await Movie.findByIdAndUpdate(req.params.id, { title, genre, watched });
    res.redirect('/movies/my-movies');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Protected route: Delete a movie
router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect('/login');
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/movies/my-movies');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
