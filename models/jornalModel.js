exports.create = (conn, jornal) => {
      const sql = "INSERT INTO jornales SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, jornal, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getHistorial = (conn, idAsignacion) => {
      const sql = `
       SELECT 
           e.nombre,
           DATE(j.fecha) AS fecha,  -- Extrae solo la fecha (sin la hora)
           TIME_FORMAT(j.fecha, '%h:%i %p') AS hora, -- Extrae la hora en formato AM/PM
           j.kilos
       FROM jornales AS j
       JOIN asignaciones AS a ON j.id_asignacion = a.id_asignacion
       JOIN empleados AS e ON a.id_empleado = e.id_empleado
       WHERE a.id_asignacion = ?
       GROUP BY DATE(j.fecha), TIME(j.fecha) -- Agrupa por fecha y hora
       ORDER BY j.fecha ASC;
  `;

      return new Promise((resolve, reject) => {
            conn.query(sql, [idAsignacion], (err, results) => {
                  if (err) reject(err);
                  resolve(results);
            });
      });
};
