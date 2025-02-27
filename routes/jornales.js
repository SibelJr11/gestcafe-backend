const express = require("express");
const { createJornal, getHistorialKilosByEmpleado } = require("../controllers/jornalesController");
const router = express.Router();

// CRUD de jornales
router.post("/", createJornal); // Ruta para crear un jornal
router.get("/historial-kilos/:idAsignacion", getHistorialKilosByEmpleado); // Ruta para obtener el historial de kilos de un empleado
module.exports = router;
