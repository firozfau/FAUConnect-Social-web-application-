const mysql = require("mysql");
const config = require("./config"); 

const dbConnectionConfig = {
    host: config.db.url,
    user: config.db.user,
    password: config.db.password,
    database:"fauconnectapp"
}

const MYSQLDB= mysql.createConnection(dbConnectionConfig);
MYSQLDB.connect((err) => {
    
    if (!err) {
        console.log("DataBase connected");

 

    } else { 
         console.log(err);
        process.exit(1);
    }
});
 
module.exports = MYSQLDB;