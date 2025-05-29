const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
// Import your Project model here if needed

// Protect project creation route
router.post('/projects', authMiddleware, (req, res) => {
  // Only logged-in users reach here
  // req.user contains userId and role from the token

  // Your project creation logic here

  res.json({ message: 'Project created successfully' });
});

// Other project routes (GET, PUT, DELETE) can go here

module.exports = router;