require("dotenv").config();

const dev = {
    app: {
        port : process.env.PORT || 3000
    },
    db: {
        url: "localhost",
        user: "root",
        password:""
    } 
}

module.exports = dev;