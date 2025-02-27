const empleadosModel = require("../models/empleadosModel");

// Crear un empleado
exports.createEmpleado = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevoEmpleado = req.body;
                  const resultado = await empleadosModel.create(
                        conn,
                        nuevoEmpleado
                  );
                  res.status(201).json({
                        message: "Empleado Registrado!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Obtener todos los empleados
exports.getEmpleados = (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }

            try {
                  // Aquí usamos el modelo y pasamos la conexión
                  const empleados = await empleadosModel.getAll(conn);
                  res.status(200).json({
                        message: "Lista de empleados",
                        data: empleados,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Busca empleados por nombre
exports.getEmpleadosBySearch = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }

            try {
                  const search = req.query.search || "";
                  const empleado = await empleadosModel.getByName(conn, search);
                  if (!empleado) {
                        return res
                              .status(404)
                              .json({ message: "Empleado no encontrado" });
                  }
                  res.status(200).json({ data: empleado });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

// Actualizar un empleado
exports.updateEmpleado = async (req, res) => {
      try {
            const resultado = await empleadosModel.update(
                  req.params.id,
                  req.body
            );
            res.status(200).json({
                  message: "Empleado actualizado",
                  data: resultado,
            });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};

// Eliminar un empleado
exports.deleteEmpleado = async (req, res) => {
      try {
            await empleadosModel.delete(req.params.id);
            res.status(200).json({ message: "Empleado eliminado" });
      } catch (error) {
            res.status(500).json({ error: error.message });
      }
};
