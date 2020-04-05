import React,{ useState,useEffect } from 'react';
import SideBar from './sideBar';
import {MESSAGE_SENT,TYPING,COMMUNITY_CHAT,MESSAGE_RECEIVED} from '../../Events';
import ChatHead from './chatHead';
import  MessageInput from "../Messages/messageInput";
import Messages from "../Messages/messages"

const ChatContainer = (props) => {

    let [chats,setChats]=useState([]);
    let [activeChat,setActivechat]=useState(null);

    useEffect(()=>{
        socket.emit(COMMUNITY_CHAT,resetChat)
    })

    const {socket}=props;

    const resetChat=chat=>{
        return addChat(chat,true)
    }

    const addChat=(chat,reset)=>{
        const newChats= reset ? [chat]:[...chats,chat]
        setChats(newChats)

        const messageEvent=`${MESSAGE_RECEIVED}-${chat.id}`
        const typingEvent=`${TYPING}-${chat.id}`

        socket.on(typingEvent)
        socket.on(messageEvent,addMessageToChat(chat.id))
    }

    const addMessageToChat=chatId=>{
        return message=>{
            let newChats=chats.map(chat=>{
                if(chat.id === chatId){
                    chat.messages.push(message)
                }
                return chat
            })
            setChats(newChats)
        }
    }

    const updateTypingInChat=chatId=>{

    }

    const setActiveChat=(activeChat)=>{
        setActivechat(activeChat);
        console.log(activeChat);
        
    }

    const sendMessage=(chatId,message)=>{
        socket.emit(MESSAGE_SENT,{chatId,message})
    }

    const sendTyping=(chatId,isTyping)=>{
        socket.emit(TYPING,{chatId,isTyping})
    }

    return ( 
        <div className="container">
            <SideBar 
                logout={props.logout} 
                chats={chats} 
                user={props.user}
                activeChat={activeChat}
                setActiveChat={setActiveChat}/>
            <div className="chat-room-container">
                {
                    activeChat !== null ? (
                        <div className="chat-room">
                            <ChatHead name={activeChat.name}/>
                            <Messages 
                                messages={activeChat.messages}
                                user={props.user}
                                typingUsers={activeChat.typingUsers}
                                />
                            <MessageInput
                                sendMessage={message=>{
                                    sendMessage(activeChat.id,message)
                                }}
                                sendTyping={isTyping=>{
                                    sendTyping(activeChat.id,isTyping)
                                }}
                                />
                        </div>
                    )
                    :
                    (
                        <div className="chat-room choose">
                            <h3>Choose a chat</h3>
                        </div>
                    )
                }
            </div>
        </div>
     );
}
 
export default ChatContainer;