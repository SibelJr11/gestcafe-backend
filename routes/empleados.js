const express = require("express");
const {
      getEmpleados,
      updateEmpleado,
      deleteEmpleado,
      createEmpleado,
      getEmpleadosBySearch,
} = require("../controllers/empleadosController");
const router = express.Router();


// CRUD de empleados
router.get("/", getEmpleados); // Ruta para obtener todos los empleados
router.get("/buscar", getEmpleadosBySearch); // Ruta para búsqueda con parámetro `search`
router.post("/", createEmpleado); // Ruta para crear un empleado
router.put("/:id", updateEmpleado); // Ruta para actualizar un empleado
router.delete("/:id", deleteEmpleado); // Ruta para eliminar un empleado
module.exports = router;
