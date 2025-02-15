const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0
  },
  visitors: [{
    type: String,
    timestamp: { type: Date, default: Date.now }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('View', viewSchema);
