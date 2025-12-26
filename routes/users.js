const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all staff members (for warden to assign complaints)
router.get('/staff', auth, async (req, res) => {
  try {
    if (req.user.role !== 'warden') {
      return res.status(403).json({ message: 'Only warden can view staff list' });
    }

    const staff = await User.find({ role: 'staff' }).select('_id name email');
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user info
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

