const express = require("express");
const { createPago, getTodosPagos } = require("../controllers/pagosController");
const router = express.Router();

// CRUD de pagos
router.post("/", createPago); // Ruta para crear un pago
router.get("/:idFinca", getTodosPagos);

module.exports = router;
