const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const taskRoutes = require('./routes/taskRoutes');

app.use(logger);
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
    });

app.use('/tasks', taskRoutes);

// Custom 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Global error handler
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});