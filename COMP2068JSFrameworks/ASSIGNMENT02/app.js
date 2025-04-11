require('dotenv').config(); // Load environment variables
const express = require('express');
const session = require('express-session');
const createError = require('http-errors');
const passport = require('./config/passport'); 
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Initialize express app
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Other requires for routes, models, etc.
const connectDB = require('./config/database');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');
// Connect to MongoDB
connectDB();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(
  session({
    secret: 'bdd4fd062de266bae8a8a265039806b121ba8b57',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport initialization (only once)
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies', movieRoutes);
app.use('/', authRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export the app
module.exports = app;
