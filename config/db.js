const mysql = require("mysql2");
const myConn = require("express-myconnection");

//Configuración de la base de datos
const dbConfig = {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "db_gestcafe",
      port: 3306,
};

const dbConfig2 = {
      host: "sql3.freesqldatabase.com",
      user: "sql3765149",
      password: "bmcyBzDrpi",
      database: "sql3765149",
      port: 3306,
};
module.exports = myConn(mysql, dbConfig, "pool"); // Para usar en Express
