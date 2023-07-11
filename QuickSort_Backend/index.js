


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectToDatabase = require('./config/db');
const qs = require('qs');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('./models/UserModel');
// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);


 async function googleHandler(request,res) {
  //get the code from qs
  const code = request.query.code 
  // get the id and access token from code
  const { id_token, access_token } = await getGoogleOAuthTokens({ code });
  console.log({ id_token, access_token });

  //get user using tokens
  const user = jwt_decode(id_token);
  console.log({ user });

// if the email already exi
  let existingUser = await User.findOne({ email: user.email });
  console.log({existingUser})
  if (!existingUser) {
    const newUser = new User({
      firstname: user.given_name,
      lastname: user.family_name,
      email: user.email,
    });
    existingUser = await newUser.save();
    console.log('User created successfully');
  } else {
    console.log('User with the same email already exists');
  }
 
//jwt tokern generate 
  const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET);


  //redirect to home page

 res.redirect(302,`http://localhost:3000?token=${token}`)
}

 async function getGoogleOAuthTokens({ code }) {
  const url = 'https://oauth2.googleapis.com/token';

  const values = {
      code,
      client_id: '38145906488-qcuhj8ip8cv5vct41b1vk0q3330bte0j.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: 'http://localhost:8000/google/callback',
      grant_type: 'authorization_code',
  };

  try {
      const res = await axios.post(url, qs.stringify(values), {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
      });
      return res.data;
  } catch (error) {
      console.log({ error });
  }
}

app.get('/google/callback', googleHandler)

// Routes
const waitlistRoutes = require('./routes/waitlistRoutes');
app.use('/', waitlistRoutes);


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



