// 1. Select the container element where the songs will be displayed
const container = document.getElementById('song-container');

// 2. Fetch the songs data from the JSON file
const errorEl = document.getElementById('error-message');

if (location.protocol === 'file:' && errorEl) {
  errorEl.hidden = false;
  errorEl.textContent = 'Open with a local server: run "node server.js" and visit http://localhost:3000';
}

fetch('songs.json')
  .then(response => response.json())
  .then(data => {
    // 3.Loop through each song in the data
    data.forEach(song => {
      // 4. Create the HTML element for one song card. 
      const songHTML = 
      `
        <div class="song-card">
          <img src="${song.image_url}" alt="Album Cover">
          <h3>${song.title}</h3>
          <p> BY: ${song.artist}</p>
          <a href="${song.spotify_url}" class= "btn"target="_blank">Listen</a>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', songHTML);
    });
  }).catch(error => {
    console.error('Error fetching songs data:', error);
    if (errorEl) {
      errorEl.hidden = false;
      errorEl.textContent = 'Failed to load songs.json. Run a local server and refresh.';
    }
  });