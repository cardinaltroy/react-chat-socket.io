import { useState, useContext, useEffect } from "react";
import { Context } from "../..";

const UserRooms = (props) => {
    const { LocalStore } = useContext(Context);
    const socket = props.socket;
    const [room, setRoom] = useState("TestRoom");
    const [roomList, setRoomList] = useState([]);

    const joinRoom = () => {
        socket.emit("user:join", { name: LocalStore.getUserName, room })
    }

    const setCurrentRoom = (e) => {
        LocalStore.setCurrentRoom(e.target.id)
    }

    const leaveRoom = (e) => {
        socket.emit("user:leave", { name: LocalStore.getUserName, room: e.target.id })
    }

    useEffect(() => {
        socket.on("user:rooms", (data) => {
            setRoomList(data);
        })
    }, [socket]);

    return (
        <div className="Rooms">
            <input
                className="roomName"
                placeholder="Room"
                onChange={
                    (event) => {
                        setRoom(event.target.value)
                    }
                }
            />
            <button className="roomJoin" onClick={joinRoom} >Join</button>
            <br />
            {roomList.map((item) =>
                <li key={item} id={item} onClick={setCurrentRoom}>
                    <nobr className="title"  id={item}>{item}</nobr>
                    <button id={item} onClick={leaveRoom} >X</button>
                </li>
            )}
        </div>

    );
}

export default UserRooms;