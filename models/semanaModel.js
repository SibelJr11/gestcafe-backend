exports.create = (db, semana) => {
      const sql = "INSERT INTO semanas SET ?";
      return new Promise((resolve, reject) => {
            db.query(sql, semana, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getLastWeek = (conn, idFinca) => {
      const sql = `SELECT id_semana FROM semanas WHERE estado = TRUE AND id_finca = ? 
             ORDER by id_semana DESC LIMIT 1`;
      return new Promise((resolve, reject) => {
            conn.query(sql, [idFinca], (err, results) => {
                  if (err) return reject(err);
                  resolve(results);
            });
      });
};

exports.getLastWeek = (conn, idFinca) => {
      const sql = `SELECT id_semana FROM semanas WHERE estado = TRUE AND id_finca = ? 
             ORDER by id_semana DESC LIMIT 1`;
      return new Promise((resolve, reject) => {
            conn.query(sql, [idFinca], (err, results) => {
                  if (err) return reject(err);
                  if (results.length > 0) {
                        resolve(results[0].id_semana);
                  } else {
                        resolve(null);
                  }
            });
      });
};

exports.finalizeWeek = (conn, idSemana) => {
      const sql = `
          UPDATE semanas
          SET estado = 0
          WHERE id_semana = ?
            AND estado = 1`;

      return new Promise((resolve, reject) => {
            conn.query(sql, [idSemana], (err, results) => {
                  if (err) return reject(err);
                  resolve(results);
            });
      });
};
