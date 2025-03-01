const suscripcionModel = require("../models/suscripcionModel");

// Crear una suscripcion
exports.createSuscripcion = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevaSuscripcion = req.body;
                  const resultado = await suscripcionModel.create(conn, nuevaSuscripcion);
                  res.status(201).json({
                        message: "Suscripción registrada!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};
