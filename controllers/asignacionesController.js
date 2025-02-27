const asignacionModel = require("../models/asignacionModel");

// Crear una asignacion
exports.createAsignacion = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevaAsignacion = req.body;
                  const resultado = await asignacionModel.create(
                        conn,
                        nuevaAsignacion
                  );
                  res.status(201).json({
                        message: "Asignación Registrada!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Obtener asignaciones de la semana de trabajo, mediante el id de la finca.
exports.getAsignacionesByIdFinca = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const empleadosAsig = await asignacionModel.getByIdFinca(
                        conn,
                        req.params.idFinca
                  );
                  if (!empleadosAsig) {
                        return res
                              .status(404)
                              .json({ message: "No hay empleados asignados" });
                  }
                  res.status(200).json({ data: empleadosAsig });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};
