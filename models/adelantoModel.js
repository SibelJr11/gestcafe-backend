exports.create = (conn, adelanto) => {
      const sql = "INSERT INTO adelantos SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, adelanto, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getHistorial = (conn, idAsignacion) => {
      const sql = `
     SELECT 
         e.nombre,
         DATE(ad.fecha) AS fecha,  -- Extrae solo la fecha (sin la hora)
         TIME_FORMAT(ad.fecha, '%h:%i %p') AS hora, -- Extrae la hora en formato AM/PM
         ad.valor
     FROM adelantos AS ad
     JOIN asignaciones AS a ON ad.id_asignacion = a.id_asignacion
     JOIN empleados AS e ON a.id_empleado = e.id_empleado
     WHERE a.id_asignacion = ?
     GROUP BY DATE(ad.fecha), TIME(ad.fecha) -- Agrupa por fecha y hora
     ORDER BY ad.fecha ASC;
`;

      return new Promise((resolve, reject) => {
            conn.query(sql, [idAsignacion], (err, results) => {
                  if (err) reject(err);
                  resolve(results);
            });
      });
};
