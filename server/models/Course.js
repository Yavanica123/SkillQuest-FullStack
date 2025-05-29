const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: 'Beginner', // New field added
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  selected: { type: Boolean, default: false },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
