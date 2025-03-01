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

const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
      }
    });
    
    let connectedUsers = new Map();  // Guarda usuarios conectados { userID: Set(socketIDs) }
    
    io.on("connection", (socket) => {
      console.log(`Usuario conectado: ${socket.id}`);
    
      // 🔹 Evento cuando un usuario inicia sesión
      socket.on("userLoggedIn", (userData) => {
        const { id, nombre } = userData;
    
        if (!connectedUsers.has(id)) {
          connectedUsers.set(id, { id, nombre, sockets: new Set() });
        }
    
        connectedUsers.get(id).sockets.add(socket.id);
    
        console.log("Usuarios conectados:", Array.from(connectedUsers.values()));
    
        // 📢 Emitir lista de usuarios únicos conectados
        io.emit("usuariosConectados", Array.from(connectedUsers.values()).map(user => ({
          id: user.id,
          nombre: user.nombre
        })));
      });
    
      // 🔹 Cuando un usuario se desconecta
      socket.on("disconnect", () => {
        let userToRemove = null;
    
        for (let [userId, user] of connectedUsers) {
          user.sockets.delete(socket.id);
          if (user.sockets.size === 0) {
            userToRemove = userId; // Si no quedan sockets, eliminar usuario
          }
        }
    
        if (userToRemove) {
          connectedUsers.delete(userToRemove);
        }
    
        console.log("Usuarios conectados después de la desconexión:", Array.from(connectedUsers.values()));
    
        // 📢 Emitir lista actualizada de usuarios conectados
        io.emit("usuariosConectados", Array.from(connectedUsers.values()).map(user => ({
          id: user.id,
          nombre: user.nombre
        })));
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
