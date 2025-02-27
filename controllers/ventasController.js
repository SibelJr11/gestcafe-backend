const ventaModel = require("../models/ventaModel");

// Crear una venta de café
exports.createVenta = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevaVenta = req.body;
                  const resultado = await ventaModel.create(conn, nuevaVenta);
                  res.status(201).json({
                        message: "Venta de café registrada!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Obtengo todas las ventas de café de una finca por su id_finca
exports.getVentas = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const ventas = await ventaModel.getByIdFinca(
                        conn,
                        req.params.idFinca
                  );

                  res.status(200).json({
                        message: "Ventas de café",
                        data: ventas,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Obtengo todos los kilos y valor de CAFE SECO vendido por finca y año
exports.getDataVentasCafeSecoByIdFinca = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const ventas_kilos = await ventaModel.getCafeSecoByIdFinca(
                        conn,
                        req.params.idFinca,
                        req.params.year
                  );

                  res.status(200).json({
                        message: "Ventas de café seco",
                        data: ventas_kilos,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Obtengo todos los kilos y valor de CAFE VERDE vendido por finca y año
exports.getDataVentasCafeVerdeByIdFinca = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const ventas = await ventaModel.getCafeVerdeByIdFinca(
                        conn,
                        req.params.idFinca,
                        req.params.year
                  );

                  res.status(200).json({
                        message: "Ventas de café verde",
                        data: ventas,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Obtengo todos los kilos y valor de PASILLA vendida por finca y año
exports.getDataVentasPasillaByIdFinca = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const ventas = await ventaModel.getPasillaByIdFinca(
                        conn,
                        req.params.idFinca,
                        req.params.year
                  );

                  res.status(200).json({
                        message: "Ventas de pasilla",
                        data: ventas,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};


// Modificar los datos de una venta
exports.updateVenta = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const dataVenta = req.body;
                  const idVenta = req.params.idVenta;
                  await ventaModel.update(conn, idVenta, dataVenta);
                  res.status(200).json({
                        message: "Datos modificados exitosamente!",
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};