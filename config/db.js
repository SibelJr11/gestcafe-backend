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
      host: "sql101.infinityfree.com",
      user: "if0_38405184",
      password: "",
      database: "if0_38405184_gestcafe",
      port: 3306,
};
module.exports = myConn(mysql, dbConfig2, "pool"); // Para usar en Express
