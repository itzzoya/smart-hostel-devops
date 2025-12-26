const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all complaints (warden) or user's complaints (student/staff)
router.get('/', auth, async (req, res) => {
  try {
    let complaints;
    
    // Priority order: urgent > high > medium > low
    const priorityOrder = { urgent: 1, high: 2, medium: 3, low: 4 };
    
    if (req.user.role === 'warden') {
      complaints = await Complaint.find().populate('studentId', 'name email');
    } else if (req.user.role === 'staff') {
      complaints = await Complaint.find({ assignedTo: req.user._id }).populate('studentId', 'name email');
    } else {
      complaints = await Complaint.find({ studentId: req.user._id });
    }

    // Sort by priority first, then by date (newest first within same priority)
    complaints.sort((a, b) => {
      const priorityDiff = (priorityOrder[a.priority] || 5) - (priorityOrder[b.priority] || 5);
      if (priorityDiff !== 0) {
        return priorityDiff; // Sort by priority
      }
      // If same priority, sort by date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create complaint (student only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can create complaints' });
    }

    const { title, description, category, priority } = req.body;

    const complaint = new Complaint({
      studentId: req.user._id,
      studentName: req.user.name,
      title,
      description,
      category,
      priority: priority || 'medium',
      status: 'pending' // Always start as pending
    });

    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Assign complaint to staff (warden only)
router.put('/:id/assign', auth, async (req, res) => {
  try {
    if (req.user.role !== 'warden') {
      return res.status(403).json({ message: 'Only warden can assign complaints' });
    }

    const { staffId } = req.body;
    const staff = await User.findById(staffId);
    
    if (!staff || staff.role !== 'staff') {
      return res.status(400).json({ message: 'Invalid staff member' });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: staffId,
        assignedStaffName: staff.name,
        status: 'assigned'
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update complaint status (staff only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'staff') {
      return res.status(403).json({ message: 'Only staff can update status' });
    }

    const { status, resolutionNotes } = req.body;
    const updateData = { status };

    if (resolutionNotes) {
      updateData.resolutionNotes = resolutionNotes;
    }

    // Set resolvedAt timestamp for resolved and closed status
    if (status === 'resolved' || status === 'closed') {
      updateData.resolvedAt = new Date();
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    if (complaint.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this complaint' });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get complaint by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('studentId', 'name email');
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check authorization
    if (req.user.role === 'student' && complaint.studentId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.user.role === 'staff' && complaint.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete complaint
router.delete('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Authorization: Students can delete their own complaints, Warden can delete closed complaints
    if (req.user.role === 'student') {
      if (complaint.studentId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You can only delete your own complaints' });
      }
    } else if (req.user.role === 'warden') {
      if (complaint.status !== 'closed') {
        return res.status(403).json({ message: 'Only closed complaints can be deleted' });
      }
    } else {
      return res.status(403).json({ message: 'You are not authorized to delete complaints' });
    }

    await Complaint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

