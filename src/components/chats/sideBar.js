import React from 'react';

const SideBar = (props) => {

    const {logout,chats,user,activeChat,setActiveChat}=props

    console.log(chats);
    
    return ( 
        <div id="side-bar">
            <div className="heading">
                <div className="app-name">Chat App</div>
                <div className="menu">
                    menu
                </div>
            </div>
            <div className="search">
                <i className="search-icon"></i>
                <input placeholder="Search"/>
                <div className="plus"></div>
            </div>
            <div 
                className="users"
                >
                    {
                        chats.map(chat=>{
                            if(chat.name){
                                const lastMessage=chat.messages[chat.message.length-1];
                                const user=chat.users.find(({name})=>{
                                    return name!==props.name
                                }) || {name:'community'}
                                const classNames =(activeChat && activeChat.id === chat.id)?"active":""

                                return(
                                    <div
                                        key={chat.id}
                                        className={`user ${classNames}`}
                                        onClick={()=>setActiveChat(chat)}
                                        >
                                        <div className="user-photo">{user.name[0].toUpperCase()}</div>
                                        <div className="user-info">
                                            <div className="name">{user.name}</div>
                                            {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        })
                    }
            </div>
            <div className="current-user">
                <span>{user.name}</span>
                <div className="logout" onClick={()=>{logout()}} title="Logout">
                    Logout
                </div>
            </div>
        </div>
     );
}
 
export default SideBar;