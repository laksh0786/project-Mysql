require("dotenv").config();
const mysql = require("mysql2");

//Database config
const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    dateStrings: true //to convert the date into string to send value to database
}

const dbConnect = mysql.createConnection(dbConfig);


dbConnect.connect(function (err) {
    if (err == null) {
        console.log("Database Connected");
    }
    else {
        console.log(err);
    }
})

module.exports  = dbConnect;