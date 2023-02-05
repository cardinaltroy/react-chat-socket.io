const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);

const registerUserHandlers = require('./components/userHandler');
const registerRoomHandlers = require('./components/roomHandler');

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
});

io.on("connection", (socket)=>{
    console.log("+ : "+socket.id );

    registerUserHandlers(io, socket);
    registerRoomHandlers(io, socket);   
})


server.listen(3001,()=>{
    console.log("Server is running on 3001");
})