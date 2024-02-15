const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {authenticateToken,checkAdminRole} = require('../Middleware/authenticate');
const jwt = require('jsonwebtoken');
const logger = require('../logger');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: '' , // place with your email
      pass: '', // place with your email password
  },
});
  

router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
      logger.info(`User registered: ${req.body.email}`);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {

      logger.error(`Error during user registration: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user in the database
      const user = await User.find({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate a JSON Web Token (JWT)
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
      logger.info(`User logged in: ${req.body.email}`);
      res.json({ token });
      
    } catch (error) {
      logger.error(`Error during user login: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } );


  router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Generate a unique reset token
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Find the user by email
        const user = await User.find({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Set the reset token and expiration time in the user's document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

        // Save the user with the reset token
        await user.save();

        // Send an email with the reset link
        const resetLink = `http://your-website.com/reset-password?token=${resetToken}&email=${email}`;
        const mailOptions = {
            from: 'your-email@gmail.com', // replace with your email
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        logger.info(`User forgot password: ${req.body}`);

        res.json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      logger.info(`Error message: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Add the middleware to your protected routes
router.get('/protected-resource', authenticateToken, (req, res) => {
  // Accessible only with a valid token
  logger.info(`User accessed in protected resource: ${req.user}`);
  res.json({ message: 'Access granted to protected resource', user: req.user });
});


router.post('/reset-password', async (req, res) => {
  try {
      const { email, token, newPassword } = req.body;

      // Find the user by email and check the reset token
      const user = await User.find({
          email,
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
          return res.status(400).json({ error: 'Invalid or expired token' });
      }

      // Update the user's password and reset the token fields
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Save the updated user
      await user.save();
      logger.info(`User reset password: ${req.body}`);
      res.json({ message: 'Password reset successfully' });
  } catch (error) {
    logger.info(`User Reset password: ${req.body.email}`);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/admin', checkAdminRole, (req, res) => {
  logger.info(`User logged in accessing admin routes`);
  res.json({ message: 'Admin dashboard' });
});

 






module.exports = router;
