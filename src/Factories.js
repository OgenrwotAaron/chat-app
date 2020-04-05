const uuid4=require('uuid/v4');

const createUser=(name)=>(
    {
        id:uuid4(),
        name
    }
)


const createMessage=(message,sender)=>(
    {
        id:uuid4(),
        time: getTime(new Date(Date.now())),
        message,
        sender
    }
)

const createChat=({messages=[],name='Community',users=[]}={})=>(
    {
        id:uuid4(),
        name,
        messages,
        users,
        typingUsers:[]
    }
)

const getTime=(date)=>(
    date
)

module.exports={
    createUser,
    createChat,
    createMessage
}