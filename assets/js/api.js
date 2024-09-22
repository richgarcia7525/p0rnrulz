// api.js
document.addEventListener('DOMContentLoaded', function () {
    const videoContainer = document.getElementById('videos-container');

    // Fetch trending videos example
    fetch('/api/videos/trending')
        .then(response => response.json())
        .then(videos => {
            videos.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');
                videoCard.innerHTML = `
                    <video src="${video.url}" controls></video>
                    <h3>${video.title}</h3>
                `;
                videoContainer.appendChild(videoCard);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
});

// api.js
document.addEventListener('DOMContentLoaded', function () {
    const videoContainer = document.getElementById('videos-container');

    // Fetch most-viewed example
    fetch('/api/videos/most-viewed')
        .then(response => response.json())
        .then(videos => {
            videos.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');
                videoCard.innerHTML = `
                    <video src="${video.url}" controls></video>
                    <h3>${video.title}</h3>
                `;
                videoContainer.appendChild(videoCard);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
});

// api.js
document.addEventListener('DOMContentLoaded', function () {
    const videoContainer = document.getElementById('videos-container');

    // Fetch newest example
    fetch('/api/videos/newest')
        .then(response => response.json())
        .then(videos => {
            videos.forEach(video => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');
                videoCard.innerHTML = `
                    <video src="${video.url}" controls></video>
                    <h3>${video.title}</h3>
                `;
                videoContainer.appendChild(videoCard);
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
});
