exports.create = (conn, pago_suscripcion) => {
    const sql = "INSERT INTO pagos_suscripcion SET ?";
    return new Promise((resolve, reject) => {
          conn.query(sql, pago_suscripcion, (err, result) => {
                if (err) return reject(err);
                resolve(result);
          });
    });
};