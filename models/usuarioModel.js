exports.create = (conn, usuario) => {
      const sql = "INSERT INTO usuarios SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, usuario, (err, result) => {
                  if (err) {
                        if (err.code === "ER_DUP_ENTRY") {
                              return reject(new Error("El usuario ya existe"));
                        }
                        return reject(err);
                  }

                  resolve(result);
            });
      });
};

exports.login = (conn, no_identificacion) => {
      const sql = "SELECT * FROM usuarios WHERE no_identificacion = ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, no_identificacion, (err, result) => {
                  if (err) return reject(err);
                  if (result.length === 0)
                        return reject(new Error("Usuario no existe"));
                  resolve(result[0]);
            });
      });
};

exports.verify = (conn, id) => {
      const sql = "SELECT * FROM usuarios WHERE no_identificacion = ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, id, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getAll = (conn) => {
      const sql = `SELECT 
                 u.no_identificacion,
                 u.rol,
                 u.nombres,
                 u.apellidos,
                 u.celular,
                 u.correo,
                 s.plan,
                 s.fecha_inicio,
                 s.fecha_suspension,
                 s.estado,
             FROM usuarios AS u
             LEFT JOIN suscripciones AS s 
                 ON u.no_identificacion = s.id_usuario
             ORDER BY u.nombres ASC, u.apellidos ASC;
             `;
      return new Promise((resolve, reject) => {
            conn.query(sql, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};
