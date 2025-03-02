exports.create = (conn, pago_suscripcion) => {
      const sql = "INSERT INTO pagos_suscripcion SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, pago_suscripcion, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getHistorial = (conn, idSuscripcion) => {
      const sql = `SELECT * FROM pagos_suscripcion WHERE id_suscripcion = ? ORDER BY fecha_pago DESC`;

      return new Promise((resolve, reject) => {
            conn.query(sql, [idSuscripcion], (err, results) => {
                  if (err) reject(err);
                  resolve(results);
            });
      });
};
