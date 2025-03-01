const express = require("express");
const cors = require("cors");
const myConn = require("./config/db");
const http = require("http");  // 🔹 Importamos HTTP
const { Server } = require("socket.io");  // 🔹 Importamos Socket.io

const empleadosRoutes = require("./routes/empleados");
const semanasRoutes = require("./routes/semanas");
const asignacionesRoutes = require("./routes/asignaciones");
const jornalesRoutes = require("./routes/jornales");
const usuariosRoutes = require("./routes/usuarios");
const pagosRoutes = require("./routes/pagos");
const fincasRoutes = require("./routes/fincas");
const ventasRoutes = require("./routes/ventas");
const adelantosRoutes = require("./routes/adelantos");

const app = express();
const server = http.createServer(app);  // 🔹 Crear servidor HTTP

// ⚡️ Configurar Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Cambia esto si tu frontend está en otro dominio
    methods: ["GET", "POST"]
  }
});

let connectedUsers = new Map();  // Guardar usuarios conectados

// 📌 Evento de conexión de usuarios
io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // 🔹 Recibir información cuando un usuario inicia sesión
  socket.on("userLoggedIn", (userData) => {
    connectedUsers.set(socket.id, userData);
    io.emit("usuariosConectados", Array.from(connectedUsers.values())); // Notificar a todos los clientes
  });

  // 🔹 Cuando el usuario se desconecta, eliminarlo
  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
    connectedUsers.delete(socket.id);
    io.emit("usuariosConectados", Array.from(connectedUsers.values())); // Notificar cambios
  });
});

// Configurar el puerto
app.set("port", process.env.PORT || 9000);

// Middleware
app.use(cors());
app.use(myConn);
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("BIENVENIDO AL SERVIDOR DE CAFE APP");
});

// Rutas de la API
app.use("/api/empleados", empleadosRoutes);
app.use("/api/semanas", semanasRoutes);
app.use("/api/asignaciones", asignacionesRoutes);
app.use("/api/jornales", jornalesRoutes);
app.use("/api/pagos", pagosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/fincas", fincasRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/adelantos", adelantosRoutes);

// 🚀 Iniciar el servidor con Socket.io
server.listen(app.get("port"), () => {
  console.log("SERVIDOR CORRIENDO EN EL PUERTO:", app.get("port"));
});
