// Backend handle UI/UX interactions
document.addEventListener('DOMContentLoaded', loadSongs);

// Load song method, allow user to see the name, date posting, slider to go anywhere within the song, rename and download functions
function loadSongs() {
    fetch('https://my-music-player-fq41cjotx-lelekhoa1812s-projects.vercel.app/api/songs')
    // fetch('/api/songs')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const songsList = document.getElementById('songsList');
            songsList.innerHTML = '';
            data.forEach(song => {
                const songElement = document.createElement('div');
                songElement.className = 'song';
                
                const songInfo = document.createElement('div');
                songInfo.className = 'song-info';
                songInfo.innerHTML = `<strong>${song.name}</strong><br><small>${new Date(song.date).toLocaleDateString()}</small>`;
                
                const songControls = document.createElement('div');
                songControls.className = 'song-controls';
                
                const fileExtension = song.url.split('.').pop().toLowerCase();
                let mimeType = '';
                if (fileExtension === 'mp3') {
                    mimeType = 'audio/mpeg';
                } else if (fileExtension === 'm4a') {
                    mimeType = 'audio/mp4';
                }

                songControls.innerHTML = `
                    <audio controls>
                        <source src="${song.url}" type="${mimeType}">
                    </audio>
                    <button onclick="renameSong('${song.name}', '${song.url}')">Rename</button>
                    <button onclick="downloadSong('${song.url}')">Download</button>
                `;
                
                songElement.appendChild(songInfo);
                songElement.appendChild(songControls);
                songsList.appendChild(songElement);
            });
        })
        .catch(error => {
            console.error('Failed to fetch songs:', error);
        });
}

// Upload song file with restrain on file-type
function uploadSong() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }
    const validExtensions = ['.mp3', '.m4a'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!validExtensions.includes(`.${fileExtension}`)) {
        alert('Invalid file type. Only MP3 and M4A files are allowed.');
        return;
    }
    
    const formData = new FormData();
    formData.append('song', file);
    
    fetch('https://my-music-player-fq41cjotx-lelekhoa1812s-projects.vercel.app/api/upload', {  // Update with your backend URL
    // fetch('/api/upload')
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadSongs();
    })
    .catch(error => {
        alert('Failed to upload file: ' + error.message);
    });
}

// Rename the song and post new name using JSON.stringify to rename the song's filename also
function renameSong(oldName, url) {
    const newName = prompt('Enter new name for the song:', oldName);
    if (!newName) {
        alert('Rename cancelled');
        return;
    }
    const oldFullName = url.split('/').pop();
    const fileExtension = oldFullName.split('.').pop();
    const newFullName = newName + '.' + fileExtension;
    
    fetch('https://my-music-player-fq41cjotx-lelekhoa1812s-projects.vercel.app/api/rename', {  // Update with your backend URL
    // fetch('/api/rename')
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldName: oldFullName,
            newName: newFullName
        })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadSongs();
    })
    .catch(error => {
        alert('Failed to rename file: ' + error.message);
    });
}

// Download with url to the file 
function downloadSong(url) {
    window.open(url, '_blank');
}
