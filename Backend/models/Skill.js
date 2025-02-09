const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Frontend', 'Backend', 'Outils']
    },
    icon: {
        type: String,
        required: true
    },
    iconColor: {
        type: String,
        default: 'blue-500'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Skill', skillSchema);
