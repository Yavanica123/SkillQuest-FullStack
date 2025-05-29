const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const SelectedCourse = require('../models/SelectedCourse');

// Sample seed data
const sampleCourses = [
  {
    title: 'Full-Stack Web Development',
    description: 'Learn the complete MERN stack with real-world projects.',
    instructor: 'John Doe',
    duration: '8 weeks',
    level: 'Advanced',
  },
  {
    title: 'React for Beginners',
    description: 'Master React fundamentals and component design.',
    instructor: 'Jane Smith',
    duration: '4 weeks',
    level: 'Beginner',
  },
  {
    title: 'Node.js & Express Bootcamp',
    description: 'Build REST APIs and server-side apps using Node.js and Express.',
    instructor: 'Alex Johnson',
    duration: '6 weeks',
    level: 'Intermediate',
  },
  {
    title: 'MongoDB Essentials',
    description: 'Learn NoSQL data modeling and aggregation with MongoDB.',
    instructor: 'Emily Davis',
    duration: '3 weeks',
    level: 'Beginner',
  },
  {
    title: 'Advanced JavaScript',
    description: 'Deep dive into asynchronous programming, closures, and more.',
    instructor: 'Michael Brown',
    duration: '5 weeks',
    level: 'Advanced',
  },
];

// GET /api/courseRoutes
router.get('/', async (req, res) => {
  try {
    const count = await Course.countDocuments();
    if (count === 0) {
      await Course.insertMany(sampleCourses);
    }

    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT /api/courseRoutes/:id/select?username=john_doe
router.put('/:id/select', async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const alreadySelected = await SelectedCourse.findOne({ courseId: id });
    if (alreadySelected) {
      return res.status(409).json({ message: 'Course already selected' });
    }

    const selection = new SelectedCourse({
      courseId: id,
      courseTitle: course.title,
      selectedAt: new Date()
    });

    await selection.save();

    res.status(200).json({ message: 'Course selected successfully', selection });
  } catch (err) {
    console.error('Error selecting course:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
