const express = require("express");
const router = express.Router();
const {
      createSemana,
      getUltimoIdSemana,
      finalizeSemana,
} = require("../controllers/semanaController");

router.post("/", createSemana);
router.put("/:idSemana", finalizeSemana);
router.get("/:idFinca", getUltimoIdSemana);
module.exports = router;
