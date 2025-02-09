const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    achievements: [{
        type: String
    }],
    technologies: [{
        type: String
    }],
    color: {
        type: String,
        default: 'violet'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);
