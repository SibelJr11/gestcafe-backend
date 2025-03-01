const express = require("express");
const {
      createPagoSuscripcion,
} = require("../controllers/pagos_suscripcionController");

const router = express.Router();

router.post("/", createPagoSuscripcion);

module.exports = router;
