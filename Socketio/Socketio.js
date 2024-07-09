// const express = require('express');
// const http = require('http');
// const path = require('path');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static(path.join(__dirname, 'public')));

// // Socket.io;
// io.on("connection", (socket) => {
//     console.log("User Connected");

//     socket.on('joinRoom', (room) => {
//         socket.join(room);
//         console.log(`User joined room: ${room}`);
//         socket.to(room).emit('message', `User has joined room: ${room}`);
//     });

//     socket.on('leaveRoom', (room) => {
//         socket.leave(room);
//         console.log(`User left room: ${room}`);
//         socket.to(room).emit('message', `User has left room: ${room}`);
//     });

//     socket.on('user-message', (data) => {
//         const { room, message } = data;
//         io.to(room).emit('message', message);
//     });
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// server.listen(9000, () => {
//     console.log(`Server is running on port 9000`);
// });




const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, 'public')))

io.on('connection', (socket) => {

    socket.on('joinRoom', room => {
        socket.join(room)
        console.log(room, socket.id);
        socket.to(room).emit('roomJoined', `User has joined Room ${room}`)
    })

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User has left room: ${room}`);
        socket.to(room).emit('message', `User has left room: ${room}`);
    });

    socket.on('message', ({ room, message }) => {
        io.to(room).emit('message', message);
    });

    // socket.on('message', message => {
    //     io.emit('sendMessage', message)
    // })
})

app.get('/', (req, resp) => {
    resp.sendFile(`/public/index.html`)
})


server.listen(8081, () => {
    console.log('server is running on the port 8081');
})

