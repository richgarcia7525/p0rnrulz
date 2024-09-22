// video.js
document.addEventListener('DOMContentLoaded', function () {
    const videoId = new URLSearchParams(window.location.search).get('id');
    
    // Fetch the video details from backend
    fetch(`/api/video/${videoId}`)
        .then(response => response.json())
        .then(video => {
            document.getElementById('video-title').innerText = video.title;
            document.getElementById('video-src').src = video.url;
        })
        .catch(error => console.error('Error fetching video:', error));
});
