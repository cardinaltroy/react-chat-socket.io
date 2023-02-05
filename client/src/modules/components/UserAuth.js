import { useState, useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const UserAuth = observer((props) => {
    const socket = props.socket;
    const [name, setName] = useState("");
    const { LocalStore } = useContext(Context);

    const setUserName = () => {
        LocalStore.setUserName(name);
        socket.emit("user:name", {name});
    }


    return (
        <div className="Auth">
            Username:<br/>
            <input
                placeholder="Username..." onChange={ (e) => {
                    setName(e.target.value)
                }}
            /><br/>
            <button onClick={setUserName} >Enter</button>
        </div>

    );
})

export default UserAuth;