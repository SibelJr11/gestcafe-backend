const caseMeses = `
                CASE 
                    WHEN MONTH(fecha) = 1 THEN 'ENERO'
                    WHEN MONTH(fecha) = 2 THEN 'FEBRERO'
                    WHEN MONTH(fecha) = 3 THEN 'MARZO'
                    WHEN MONTH(fecha) = 4 THEN 'ABRIL'
                    WHEN MONTH(fecha) = 5 THEN 'MAYO'
                    WHEN MONTH(fecha) = 6 THEN 'JUNIO'
                    WHEN MONTH(fecha) = 7 THEN 'JULIO'
                    WHEN MONTH(fecha) = 8 THEN 'AGOSTO'
                    WHEN MONTH(fecha) = 9 THEN 'SEPTIEMBRE'
                    WHEN MONTH(fecha) = 10 THEN 'OCTUBRE'
                    WHEN MONTH(fecha) = 11 THEN 'NOVIEMBRE'
                    WHEN MONTH(fecha) = 12 THEN 'DICIEMBRE'
                END 
                `;

exports.create = (conn, finca) => {
      const sql = "INSERT INTO ventas SET ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, finca, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

exports.getByIdFinca = (conn, idFinca) => {
      const sql = "SELECT * FROM ventas WHERE id_finca = ? ORDER BY fecha DESC";
      return new Promise((resolve, reject) => {
            conn.query(sql, idFinca, (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};

// Función que obtiene las de ventas de CAFE SECO  por finca y año y los agrupa por mes
exports.getCafeSecoByIdFinca = (conn, idFinca, year) => {
      return new Promise((resolve, reject) => {
            const query = `
                       SELECT 
                           MONTH(fecha) AS num_mes, 
                           ${caseMeses} AS mes,
                           tipo_cafe, 
                           SUM(cantidad) AS total_cantidad, 
                           SUM(valor) AS total_valor
                       FROM ventas
                       WHERE id_finca = ? 
                           AND tipo_cafe = 'CAFÉ SECO' 
                           AND YEAR(fecha) = ? 
                       GROUP BY num_mes, mes, tipo_cafe
                       ORDER BY num_mes;
        `;
            conn.query(query, [idFinca, year], (err, results) => {
                  if (err) {
                        reject(err);
                  } else {
                        resolve(results);
                  }
            });
      });
};

// Función que obtiene las de ventas de CAFE VERDE   por finca y año y los agrupa por mes
exports.getCafeVerdeByIdFinca = (conn, idFinca, year) => {
      return new Promise((resolve, reject) => {
            const query = `
                       SELECT 
                           MONTH(fecha) AS num_mes, 
                           ${caseMeses} AS mes,
                           tipo_cafe, 
                           SUM(cantidad) AS total_cantidad, 
                           SUM(valor) AS total_valor
                       FROM ventas
                       WHERE id_finca = ? 
                           AND tipo_cafe = 'CAFÉ VERDE' 
                           AND YEAR(fecha) = ? 
                       GROUP BY num_mes, mes, tipo_cafe
                       ORDER BY num_mes;
        `;
            conn.query(query, [idFinca, year], (err, results) => {
                  if (err) {
                        reject(err);
                  } else {
                        resolve(results);
                  }
            });
      });
};

// Función que obtiene las de ventas de PASILLA  por finca y año y los agrupa por mes
exports.getPasillaByIdFinca = (conn, idFinca, year) => {
      return new Promise((resolve, reject) => {
            const query = `
                       SELECT 
                           MONTH(fecha) AS num_mes, 
                           ${caseMeses} AS mes,
                           tipo_cafe, 
                           SUM(cantidad) AS total_cantidad, 
                           SUM(valor) AS total_valor
                       FROM ventas
                       WHERE id_finca = ? 
                           AND tipo_cafe = 'PASILLA' 
                           AND YEAR(fecha) = ? 
                       GROUP BY num_mes, mes, tipo_cafe
                       ORDER BY num_mes;
        `;
            conn.query(query, [idFinca, year], (err, results) => {
                  if (err) {
                        reject(err);
                  } else {
                        resolve(results);
                  }
            });
      });
};

exports.update = (conn, idVenta, data) => {
      const sql = "UPDATE ventas SET ? WHERE id_venta = ?";
      return new Promise((resolve, reject) => {
            conn.query(sql, [data, idVenta], (err, result) => {
                  if (err) return reject(err);
                  resolve(result);
            });
      });
};
