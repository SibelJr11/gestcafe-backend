exports.create = (conn, asignacion) => {
      const sql = "INSERT INTO asignaciones SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, asignacion, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getByIdFinca = (conn, idFinca) => {
      return new Promise((resolve, reject) => {
            // Iniciar la transacción
            conn.beginTransaction((err) => {
                  if (err) {
                        return reject(err); // Si no se puede iniciar la transacción, se rechaza
                  }

                  // SQL para obtener el id de la ultima semana de trabajo de una finca mediante su id_finca`
                  const sqlSemana = `SELECT id_semana FROM semanas 
                             WHERE estado = TRUE AND id_finca = ? 
                             ORDER by id_semana DESC LIMIT 1`;

                  conn.query(sqlSemana, [idFinca], (err, resultSemana) => {
                        if (err) {
                              // Si ocurre un error en el SELECT, se revierte la transacción
                              return conn.rollback(() => {
                                    reject(err);
                              });
                        }
                        if (resultSemana.length === 0) {
                              // Si no hay semanas disponibles, resolver con un arreglo vacío
                              return conn.commit(() => {
                                    resolve([]);
                              });
                        }

                        // Extraer el id_semana del resultado
                        const idSemana = resultSemana[0].id_semana;

                        // SQL para buscar todas la asignaciones de una finca durante una semana
                        const sqlAsignacion = `SELECT 
                                              a.id_asignacion,
                                              a.id_empleado,
                                              e.nombre,
                                              a.id_semana,
                                              CONVERT(COALESCE(j.suma_kilos, 0), UNSIGNED) AS kilos,
                                              CONVERT(COALESCE(ad.suma_adelantos, 0), UNSIGNED) AS adelantos
                                          FROM 
                                              asignaciones AS a
                                          JOIN 
                                              empleados AS e ON a.id_empleado = e.id_empleado
                                          LEFT JOIN 
                                              (SELECT id_asignacion, SUM(kilos) AS suma_kilos 
                                               FROM jornales 
                                               GROUP BY id_asignacion) AS j 
                                               ON a.id_asignacion = j.id_asignacion
                                          LEFT JOIN 
                                              (SELECT id_asignacion, SUM(valor) AS suma_adelantos 
                                               FROM adelantos 
                                               GROUP BY id_asignacion) AS ad 
                                               ON a.id_asignacion = ad.id_asignacion
                                          WHERE 
                                              a.id_semana = ?
                                          AND a.estado = TRUE
                                          ORDER BY 
                                              e.nombre ASC;
                                          `;
                                                                  
                     /*   `WITH JornalSuma AS (
                              SELECT id_asignacion, SUM(kilos) AS suma_kilos 
                              FROM jornales 
                              GROUP BY id_asignacion
                          ),
                          AdelantoSuma AS (
                              SELECT id_asignacion, SUM(valor) AS suma_adelantos 
                              FROM adelantos 
                              GROUP BY id_asignacion
                          )
                          SELECT 
                              a.id_asignacion,
                              a.id_empleado,
                              e.nombre,
                              a.id_semana,
                            CONVERT(COALESCE(j.suma_kilos, 0), UNSIGNED) AS kilos,
                            CONVERT(COALESCE(ad.suma_adelantos, 0), UNSIGNED) AS adelantos

                          FROM 
                              asignaciones AS a
                          JOIN 
                              empleados AS e ON a.id_empleado = e.id_empleado
                          LEFT JOIN JornalSuma j ON a.id_asignacion = j.id_asignacion
                          LEFT JOIN AdelantoSuma ad ON a.id_asignacion = ad.id_asignacion
                          WHERE 
                              a.id_semana = ?
                          AND a.estado = TRUE
                          ORDER BY 
                              e.nombre ASC;
                        `;*/

                        conn.query(
                              sqlAsignacion,
                              [idSemana],
                              (err, resultAsignacion) => {
                                    if (err) {
                                          // Si ocurre un error en el SELECT, se revierte la transacción
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
                                          resolve(resultAsignacion);
                                    });
                              }
                        );
                  });
            });
      });
};
