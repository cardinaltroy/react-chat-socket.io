module.exports = (io, socket) =>{
    let rooms;

    const roomListUsers = async(room) => { // get users list in room
        
        let sockets = await io.in(room).fetchSockets();
        let list = [];
        sockets.map( (socket) => list.push({id: socket.id,  data: socket.data}) );
        return list;     
    }
    const roomListBroadcast = async(data, self=true) =>   { // send users list
        let list = await roomListUsers(data.room);
        socket.to(data.room).emit("room:rec_users", list);  
        if(self) socket.emit("room:rec_users", list);
    }


    const roomsListUpdate = () =>  { // getting rooms list for broadcasting about user leaving
        rooms = socket.rooms;
    }
    const roomListsBroadcast = () =>{ // broadcasting about user leaving, dont need async/await here
        for (let room of rooms) roomListBroadcast({room}, false);
    }

    socket.on("user:join", roomListBroadcast);
    socket.on("user:leave", roomListBroadcast);
    socket.on("room:users", roomListBroadcast);

    socket.on("disconnecting", roomsListUpdate);
    socket.on("disconnect", roomListsBroadcast);
}