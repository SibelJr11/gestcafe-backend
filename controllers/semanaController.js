const semanaModel = require("../models/semanaModel");

// Crear una semana de trabajo
exports.createSemana = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevaSemana = req.body;
                  const resultado = await semanaModel.create(conn, nuevaSemana);
                  res.status(201).json({
                        message: "Semana de Trabajo Registrada!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Terminara semana de trabajo
exports.finalizeSemana = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const dataSemana = req.body;
                  const resultado = await semanaModel.finalizeWeek(
                        conn,
                        req.params.idSemana
                  );
                  res.status(201).json({
                        message: "Semana de trabajo culminada!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Obtengo el ID de la ultima semana de trabajo
exports.getUltimoIdSemana = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const semana = await semanaModel.getLastWeek(
                        conn,
                        req.params.idFinca
                  );

                  res.status(200).json({
                        message: "Id de la ultima Semana",
                        data: semana,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};
