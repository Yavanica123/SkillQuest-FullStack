const mongoose = require('mongoose');

const selectedCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    unique: true,
  },
  courseTitle: String,
  selectedAt: Date,
});

module.exports = mongoose.model('SelectedCourse', selectedCourseSchema);
