const express = require("express");
const {
      createUsuario,
      loginUsuario,
      verifyUsuario,
} = require("../controllers/usuarioController");
const router = express.Router();

router.post("/", createUsuario);
router.post("/login", loginUsuario);
router.get("/verificarUsuario/:id", verifyUsuario);
module.exports = router;
