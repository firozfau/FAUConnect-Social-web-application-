const express = require("express");
const cors = require("cors");
const ejs = require("ejs");
const bParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const flash = require('connect-flash');

const {checkLoginInfo} = require("./application/routes/checkLoginInfo.route");
const userRouter = require("./application/routes/users.route");
const profilesRouter = require("./application/routes/users_profiles.route");
const friendsRouter = require("./application/routes/friends.route");
const adminRouter = require("./application/routes/admin.route");
const messengerRouter = require("./application/routes/messenger.route");
const {webSocketData} = require("./application/routes/websocket.route");
let { app } = require("./application/config/config");


app = express();


app.set('views', __dirname + '/application/views');
app.set("view engine","ejs");
app.use(cors());
app.use(bParser.urlencoded({extended:true}));
app.use(bParser.json());
app.use(express.static(__dirname + '/assets'));
app.use(morgan("dev"));  




app.use(
  session({
    secret: 'HelloDhakaFRZF7', // A secret key used to sign the session ID cookie
    resave: false, // Don't save a session if it hasn't been modified
    saveUninitialized: false, // Don't save an uninitialized session
    //store: sessionStore, // Use the session store you created
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time (e.g., 24 hours)
    },
  })
);
app.use(flash());


app.use(userRouter);
app.use(profilesRouter);
app.use(messengerRouter);
app.use(friendsRouter);
app.use(adminRouter);



app.get("/",checkLoginInfo, (req, res) => {

res.render("external/index");
});

app.use((err,req, res,next) => {
  
    //res.render(err);
    res.render("Page not found");

});

app.use((err,req, res,next) => {
  //res.setHeader('Cache-Control', 'public, max-age=3600');

    //res.render("server_error");
    res.status(500).json({ message: err });

});


module.exports = app;