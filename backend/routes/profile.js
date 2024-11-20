const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Update user profile
router.put('/profile', async (req, res) => {
  const { username, profileData } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the profile fields
    user.profile = profileData;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', profile: user.profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
