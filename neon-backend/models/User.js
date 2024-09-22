const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, default: "Anonymous" },
  bio: { type: String, default: "Hello, I am new!" },
  profilePic: { type: String, default: "" },
  socialLinks: {
    instagram: { type: String, default: "" },
    tiktok: { type: String, default: "" },
    youtube: { type: String, default: "" },
    twitter: { type: String, default: "" }
  },
  location: { type: String, default: "" },
  joinDate: { type: Date, default: Date.now },
  playlists: { type: Array, default: [] },
  uploadedVideos: { type: Array, default: [] },
  subscribers: { type: Array, default: [] },
  subscribedTo: { type: Array, default: [] },
  totalViews: { type: Number, default: 0 },
  favoriteVideos: { type: Array, default: [] },
  watchLater: { type: Array, default: [] },  // <-- Watch Later List
});

module.exports = mongoose.model('User', userSchema);




