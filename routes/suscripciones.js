const express = require("express");
const { createSuscripcion } = require("../controllers/suscripcionController");

const router = express.Router();

router.post("/", createSuscripcion);

module.exports = router;
