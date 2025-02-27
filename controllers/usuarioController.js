const bcrypt = require("bcrypt");
const usuarioModel = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");

// Crear un usuario
exports.createUsuario = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const nuevoUsuario = req.body;

                  // Encriptar la contraseña antes de guardarla
                  const saltRounds = 10; // Número de rondas para generar el salt
                  nuevoUsuario.password = await bcrypt.hash(
                        nuevoUsuario.password,
                        saltRounds
                  );

                  const resultado = await usuarioModel.create(
                        conn,
                        nuevoUsuario
                  );
                  res.status(201).json({
                        message: "Usuario Registrado!",
                        data: resultado,
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

//Login del usuario
exports.loginUsuario = (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }

            try {
                  const { no_identificacion, password } = req.body;
                  const usuario = await usuarioModel.login(
                        conn,
                        no_identificacion
                  );

                  // Verificar la contraseña con bcrypt
                  const passwordValida = await bcrypt.compare(
                        password,
                        usuario.password
                  );

                  if (!passwordValida) {
                        return res
                              .status(401)
                              .json({ error: "Contraseña incorrecta" });
                  }

                  // Generar  token JWT
                  const token = jwt.sign(
                        {
                              id: usuario.no_identificacion,
                              correo: usuario.correo,
                              rol: usuario.rol,
                        }, // Datos en el payload
                        "mi_secreto_super_seguro", // Clave secreta para firmar el token
                        { expiresIn: "1h" } // Tiempo de expiración del token
                  );
                  res.status(200).json({
                        message: "Inicio de sesión exitoso.",
                        token,
                        usuario: {
                              no_identificacion: usuario.no_identificacion,
                              nombres: usuario.nombres,
                              apellidos: usuario.apellidos,
                              rol: usuario.rol,
                        },
                  });
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};

exports.verifyUsuario = async (req, res) => {
      req.getConnection(async (err, conn) => {
            if (err) {
                  return res.status(500).json({
                        error: "Error en la conexión a la base de datos",
                  });
            }
            try {
                  const usuario = await usuarioModel.verify(
                        conn,
                        req.params.id
                  );

                  if (usuario.length > 0) {
                        // Si el usuario existe, devolver true
                        return res.status(200).json({
                              existe: true,
                        });
                  } else {
                        // Si no se encuentra el usuario, devolver false
                        return res.status(400).json({ existe: false });
                  }
            } catch (error) {
                  res.status(500).json({ error: error.message });
            }
      });
};
