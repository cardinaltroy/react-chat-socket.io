import { useEffect, useState, useContext } from "react";
import { Context } from "../..";

const UserList = (props) => {
    const {LocalStore} = useContext(Context)
    const socket = props.socket;
    const [list,setList] = useState([]);

    useEffect(()=>{
        //request users list when changing server
        if(LocalStore.getCurrentRoom) socket.emit("room:users", {room:LocalStore.getCurrentRoom})

    },[LocalStore.getCurrentRoom])

    useEffect(() => {
        // getting users list from server
        socket.on("room:rec_users", (data) => {
            setList(data);
        })
    }, [socket]);
    
    return (
        <div className="Users">
            User online:
            {list.map((unit) => (
                <li key={unit.id} id={unit.id}>
                    <div className="img"></div>
                    <nobr className="title" id={unit.id}>{unit.data.name}</nobr>
                </li>
            ))}
        </div>

    );
}

export default UserList;