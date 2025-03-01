const pagos_suscripcionModel = require("../models/pagos_suscripcionModel");

// Crear un pago para una suscripcion
exports.createPagoSuscripcion = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevaPagoSuscripcion = req.body;
                  const resultado = await pagos_suscripcionModel.create(conn, nuevaPagoSuscripcion);
                  res.status(201).json({
                        message: "Suscripción pagada!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};