exports.create = (conn, suscripcion) => {
    const sql = "INSERT INTO suscripciones SET ?";
    return new Promise((resolve, reject) => {
          conn.query(sql, suscripcion, (err, result) => {
                if (err) return reject(err);
                resolve(result);
          });
    });
};