// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/skillbridge';

mongoose.connect(mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
console.error('❌ MongoDB connection error:', err);
process.exit(1); // Exit if unable to connect
});

// Routes
try {
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courseRoutes', require('./routes/courseRoutes'));
console.log('✅ Routes loaded successfully');
} catch (err) {
console.error('❌ Error loading routes:', err.message);
}

// Fallback route (optional)
app.get('/', (req, res) => {
res.send('🌐 SkillBridge API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});