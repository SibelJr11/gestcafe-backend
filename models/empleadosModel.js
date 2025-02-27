exports.create = (conn, empleado) => {
      const sql = "INSERT INTO empleados SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, empleado, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getAll = (conn) => {
      const sql = "SELECT * FROM empleados";
      return new Promise((resolve, reject) => {
            conn.query(sql, (err, results) => {
                  if (err) return reject(console.log(err));
                  resolve(results);
            });
      });
};

exports.getByName = (conn, search) => {
      const sql = "SELECT * FROM empleados WHERE nombre LIKE ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, [`%${search}%`], (err, results) => {
                  if (err) return reject(err);
                  resolve(results);
            });
      });
};

exports.update = (conn, id, data) => {
      const sql = "UPDATE empleados SET ? WHERE id = ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, [data, id], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.delete = (conn, id) => {
      const sql = "DELETE FROM empleados WHERE id = ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, [id], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};
