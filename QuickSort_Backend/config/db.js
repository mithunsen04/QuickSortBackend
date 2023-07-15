



const mongoose = require('mongoose');
require('dotenv').config();
async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb+srv://quicksort:quicksortadmin123@cluster0.y1iksvk.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application with a failure status
  }
}

module.exports = connectToDatabase;



