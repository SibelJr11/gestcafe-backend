const express = require("express");
const {
      getVentas,
      createVenta,
      getDataVentasCafeSecoByIdFinca,
      getDataVentasPasillaByIdFinca,
      getDataVentasCafeVerdeByIdFinca,
      updateVenta,
} = require("../controllers/ventasController");

const router = express.Router();

router.post("/", createVenta);
router.get("/:idFinca", getVentas);
router.put("/editar/:idVenta", updateVenta);
router.get("/cafe-seco/:idFinca/:year", getDataVentasCafeSecoByIdFinca);
router.get("/cafe-verde/:idFinca/:year", getDataVentasCafeVerdeByIdFinca);
router.get("/pasilla/:idFinca/:year", getDataVentasPasillaByIdFinca);

module.exports = router;
