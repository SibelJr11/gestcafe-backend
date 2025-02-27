const express = require("express");
const cors = require("cors");
const myConn = require("./config/db");

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
app.use("/api/adelantos",adelantosRoutes)

// Iniciar el servidor
app.listen(app.get("port"), () => {
      console.log("SERVIDOR CORRIENDO EN EL PUERTO:", app.get("port"));
});
