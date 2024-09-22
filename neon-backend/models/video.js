const mongoose = require('mongoose');

// Define Video Schema
const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now }
});

// Create Video Model
module.exports = mongoose.model('video', videoSchema);

