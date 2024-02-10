const io = require('socket.io')(8000, {
    cors: {
        origin: '*'
    }
});
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        console.log('This is users', users);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message, name: users[socket.id] });
    });
});
