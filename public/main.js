const socket = io();
let username;
let celebrity;

// Get DOM elements
const usernameInput = document.getElementById('username');
const joinButton = document.getElementById('joinButton');
const userList = document.getElementById('userList');
const startButton = document.getElementById('startGame');
const celebrityDisplay = document.getElementById('celebrityDisplay');

// Check if username is already stored in local storage
if (localStorage.getItem('username')) {
    username = localStorage.getItem('username');
    usernameInput.value = username;
}

// Join button click handler
joinButton.addEventListener('click', () => {
    emitUserName();
});

// Start game button click handler
startButton.addEventListener('click', () => {
    socket.emit('startGame');
});

socket.on('userList', (users) => {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        let text;
        if (user.celebrity) {
            if (user.username === username) {
                text = `${user.username}： <${user.celebrity.length}個字>`;
            } else {
                text = `${user.username}： ${user.celebrity}`;
                li.addEventListener('click', () => updateImageFrame(user.celebrity));
                li.style.cursor = 'pointer';
            }
        } else {
            if (user.username === username) {
                text = `${user.username} (你)`;
            } else {
                text = `${user.username}`;
            }
        }
        li.textContent = text;
        userList.appendChild(li);
    });
});

function updateImageFrame(query) {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://www.bing.com/images/search?q=${encodedQuery}&first=1`;
    imageFrame.src = url;
    imageFrame.style.display = 'block';
  }

function getClientId() {
    // Try to get the existing clientId from localStorage
    let clientId = localStorage.getItem('clientId');

    // If it doesn't exist, create a new one
    if (!clientId) {
        // Generate a new ID. This combines timestamp and random number for uniqueness
        clientId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        
        // Store it in localStorage for future use
        localStorage.setItem('clientId', clientId);
    }

    return clientId;
}

function emitUserName() {
    const username = usernameInput.value;
    if (username) {
        localStorage.setItem('username', username);
        const clientId = getClientId();
        socket.emit('username', {'username': username, 'clientId': clientId});
        joinButton.disabled = true;
        usernameInput.disabled = true;
    }
}

socket.on('reconnect', () => {
    username = usernameInput.value;
    if (username) {
        emitUserName();
    }
});

  