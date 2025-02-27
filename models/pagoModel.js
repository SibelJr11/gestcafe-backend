exports.create = (conn, pago) => {
      return new Promise((resolve, reject) => {
            // Iniciar la transacción
            conn.beginTransaction((err) => {
                  if (err) {
                        return reject(err); // Si no se puede iniciar la transacción, se rechaza
                  }

                  // SQL para insertar el pago en la tabla `pagos`
                  const sqlPago = "INSERT INTO pagos SET ?";
                  conn.query(sqlPago, pago, (err, result) => {
                        if (err) {
                              // Si ocurre un error en el INSERT, se revierte la transacción
                              return conn.rollback(() => {
                                    reject(err);
                              });
                        }

                        // SQL para actualizar el estado en la tabla `asignaciones`
                        const sqlAsignacion =
                              "UPDATE asignaciones SET estado = 0 WHERE id_asignacion = ?";
                        conn.query(
                              sqlAsignacion,
                              pago.id_asignacion,
                              (err, result) => {
                                    if (err) {
                                          // Si ocurre un error en el UPDATE, se revierte la transacción
                                          return conn.rollback(() => {
                                                reject(err);
                                          });
                                    }

                                    // Si ambas consultas se ejecutan correctamente, se confirma la transacción
                                    conn.commit((err) => {
                                          if (err) {
                                                // Si ocurre un error en el commit, se revierte la transacción
                                                return conn.rollback(() => {
                                                      reject(err);
                                                });
                                          }

                                          // Si todo es correcto, se resuelve la promesa con el resultado
                                          resolve(result);
                                    });
                              }
                        );
                  });
            });
      });
};

exports.getPagos = (conn, idFinca, pagina = 1) => {
      const limite = 10; // Asegúrate de definir el límite
      const offset = (pagina - 1) * limite;

      const sql = `
      SELECT 
          f.nombre AS finca, e.nombre AS empleado, p.fecha, p.valor, p.observacion
      FROM 
          fincas AS f
      JOIN 
          semanas AS s ON f.id_finca = s.id_finca
      JOIN 
          asignaciones AS a ON s.id_semana = a.id_semana
      JOIN 
          empleados AS e ON a.id_empleado = e.id_empleado
      JOIN 
          pagos AS p ON a.id_asignacion = p.id_asignacion
      WHERE 
          f.id_finca = ? 
      ORDER BY 
          p.fecha DESC, e.nombre ASC
      LIMIT ? OFFSET ?;
  `;

      return new Promise((resolve, reject) => {
            conn.query(sql, [idFinca, limite, offset], (err, results) => {
                  if (err) reject(err);
                  resolve(results);
            });
      });
};

exports.getTotalPagos = (conn, idFinca) => {
      const sql = `SELECT 
                  COUNT(*) AS total
                  FROM 
                    fincas AS f
                  JOIN 
                    semanas AS s ON f.id_finca = s.id_finca
                  JOIN 
                    asignaciones AS a ON s.id_semana = a.id_semana
                  JOIN 
                    empleados AS e ON a.id_empleado = e.id_empleado
                  JOIN 
                    pagos AS p ON a.id_asignacion = p.id_asignacion
                  WHERE 
                    f.id_finca = ? 
                  `;

      return new Promise((resolve, reject) => {
            conn.query(sql, [idFinca], (err, results) => {
                  if (err) reject(err);
                  resolve(results[0].total);
            });
      });
};
