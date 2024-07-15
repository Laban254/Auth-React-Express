// db/mongoose.js
const mongoose = require('mongoose');
const dotenv =  require('dotenv');


dotenv.config();

const mongodb_URL = process.env.MONGODB_URL || "mongodb+srv://kibe:Laban254@cluster0.scsy9o5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDatabase = async () => {
  try {
    await mongoose.connect(mongodb_URL, {
    });
    console.log('Connected to MongoDB Database');
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }

  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error(`Database connection error: ${error.message}`);
  });
  db.once('open', () => {
    console.log('Successfully connected to the database');
  });

  // Ensure proper handling of MongoDB connection events
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
};

module.exports = connectDatabase;