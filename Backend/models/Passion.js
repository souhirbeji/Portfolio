const mongoose = require('mongoose');

const passionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    iconColor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    favorites: [{
        type: String
    }],
    interests: [{
        type: String
    }],
    activities: [{
        type: String
    }],
    quote: String,
    philosophers: [{
        type: String
    }],
    goals: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Passion', passionSchema);
