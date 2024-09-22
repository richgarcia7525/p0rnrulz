const express = require('express');
const multer = require('multer');
const Video = require('../models/video'); // Capitalize 'Video' here
const path = require('path');
const router = express.Router();

// Multer setup for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Video upload route
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const newVideo = new Video({ title, description, filePath: req.file.path }); // Use 'newVideo'

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading video', error: err.message });
  }
});

// Play a video
router.get('/play/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id); // Use 'Video' model here
    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.sendFile(path.resolve(video.filePath));
  } catch (err) {
    res.status(500).json({ message: 'Error playing video', error: err.message });
  }
});

// Get all videos
router.get('/list', async (req, res) => {
  try {
    const videos = await Video.find(); // Use 'Video' model here
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving videos', error: err.message });
  }
});

module.exports = router;


