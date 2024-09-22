const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Your user model
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken'); // Assuming you have JWT verification

// GET user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('uploadedVideos favoriteVideos watchLater playlists.videos');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
      joinDate: user.joinDate,
      location: user.location,
      socialLinks: user.socialLinks,
      totalViews: user.totalViews,
      subscribers: user.subscribers.length,
      uploadedVideos: user.uploadedVideos,
      favoriteVideos: user.favoriteVideos,
      watchLater: user.watchLater,
      playlists: user.playlists
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const updatedProfile = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
    if (!updatedProfile) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add a video to the "Watch Later" list
router.post('/watch-later', verifyToken, async (req, res) => {
    const { videoId } = req.body;
  
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).send("User not found");
  
      // Add videoId if it's not already in the list
      if (!user.watchLater.includes(videoId)) {
        user.watchLater.push(videoId);
        await user.save();
        res.status(200).send({ message: "Video added to Watch Later", watchLater: user.watchLater });
      } else {
        res.status(400).send({ message: "Video is already in Watch Later list" });
      }
    } catch (error) {
      res.status(500).send({ message: "Server error", error: error.message });
    }
  });
  
  // Get the "Watch Later" list
  router.get('/watch-later', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).send("User not found");
  
      res.status(200).send({ watchLater: user.watchLater });
    } catch (error) {
      res.status(500).send({ message: "Server error", error: error.message });
    }
  });
  
  // Remove a video from the "Watch Later" list
  router.delete('/watch-later', verifyToken, async (req, res) => {
    const { videoId } = req.body;
  
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(404).send("User not found");
  
      // Remove the video from the list
      user.watchLater = user.watchLater.filter(id => id !== videoId);
      await user.save();
  
      res.status(200).send({ message: "Video removed from Watch Later", watchLater: user.watchLater });
    } catch (error) {
      res.status(500).send({ message: "Server error", error: error.message });
    }
  });

  // Add this to routes/profile.js

// Add Video to Favorites
router.post('/favorites', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { videoId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add videoId to the favorites array if not already added
        if (!user.favoriteVideos.includes(videoId)) {
            user.favoriteVideos.push(videoId);
            await user.save();
        }

        res.status(200).json({ message: "Video added to favorites", favoriteVideos: user.favoriteVideos });
    } catch (error) {
        res.status(500).json({ message: "Error adding to favorites", error: error.message });
    }
});

// Get Favorite Videos
router.get('/favorites', verifyToken, async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ favoriteVideos: user.favoriteVideos });
    } catch (error) {
        res.status(500).json({ message: "Error fetching favorites", error: error.message });
    }
});


  

module.exports = router;
