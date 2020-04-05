var app=require('http').createServer();
const io=require('socket.io')(app);

const PORT= process.env.PORT || 5000;

const SocketManager=require('./socketManager');

io.on('connection',SocketManager)

app.listen(PORT,()=>{
    console.log("App running on port "+PORT);
    
})