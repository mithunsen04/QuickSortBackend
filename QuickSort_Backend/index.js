


const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);




// Routes
const waitlistRoutes = require('./routes/waitlistRoutes');
app.use('/', waitlistRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal server error' });
// });


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, async () => {
  try {
    await connectToDatabase();
    console.log('Listening on port', port);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Exit the application with a failure status
  }
});



