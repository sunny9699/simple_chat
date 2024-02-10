const socket = io('http://localhost:8000', { transports: ['websocket', 'polling'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messagingInp');
const messageContainer = document.getElementById('container');

const userName = prompt("Enter your name to Join");
socket.emit('new-user-joined', userName);
socket.on('user-joined', user => {
    appendNewUserJoined(`${user} Joined the channel`);
});

socket.on('receive', data => {
    appendMessage(`${data.name} : ${data.message}`, 'left');
});

const appendNewUserJoined = (message) => {
    const messageCont = document.getElementById('container');
    const newElement = document.createElement('div');
    newElement.classList.add('new-user-joined');
    newElement.innerText = message;
    messageCont.appendChild(newElement);
}

const appendMessage = (message, position) => {
    const messageCont = document.getElementById('container');
    const newElement = document.createElement('div');
    newElement.classList.add('message');
    newElement.classList.add(position);
    newElement.innerText = message;
    messageCont.appendChild(newElement);
}

function sendMessage(event) {
    event.preventDefault();
    appendMessage(`You : ${messageInput.value}`, 'right');
    socket.emit('send', messageInput.value);
    form.reset();
}
