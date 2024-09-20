const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single user by ID
// Get a single user by auto-incremented ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a user by auto-incremented ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { id: req.params.id },  // Query by auto-incremented ID
      req.body,               // Update with the request body
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
