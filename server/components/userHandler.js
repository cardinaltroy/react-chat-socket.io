module.exports = (io, socket) =>{
    const userName = (data) =>{
        socket.data.name = data.name;
    }
    const userJoin = (data) =>{ // user join to room
        socket.join(data.room);
    }

    const userLeave = (data) =>{ // leave 
        socket.leave(data.room); 
    }

    const userMessage = (data) =>{ // send message
        socket.emit("user:rec_message", data);
        socket.to(data.room).emit("user:rec_message", data);
    }

    const userRooms = () =>{ // rooms list of user
        let list = [];
        for (let item of socket.rooms) list.push(item);
        socket.emit("user:rooms", list);
    }
    
    const userDisconnect = () =>{ // disconnect 
        console.log("- : "+socket.id);        
    }


    socket.on("user:name", userName);
    socket.on("user:join", userJoin);
    socket.on("user:leave", userLeave);
    socket.on("user:message", userMessage);
    socket.on("disconnecting", userDisconnect);

    socket.on("user:join", userRooms);
    socket.on("user:leave", userRooms);
}