const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app);
const io = new Server(server)

app.use(express.static(path.resolve('./public')))

// Socket.io
io.on("connection", (socket) => {
    socket.on('user-message', (message) => {
        io.emit('message', message)
    })
})

app.get('/', (req, resp) => {
    return resp.sendFile('/public/index.html')
})

server.listen(9000, () => {
    console.log(`Server is running on the port 9000`);
});