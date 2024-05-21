// routes/index.js
const express = require('express');
const router = express.Router();
const hashPassword = require('../../middlewares/encryption')
const User = require('../../models/user/user'); 

// Define route to create a new user
router.post('/create-user', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Create a new user using the User model
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        res.send({
          success: true,
          message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).send({
          success: false,
          message: 'Unable to create user',
          error: error.toString()
        });
    }
});

// Define route to update an existing user
router.post('/update-user', async (req, res) => {
    // Assuming req.body contains user data sent in the request
    const { id, firstName, lastName, email, password } = req.body;

    try {
        // Find the user by ID
        const user = await User.findByPk(id);

        // Update user details
        if (user) {
            await user.update({
                firstName,
                lastName,
                email,
                password
            });
            res.send({
              success: true,
              message: 'User updated successfully'
            });
        } else {
            res.status(404).send({
              success: false,
              message: 'User not found'
            });
        }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Unable to update user',
        error: error.toString()
      });
    }
});

// Define route to get user details
router.get('/get-user', (req, res) => {
    const username = 'boss';
    res.send(`Welcome, ${username}!`);
});

module.exports = router;
