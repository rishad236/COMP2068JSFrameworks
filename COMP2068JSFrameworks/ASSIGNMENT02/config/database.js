const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Log the MongoDB URI to verify it's being loaded correctly
    console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);

    // Establish the connection
    await mongoose.connect(process.env.MONGO_URI);

    // Connection successful
    console.log('MongoDB Connected');
  } catch (err) {
    // Log the error message and terminate the process
    console.error('Database Connection Failed:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
