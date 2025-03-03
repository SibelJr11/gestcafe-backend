const express = require("express");
const {
      createPagoSuscripcion,
      getHistorialPagosSuscripcion,
} = require("../controllers/pagos_suscripcionController");

const router = express.Router();

router.post("/", createPagoSuscripcion);
router.get("/historial/:idSuscripcion", getHistorialPagosSuscripcion);
module.exports = router;
