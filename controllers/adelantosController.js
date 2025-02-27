const adelantoModel = require("../models/adelantoModel");

// Crear un adelanto
exports.createAdelanto = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevoAdelanto = req.body;
                  const resultado = await adelantoModel.create(
                        conn,
                        nuevoAdelanto
                  );
                  res.status(201).json({
                        message: "Adelanto Registrado!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Busca el historial de adelantos de un empleado en una semana
exports.getHistorialAdelantosByEmpleado = async (req, res) => {
    req.getConnection(async (err, conn) => {
          if (err) {
                return res.status(500).json({
                      error: "Error en la conexión a la base de datos",
                });
          }
          try {
                const historialAdelantos = await adelantoModel.getHistorial(
                      conn,
                      req.params.idAsignacion,
                );
                if (!historialAdelantos) {
                      return res
                            .status(404)
                            .json({ message: "No se encontraron adelantos" });
                }
                res.status(200).json({ data: historialAdelantos });
          } catch (error) {
                res.status(500).json({ error: error.message });
          }
    });
};
