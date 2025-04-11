const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy; 
const User = require('../models/User');

// GitHub Strategy configuration
passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback', 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          username: profile.username || 'GitHub User',
        });
      }
      return done(null, user); 
    } catch (err) {
      return done(err); 
    }
  }
));

// Serialize user to save in session
passport.serializeUser((user, done) => {
  done(null, user.id); 
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); 
    done(null, user);
  } catch (err) {
    done(err, null); 
  }
});

module.exports = passport;
