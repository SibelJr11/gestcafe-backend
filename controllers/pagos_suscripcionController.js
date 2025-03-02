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

//Busca el historial de pagos de una suscripcion
exports.getHistorialPagosSuscripcion = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const historialPagosSus = await pagos_suscripcionModel.getHistorial(
                        conn,
                        req.params.idSuscripcion,
                  );
                  if (!historialPagosSus) {
                        return res
                              .status(404)
                              .json({ message: "No se encontraron pagos para esta suscripción " });
                  }
                  res.status(200).json({ data: historialPagosSus });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};