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
    favorite: {
        type: Boolean,
        default: false
    },
    demoLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['frontend', 'fullstack', 'mobile']
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
