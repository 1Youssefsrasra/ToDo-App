require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the task routes
const taskRoutes = require('./routes/taskRoute'); // Ensure path is correct

// Express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Use the task routes
app.use('/api', taskRoutes); // '/api/tasks' is the base URL for task-related routes

// Connect to MongoDB
const dbURI = process.env.DB_URI || 'mongodb://mongo_db:27017/todoapp';  // Fallback to MongoDB service in docker-compose
const port = process.env.PORT || 3000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start listening for requests after successful DB connection
        app.listen(port, () => {
            console.log(`Connected to the database and listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
