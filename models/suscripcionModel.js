exports.create = (conn, suscripcion) => {
      const sql = "INSERT INTO suscripciones SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, suscripcion, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.update = (conn, idSuscripcion, data) => {
      const sql = "UPDATE suscripciones SET ? WHERE id_suscripcion = ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, [data, idSuscripcion], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};


