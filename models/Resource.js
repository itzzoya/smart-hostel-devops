const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['washing-machine', 'study-room', 'gym', 'common-room', 'kitchen', 'other'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    default: 1,
    min: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
