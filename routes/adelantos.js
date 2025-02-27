const express = require("express");
const {
      getHistorialAdelantosByEmpleado,
      createAdelanto,
} = require("../controllers/adelantosController");
const router = express.Router();

// CRUD de adelantos
router.post("/", createAdelanto); //Ruta para registrar un adelanto
router.get("/historial-adelantos/:idAsignacion", getHistorialAdelantosByEmpleado); //Ruta para obtener el historial de adelantos de un empleado en una semana
module.exports = router;
