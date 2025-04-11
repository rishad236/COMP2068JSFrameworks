const mongoose = require('mongoose');

// Define movie schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  watched: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
});

// Export the model
module.exports = mongoose.model('Movie', movieSchema);
