const express = require("express");
const { createSuscripcion, updateSuscripcion } = require("../controllers/suscripcionController");

const router = express.Router();

router.post("/", createSuscripcion);
router.put("/editar/:idSuscripcion", updateSuscripcion);

module.exports = router;
