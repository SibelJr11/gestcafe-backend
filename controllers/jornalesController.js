const jornalModel = require("../models/jornalModel");
const { param } = require("../routes/jornales");

// Crear un jornal
exports.createJornal = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevoJornal = req.body;
                  const resultado = await jornalModel.create(conn, nuevoJornal);
                  res.status(201).json({
                        message: "Kilos agregados exitosamente al jornal!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Busca el historial de kilos de un empleado
exports.getHistorialKilosByEmpleado = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const historialKilos = await jornalModel.getHistorial(
                        conn,
                        req.params.idAsignacion,
                  );
                  if (!historialKilos) {
                        return res
                              .status(404)
                              .json({ message: "No se encontraron kilos " });
                  }
                  res.status(200).json({ data: historialKilos });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};
