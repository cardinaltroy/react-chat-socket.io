import { useState, useEffect, useContext } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const UserMessages = observer((props) => {
    const socket = props.socket;
    const [message, setMessage] = useState("");
    const { LocalStore } = useContext(Context);

    const sendMessage = () => {
        socket.emit("user:message", { name: LocalStore.getUserName, message, room: LocalStore.getCurrentRoom });
    }
    
    useEffect(() => {
        //getting new messages in chat
        socket.on("user:rec_message", (data) => {
            LocalStore.setNewMessage(data);

            setTimeout(()=>{ 
                // fixed scroll to bottom, not working without timer
                let objDiv = document.getElementById("msg");
                objDiv.scrollTo(0, objDiv.scrollHeight);
            }, 100)
        })
    }, [socket]);

    return (
        <div className="Messages">
            <div id="msg" className="msg">
                {
                    //getting messages list from localstore
                    LocalStore.getListMessages(LocalStore.getCurrentRoom).map((msg,key)=>
                        <li key={key}><b>{msg.name}</b> : {msg.message}</li>
                    )
                }
            </div>
            <div className="inputs">
                <input
                    placeholder="Message" 
                    onChange={ e => setMessage(e.target.value) }
                />
                <button onClick={sendMessage} >Send</button>
            </div>
        </div>

    );
})

export default UserMessages;