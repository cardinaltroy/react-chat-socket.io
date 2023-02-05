import {makeAutoObservable} from 'mobx'

export default class LocalStore{
    
    constructor(){
        this._userName = "";
        this._userRoomCurrent = false;
        this._userMsg = new Map();
        makeAutoObservable(this);
    }

    setUserName(name){
        this._userName = name;
    }
    get getUserName(){
        return this._userName !== "" ? this._userName : false;
    }


    setCurrentRoom(room){
        this._userRoomCurrent = room;
    }
    get getCurrentRoom(){
        return this._userRoomCurrent;
    }


    setNewMessage(data){
        const msg = this._userMsg;
        if(!msg.has(data.room)){

            msg.set(data.room, [data]);
        }else{
            msg.get(data.room).push(data)
        }
        
    }
    getListMessages(room){
        const msg = this._userMsg;

        return msg.has(room) ? msg.get(room) : []
    }
}