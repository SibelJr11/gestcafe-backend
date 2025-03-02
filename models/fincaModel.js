exports.create = (conn, finca) => {
      const sql = "INSERT INTO fincas SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, finca, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getByIdPropietario = (conn, id) => {
      const sql = `SELECT 
                        id_finca, 
                        nombre, 
                        ubicacion, 
                        cultivo, 
                        hectareas, 
                        id_propietario, 
                        p.nombres AS nombres_prop,
                        p.apellidos AS apellidos_prop,
                        id_administrador, 
                        u.nombres AS nombres_admin, 
                        u.apellidos AS apellidos_admin    
                    FROM  
                        fincas AS f
                    LEFT JOIN 
                        usuarios AS p ON f.id_propietario = p.no_identificacion
                    LEFT JOIN 
                        usuarios AS u ON f.id_administrador = u.no_identificacion
                    WHERE 
                        f.id_propietario = ?;
                    `;
      return new Promise((resolve, reject) => {
            conn.query(sql, [id], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getByIdAdministrador = (conn, id) => {
      const sql = `SELECT 
                      id_finca, 
                      nombre, 
                      ubicacion, 
                      cultivo, 
                      hectareas, 
                      id_propietario, 
                      p.nombres AS nombres_prop,
                      p.apellidos AS apellidos_prop,
                      id_administrador, 
                      u.nombres AS nombres_admin, 
                      u.apellidos AS apellidos_admin    
                  FROM  
                      fincas AS f
                  LEFT JOIN 
                      usuarios AS p ON f.id_propietario = p.no_identificacion
                  LEFT JOIN 
                      usuarios AS u ON f.id_administrador = u.no_identificacion
                  WHERE 
                      f.id_administrador = ?;
                  `;
      return new Promise((resolve, reject) => {
            conn.query(sql, [id], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

//Obtiene el total de kilos y de pagos a trabajadores de una finca en especifica y los agrupa por mes.
exports.getByIdAndYear = (conn, idFinca, year) => {
      const sql = `SELECT 
    DATE_FORMAT(p.fecha, '%M') AS mes,
    COALESCE((
        SELECT SUM(pagos.valor)
        FROM pagos
        WHERE pagos.id_asignacion = a.id_asignacion
        AND YEAR(pagos.fecha) = ?
    ), 0) AS total_pagos,
    SUM(j.kilos) AS total_kilos
FROM 
    fincas f
JOIN 
    semanas s ON f.id_finca = s.id_finca
JOIN 
    asignaciones a ON s.id_semana = a.id_semana
LEFT JOIN 
    jornales j ON a.id_asignacion = j.id_asignacion
LEFT JOIN 
    pagos p ON a.id_asignacion = p.id_asignacion
WHERE 
    f.id_finca = ?
AND 
    YEAR(j.fecha) = ?
GROUP BY 
    mes
ORDER BY 
    MONTH(p.fecha);
`;
      return new Promise((resolve, reject) => {
            conn.query(sql, [year, idFinca, year], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getTodasFincasByIdAndYear = (conn, no_identificacion, year) => {
      const sql = `SELECT 
               f.nombre,
               CONVERT(COALESCE(SUM(p.valor), 0), SIGNED) AS total_pagos,
               SUM(j.kilos) AS total_kilos
           FROM 
               fincas f
           JOIN 
               usuarios u ON f.id_propietario = u.no_identificacion
           JOIN 
               semanas s ON f.id_finca = s.id_finca
           JOIN 
               asignaciones a ON s.id_semana = a.id_semana
           JOIN 
               jornales j ON a.id_asignacion = j.id_asignacion
           JOIN 
               pagos p ON a.id_asignacion = p.id_asignacion
           WHERE 
               u.no_identificacion = ?
           AND 
              YEAR(p.fecha) = ?
           GROUP BY 
              f.nombre
           ORDER BY 
              f.nombre;`;
      return new Promise((resolve, reject) => {
            conn.query(sql, [no_identificacion, year], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.update = (conn, idFinca, data) => {
      const sql = "UPDATE fincas SET ? WHERE id_finca = ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, [data, idFinca], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.delete = (conn, idFinca) => {
      const sql = "DELETE FROM fincas WHERE id_finca = ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, [idFinca], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};
