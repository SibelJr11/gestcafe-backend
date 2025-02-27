const express = require("express");
const {
      createFinca,
      getFincasByIdPropietario,
      getPagosKilosByIdFincaAndYear,
      getPagosKilosByIdPropietarioAndYear,
      asignarAdminFinca,
      deleteFinca,
      updateFinca,
      getFincasByIdAdministrador,
} = require("../controllers/fincasController");
const router = express.Router();

// CRUD de fincas
router.post("/", createFinca);
router.put("/asignar-admin/:idFinca", asignarAdminFinca);
router.get("/:id", getFincasByIdPropietario);
router.get("/admin/:id", getFincasByIdAdministrador);
router.get("/:idFinca/pagos_kilos/:year", getPagosKilosByIdFincaAndYear); // Nueva ruta para obtener los pagos y kilos por idFinca y año
router.get(
      "/:no_identificacion/info_fincas/:year",
      getPagosKilosByIdPropietarioAndYear
); // Nueva ruta para obtener los pagos y kilos de cada una de las fincas de un propietario
router.put("/editar/:idFinca", updateFinca);
router.delete("/eliminar/:idFinca", deleteFinca);

module.exports = router;
