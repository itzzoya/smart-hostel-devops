const express = require('express');
const router = express.Router();

const Complaint = require('../models/Complaint');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');

// DELETE booking (warden/admin only)
router.delete('/booking/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'warden' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only wardens or admins can delete bookings' });
    }

    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully. Stats updated.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET dashboard statistics (warden only)
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'warden') {
      return res.status(403).json({ message: 'Only warden can view statistics' });
    }

    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'pending' });
    const assignedComplaints = await Complaint.countDocuments({ status: 'assigned' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'in-progress' });
    const resolvedComplaints = await Complaint.countDocuments({ status: 'resolved' });

    const complaintsByCategory = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({ status: 'confirmed' });

    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalStaff = await User.countDocuments({ role: 'staff' });
    const totalResources = await Resource.countDocuments();

    res.json({
      complaints: {
        total: totalComplaints,
        pending: pendingComplaints,
        assigned: assignedComplaints,
        inProgress: inProgressComplaints,
        resolved: resolvedComplaints,
        byCategory: complaintsByCategory
      },
      bookings: {
        total: totalBookings,
        active: activeBookings
      },
      users: {
        students: totalStudents,
        staff: totalStaff
      },
      resources: {
        total: totalResources
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
