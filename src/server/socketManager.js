//const {io}=require('./index.js');

const { VERIFY_USER,USER_CONNECTED,LOGOUT} =require('../Events')
const { createUser } =require('../Factories')

let connectedUsers={}

module.exports = socket=>{
    console.log("Socket ID: "+socket.id);

    socket.on(VERIFY_USER,(nickname,cb)=>{
        if(isUser(connectedUsers,nickname)){
            cb({user:null,isUser:true})
        }else{
            cb({user:createUser(nickname),isUser:false})
        }
    })

    socket.on(USER_CONNECTED,user=>{
        connectedUsers=addUser(connectedUsers,user)
        socket.user=user

        socket.emit(USER_CONNECTED,connectedUsers)
    })
}

const addUser=(userList,user)=>{
    let newList=Object.assign({},userList);
    newList[user.name]=user;
    
    return newList;
}

const removeUser=(userList,user)=>{
    let newList=Object.assign({},userList);
    delete newList[user];
    return newList;
}

const isUser=(userList,user)=>{
    return user in userList
}