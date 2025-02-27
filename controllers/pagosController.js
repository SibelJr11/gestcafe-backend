const pagoModel = require("../models/pagoModel");

// Crear un pago
exports.createPago = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevoPago = req.body;
                  const resultado = await pagoModel.create(conn, nuevoPago);
                  res.status(201).json({
                        message: "Pago Realizado!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Busca todos los pagos o muestra el historial de pagos de una finca
exports.getTodosPagos = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const { pagina = 1 } = req.query; // Página actual (por defecto 1)
                  const idFinca = req.params.idFinca; 
      
                  // Obtener los pagos para la página actual
                  const pagos = await pagoModel.getPagos(conn, idFinca, pagina);
                  
                  // Obtener el total de pagos
                  const totalPagos = await pagoModel.getTotalPagos(conn, idFinca);
      
                  // Calcular el número total de páginas
                  const totalPaginas = Math.ceil(totalPagos / 10); // Usando 10 como el límite de pagos por página
      
                  res.status(200).json({
                      data: pagos,
                      totalPaginas
                  });
      
              } catch (error) {
                  res.status(500).json({ error: error.message });
              }
      });
};