const mysql = require("mysql2");
const myConn = require("express-myconnection");

//Configuración de la base de datos
const dbConfig = {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "db_backap",
      port: 3306,
};

const dbConfig2 = {
      host: "sql3.freesqldatabase.com",
      user: "sql3766797",
      password: "RA2QX6tl6i",
      database: "sql3766797",
      port: 3306,
};
module.exports = myConn(mysql, dbConfig2, "pool"); // Para usar en Express
