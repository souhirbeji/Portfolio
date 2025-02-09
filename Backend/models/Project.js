const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: [{
        type: String
    }],
    imageUrl: {
        type: String,
        required: true
    },
    githubLink: {
        type: String,
        required: true
    },
    demoLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['frontend', 'fullstack', 'mobile']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
