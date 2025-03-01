const express = require("express");
const {
      createUsuario,
      loginUsuario,
      verifyUsuario,
      getAllUsuarios,
} = require("../controllers/usuarioController");
const router = express.Router();

router.post("/", createUsuario);
router.post("/login", loginUsuario);
router.get("/", getAllUsuarios);
router.get("/verificarUsuario/:id", verifyUsuario);
module.exports = router;
