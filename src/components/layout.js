import React,{ useEffect,useState } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Events'

import LoginForm from './loginForm'
import ChatContainer from './chats/chatContainer'

const Layout = () => {

    let [socket,setSocket]=useState();
    let [user,setUser]=useState();

    useEffect(()=>{
        initSocket();
    },[])

    const initSocket=()=>{
        const socket=io('http://localhost:5000')

        socket.on('connect',()=>{
            console.log("Connected")
        })

        setSocket(socket);
    }

    const createUser=user=>{
        //const socket=io('http://localhost:5000');
        
        socket.emit(USER_CONNECTED,user);
        setUser(user)
    }

    const logout=()=>{
        //const socket1=socket;
        socket.emit(LOGOUT);
        setUser(null)
    }

    return ( 
        <div className="container">
            {
                !user ?
                    <LoginForm socket={socket} createUser={createUser}/>
                :
                    <ChatContainer socket={socket} user={user} logout={logout}/>
            }
        </div>
     );
}
 
export default Layout;