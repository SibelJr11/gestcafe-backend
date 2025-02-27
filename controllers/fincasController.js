const fincaModel = require("../models/fincaModel");

// Crear una finca
exports.createFinca = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevaFinca = req.body;
                  const resultado = await fincaModel.create(conn, nuevaFinca);
                  res.status(201).json({
                        message: "Finca registrada exitosamente!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Busca las fincas que posee un fincario
exports.getFincasByIdPropietario = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const fincas = await fincaModel.getByIdPropietario(
                        conn,
                        req.params.id
                  );
                  if (!fincas) {
                        return res
                              .status(404)
                              .json({ message: "No se encontraron fincas" });
                  }
                  res.status(200).json({ data: fincas });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Busca las fincas que tiene a cargo un administrador
exports.getFincasByIdAdministrador = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const fincas = await fincaModel.getByIdAdministrador(
                        conn,
                        req.params.id
                  );
                  if (!fincas) {
                        return res
                              .status(404)
                              .json({ message: "No se encontraron fincas" });
                  }
                  res.status(200).json({ data: fincas });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};


//Busca el total de pagos y kilos de una finca dependiendo del año y los grupa por meses.
exports.getPagosKilosByIdFincaAndYear = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const datos_finca = await fincaModel.getByIdAndYear(
                        conn,
                        req.params.idFinca,
                        req.params.year
                  );
                  if (!datos_finca) {
                        return res.status(404).json({
                              message: "No se encontraron pagos y kilos asociados a la finca",
                        });
                  }
                  res.status(200).json({ data: datos_finca });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Busca el total de pagos y kilos de todas las fincas de un propietario y las agrupa por finca
exports.getPagosKilosByIdPropietarioAndYear = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const datos_fincas =
                        await fincaModel.getTodasFincasByIdAndYear(
                              conn,
                              req.params.no_identificacion,
                              req.params.year
                        );
                  if (!datos_fincas) {
                        return res.status(404).json({
                              message: "No se encontraron pagos y kilos asociados a las fincas",
                        });
                  }
                  res.status(200).json({ data: datos_fincas });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Asignar un administrador a una finca
exports.asignarAdminFinca = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const dataFinca = req.body;
                  const idFinca = req.params.idFinca;
                  await fincaModel.update(conn, idFinca, dataFinca);
                  res.status(200).json({
                        message: "Asignación realizada exitosamente!",
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Modificar los datos de una finca
exports.updateFinca = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const dataFinca = req.body;
                  const idFinca = req.params.idFinca;
                  await fincaModel.update(conn, idFinca, dataFinca);
                  res.status(200).json({
                        message: "Datos modificados exitosamente!",
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Eliminar una finca
exports.deleteFinca = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const idFinca = req.params.idFinca;
                  await fincaModel.delete(conn, idFinca);
                  res.status(200).json({
                        message: "Finca eliminada exitosamente!",
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};
