// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Function to create a comet trail element
function createCometTrail() {
    const trail = document.createElement('div');
    trail.classList.add('comet-trail');
    document.body.appendChild(trail);
    return trail;
}

// Event listener for mouse movement to create comet trail
document.addEventListener('mousemove', (e) => {
    const trail = createCometTrail();
    // Adjust the comet position to be centered around the cursor
    trail.style.left = `${e.pageX - 7.5}px`;
    trail.style.top = `${e.pageY - 7.5}px`;

    // Add 'active' class to make it visible
    setTimeout(() => {
        trail.classList.add('active');
    }, 10);

    // Fade out and remove the comet trail after 500ms
    setTimeout(() => {
        trail.classList.add('fade');
        setTimeout(() => {
            trail.remove(); // Remove the trail from the DOM after the fade effect
        }, 500);
    }, 150); // Short delay before starting fade effect
});


// GSAP Animation
gsap.from(".tagline", {
    duration: 1.5,
    opacity: 0,
    y: 50,
    ease: "power2.out"
});

// Fetch and display the uploaded videos
async function loadVideos() {
    try {
        const response = await fetch('http://localhost:5000/api/video/list');
        const videos = await response.json();

        const videosContainer = document.getElementById('videos-container');
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');

            videoCard.innerHTML = `
                <video controls>
                    <source src="${video.filePath}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            `;
            videosContainer.appendChild(videoCard);
        });
    } catch (err) {
        console.error('Error loading videos:', err);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // Check if we're on the "Gay" page
    if (window.location.pathname.includes('gay.html')) {
        fetchVideos('gay');
    } else if (window.location.pathname.includes('straight.html')) {
        fetchVideos('straight');
    } else if (window.location.pathname.includes('trans.html')) {
        fetchVideos('trans');
    }
});

// Function to fetch videos based on the category
function fetchVideos(category) {
    fetch(`/api/video/list?category=${category}`)
        .then(response => response.json())
        .then(videos => {
            const videoContainer = document.getElementById('videos-container');
            videoContainer.innerHTML = ''; // Clear the container

            videos.forEach(video => {
                const videoCard = `
                    <div class="video-card">
                        <video src="${video.filePath}" controls></video>
                        <h3>${video.title}</h3>
                        <p>${video.description}</p>
                    </div>`;
                videoContainer.innerHTML += videoCard;
            });
        })
        .catch(error => console.error('Error fetching videos:', error));
}


// Call the function to load videos when the page loads
window.onload = loadVideos;

