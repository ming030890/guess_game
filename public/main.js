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
    username = usernameInput.value;
    if (username) {
        localStorage.setItem('username', username);
        socket.emit('username', username);
        joinButton.disabled = true;
        usernameInput.disabled = true;
    }
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
        if (user.username === username) {
            text = `${user.username} (You)`;
        } else {
            if (user.celebrity) {
                text = `${user.username}: ${user.celebrity}`;
            } else {
                text = `${user.username}`;
            }
        }
        li.textContent = text;
        userList.appendChild(li);
    });
});