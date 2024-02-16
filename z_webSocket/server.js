const app = require("./app");

//const express = require("express");
//app = express();

const config = require("./application/config/config");
const FRZ = require("./application/validation/frz.validation");
const server_port = config.app.port;
 

const server = app.listen(server_port, () => {
    console.log(`Server is running at http://localhost:${server_port}`);
});



/*----------------------[Start]--- web socket data---------------------------*/ 
const  webSocketController  = require("./application/controllers/webSocket.controller");


const io = require("socket.io")(server);

io.on('connection',(socket)=>{
    onConnected(socket);
});
let socketConnected = new Set();


function onConnected(socket){
    console.log(socket.id);
    socketConnected.add(socket.id);

    io.emit('clients-total',socketConnected.size);

    socket.on("disconnect",()=>{
        console.log("socket disconnected",socket.id);
        socketConnected.delete(socket.id);
        io.emit('clients-total',socketConnected.size);
    });

    socket.on('message',(data)=>{ 
        
        webSocketController.saveMessage(data);
        socket.broadcast.emit('chat-message',data);
    
    });

   socket.on('typing',(data)=>{

    socket.broadcast.emit('typing',data);

   }); 

}



/*------------------------- web socket data--[END]-------------------------*/