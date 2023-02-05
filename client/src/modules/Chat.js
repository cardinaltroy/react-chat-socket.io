import { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import io from 'socket.io-client';
import UserAuth from "./components/UserAuth";
import UserList from "./components/UserList";
import UserRooms from "./components/UserRooms";
import UserMessages from "./components/UserMessages";
import { Context } from "..";

const socket = io.connect("http://localhost:3001");


const Chat = observer(() => {
    const { LocalStore } = useContext(Context);
    if(!LocalStore.getUserName) return (
        <div className="Chat">
            <UserAuth socket={socket}/>
        </div>
    )

    return (
        <div className="Chat">
            <br/> Login as <b>{LocalStore.getUserName}</b>
            <br/> Current room: {LocalStore.getCurrentRoom}
            
            
            <div className="Flex">
                <UserRooms socket={socket}/>
                <UserMessages socket={socket}/>
                <UserList socket={socket}/>
            </div>
        </div>
    );
});

export default Chat;