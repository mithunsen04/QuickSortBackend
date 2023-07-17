



// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/UserModel');
// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// dotenv.config();

// class UserController {
//   async signup(req, res) {
//     try {
//       // Check if user already exists with the provided email
//       const existingUser = await User.findOne({ email: req.body.email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Email already exists' });
//       }

//       // Hash the password
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);

//       // Create a new user
//       const newUser = new User({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email,
//         password: hashedPassword,
//       });

//       // Save the user to the database
//       await newUser.save();

//       // Return success response
//       res.status(201).json({ message: 'signup sucessful' });
//     } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   async login(req, res) {
//     try {
//       // Find the user with the provided email
//       const user = await User.findOne({ email: req.body.email });
//       if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       // Compare the password
//       const isPasswordValid = await bcrypt.compare(
//         req.body.password,
//         user.password
//       );
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       // Generate JWT token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//       // Return success response with token
//       res.json({ message: 'Logged in successfully', token });
//     } catch (error) {
//       console.error('Error logging in:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

  
//   //  forgot password and reset password logic ----------------------------------------------------------


//   // Forgot password logic
//   async forgotPassword(req, res) {
//     try {
//       const { email } = req.body;

//       // Find the user with the provided email
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       // Generate a password reset token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '1h', // Token expires in 1 hour
//       });

//       // Update the user document with the generated token
//       user.resetPasswordToken = token;
//       user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//       await user.save();

//       // Send password reset email to the user
//       const transporter = nodemailer.createTransport({
//         host: 'smtppro.zoho.in',
//         port: 465,
//         secure: true,
//         auth: {
//           user: 'admin@quicksort.ai',
//           pass: 'X7g9A!XVG5k3',
//         },
//       });

//       const resetUrl = `http://localhost:3000/resetpassword?token=${token}`;

//       const mailOptions = {
//         from: 'admin@quicksort.ai',
//         to: user.email,
//         subject: 'Password Reset',
//         text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         ${resetUrl}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//       };

//       await transporter.sendMail(mailOptions);

//       res.json({ message: 'Password reset email sent' });
//     } catch (error) {
//       console.error('Error initiating password reset:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   // Reset password logic
//   async resetPassword(req, res) {
//     try {
//       const { token, newPassword } = req.body;

//       // Find the user with the provided reset token and check if it's valid
//       const user = await User.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() },
//       });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid or expired token' });
//       }

//       // Hash the new password
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       // Update the user's password and clear the reset token fields
//       user.password = hashedPassword;
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpires = undefined;

//       await user.save();

//       res.json({ message: 'Password reset successful' });
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }


// }

// module.exports = new UserController();





//---------------------------------------------------------------------------------------------------------------




const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
  async signup(req, res) {
    try {
      // Check if user already exists with the provided email
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Create a new user
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();

      // Return success response
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      // Find the user with the provided email
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare the password
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      // Return success response with token
      res.json({ message: 'Logged in successfully', token ,userName: user.firstname});
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }




    // Forgot password logic
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      // Find the user with the provided email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate a password reset token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '10m', // Token expires in 10 min
      });

      // Update the user document with the generated token
      user.resetPasswordToken = token;
     
      user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

      await user.save();

      // Send password reset email to the user
      const transporter = nodemailer.createTransport({
        host: 'smtppro.zoho.in',
        port: 465,
        secure: true,
        auth: {
          user: 'admin@quicksort.ai',
          pass: 'X7g9A!XVG5k3',
        },
      });

      const resetUrl = `https://www.quicksort.ai/resetpassword?token=${token}`;

      const mailOptions = {
        from: 'admin@quicksort.ai',
        to: user.email,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      res.json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error initiating password reset:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Reset password logic
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      // Find the user with the provided reset token and check if it's valid
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password and clear the reset token fields
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }


}

module.exports = new UserController();
