const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resource = require('../models/Resource');
const Booking = require('../models/Booking');

/**
 * GET all resources
 * Accessible to all logged-in users
 */
router.get('/', auth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const resources = await Resource.find(filter);
    return res.status(200).json(resources);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch resources',
      error: error.message
    });
  }
});

/**
 * ADD resource (warden only)
 */
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'warden') {
      return res.status(403).json({ message: 'Only wardens can add resources' });
    }

    const { name, description, category, location, capacity } = req.body;

    if (!name || !category || !location) {
      return res.status(400).json({
        message: 'Name, category and location are required'
      });
    }

    const resource = new Resource({
      name,
      description,
      category,
      location,
      capacity
    });

    await resource.save();

    return res.status(201).json({
      message: 'Resource added successfully',
      resource
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Failed to add resource',
      error: error.message
    });
  }
});

/**
 * GET all bookings for current user (student) or all bookings (warden)
 */
router.get('/bookings', auth, async (req, res) => {
  try {
    let bookings;
    
    if (req.user.role === 'student') {
      bookings = await Booking.find({ studentId: req.user._id })
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'warden') {
      bookings = await Booking.find()
        .sort({ createdAt: -1 });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

/**
 * CREATE booking (student only)
 */
router.post('/bookings', auth, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can book resources' });
    }

    const { resourceId, bookingDate, startTime, endTime } = req.body;

    if (!resourceId || !bookingDate || !startTime || !endTime) {
      return res.status(400).json({
        message: 'Resource, date, start time and end time are required'
      });
    }

    // Validate resource exists
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Validate date is not in past
    const bookDate = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookDate < today) {
      return res.status(400).json({ message: 'Cannot book for past dates' });
    }

    // Validate time format and logic
    if (startTime >= endTime) {
      return res.status(400).json({ message: 'End time must be after start time' });
    }

    // Check capacity - count concurrent bookings for this time slot
    const concurrentBookings = await Booking.countDocuments({
      resourceId: resourceId,
      bookingDate: bookDate,
      status: { $in: ['confirmed', 'pending'] },
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (concurrentBookings >= resource.capacity) {
      return res.status(409).json({
        message: `Resource is at full capacity (${resource.capacity}) for this time slot`
      });
    }

    // Check if student already has a booking for same resource at same time
    const studentConflict = await Booking.findOne({
      studentId: req.user._id,
      resourceId: resourceId,
      bookingDate: bookDate,
      status: { $in: ['confirmed', 'pending'] },
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (studentConflict) {
      return res.status(409).json({
        message: 'You already have a booking for this resource at this time'
      });
    }

    const booking = new Booking({
      studentId: req.user._id,
      studentName: req.user.name,
      resourceId: resourceId,
      resourceName: resource.name,
      bookingDate: bookDate,
      startTime,
      endTime,
      status: 'confirmed'
    });

    await booking.save();

    return res.status(201).json({
      message: 'Resource booked successfully',
      booking
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Booking failed',
      error: error.message
    });
  }
});

/**
 * GET resource availability for a specific date
 */
router.get('/:id/availability', auth, async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ message: 'Date parameter is required' });
    }

    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const bookingDate = new Date(date);
    const bookings = await Booking.find({
      resourceId: req.params.id,
      bookingDate: bookingDate,
      status: { $in: ['confirmed', 'pending'] }
    }).select('startTime endTime studentName');

    return res.json({
      resource: {
        name: resource.name,
        capacity: resource.capacity
      },
      date: date,
      bookings: bookings
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to check availability',
      error: error.message
    });
  }
});

/**
 * DELETE resource (warden only)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'warden') {
      return res.status(403).json({ message: 'Only wardens can delete resources' });
    }

    // Check if resource has active bookings
    const activeBookings = await Booking.countDocuments({
      resourceId: req.params.id,
      status: { $in: ['confirmed', 'pending'] },
      bookingDate: { $gte: new Date() }
    });

    if (activeBookings > 0) {
      return res.status(400).json({ 
        message: `Cannot delete resource: It has ${activeBookings} active bookings. Please wait for bookings to complete or cancel them first.` 
      });
    }

    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Also delete any old/completed bookings for this resource
    await Booking.deleteMany({ resourceId: req.params.id });

    return res.json({ 
      message: 'Resource deleted successfully',
      deletedResource: resource.name
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Delete failed',
      error: error.message
    });
  }
});

module.exports = router;


/**
 * CANCEL booking (student/warden only)
 */
router.delete('/bookings/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role === 'student' && booking.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }

    if (req.user.role !== 'student' && req.user.role !== 'warden') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const now = new Date();
    const bookingDateTime = new Date(booking.bookingDate);
    const [hours, minutes] = booking.startTime.split(':');
    bookingDateTime.setHours(parseInt(hours), parseInt(minutes));

    if (bookingDateTime < now) {
      return res.status(400).json({ message: 'Cannot cancel past bookings' });
    }

    await Booking.findByIdAndDelete(req.params.id);

    return res.json({ 
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Cancellation failed',
      error: error.message
    });
  }
});
