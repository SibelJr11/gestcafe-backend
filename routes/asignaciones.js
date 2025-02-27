const express = require("express");
const {
      createAsignacion,
      getAsignacionesByIdFinca,
} = require("../controllers/asignacionesController");
const router = express.Router();

// CRUD de asignaciones
router.post("/", createAsignacion); // Ruta para crear un asignación
router.get("/:idFinca", getAsignacionesByIdFinca); // Recupera los empleados asignados a una semana

module.exports = router;
