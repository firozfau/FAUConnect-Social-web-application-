//friends.route.js

const express = require("express");
const friendsRouter = express.Router();

const {
    getFriendMatchInformation
} = require("../controllers/friends.controller");





friendsRouter.get("/find-friends" ,getFriendMatchInformation);




module.exports = friendsRouter;