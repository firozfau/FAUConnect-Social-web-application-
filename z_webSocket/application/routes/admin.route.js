const express = require("express");
const adminRouter = express.Router();

const {
    getAllActiveUsers
} = require("../controllers/admin.controller");





adminRouter.get("/active-users" ,getAllActiveUsers);




module.exports = adminRouter;