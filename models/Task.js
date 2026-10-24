const mongoose = require('mongoose');

const taskschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    }
});

// Trim title before saving
taskschema.pre('save', function() {
    if (this.title) {
        this.title = this.title.trim();
    }
});

const Task = mongoose.model('Task', taskschema);

module.exports = Task;