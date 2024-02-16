
const express = require("express");
const messengerRouter = express.Router();


const { 
    getFriendList,
    getConversation
} = require("../controllers/messenger.controller");




messengerRouter.get("/friend-list",getFriendList); 

messengerRouter.get("/messenger-:id([0-9]+)",getConversation); 


module.exports = messengerRouter;