const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  githubId: { type: String },
});

// Plugin for passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

// Check if the model already exists before defining it to avoid overwriting
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
