const db = require('../db/koneksi');
const response = require('../response');
const { generateToken } = require('../auth/jwt');

const getSiswa = (res) => {
  const sql = 'SELECT * FROM siswa';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'siswa get list', res);
  });
};

const getSiswaByNIS = (req, res) => {
  const nis = req.params.nis;
  const sql = 'SELECT * FROM siswa WHERE nis = ?';
  db.query(sql, [nis], (err, fields) => {
    if (err) throw err;
    response(200, fields, 'get detail siswa', res);
  });
};

//getMatapelajaran->materi dan input tugas

const postSiswa = (req, res) => {
  const { nis, nama_siswa, password, kelas, jurusan } = req.body;

  const sql = `INSERT INTO siswa (nis, nama_siswa,password,kelas,jurusan)
    VALUES (${nis},'${nama_siswa}','${password}','${kelas}','${jurusan}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, 'data added success', res);
    }
  });
};

//loginSiswa
const loginSiswa = (req, res) => {
  const { nis, password } = req.body;

  // Lakukan validasi NIS dan password di sini dengan database
  const sql = 'SELECT * FROM siswa WHERE nis = ? AND password = ?';
  db.query(sql, [nis, password], (err, results) => {
    if (err) {
      console.error(err);
      response(500, 'invalid', 'error', res);
    } else if (results.length > 0) {
      // Jika NIS dan password valid
      const responseData = {
        nis: results[0].nis,
      };
      response(200, responseData, 'login success', res);
    } else {
      // Jika NIS atau password tidak valid
      res.status(401).json({ error: 'Invalid NIS or password' });
    }
  });
};
//akhirloginsiswa

const putSiswa = (req, res) => {
  const { nis, nama_siswa, password, kelas, jurusan } = req.body;
  const sql = `UPDATE siswa SET nama_siswa = '${nama_siswa}' , password = '${password}',kelas = '${kelas}',jurusan = '${jurusan}' WHERE nis = ${nis}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'Update Data Success', res);
    } else {
      response(404, 'User not found', 'erorr', res);
    }
  });
};

const deleteSiswa = (req, res) => {
  const { nis } = req.body;
  const sql = `DELETE FROM siswa WHERE nis = ${nis}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, 'Deleted Data Success', res);
    } else {
      response(404, 'User not found', 'error', res);
    }
  });
};

module.exports = {
  getSiswa,
  getSiswaByNIS,
  postSiswa,
  putSiswa,
  deleteSiswa,
  loginSiswa,
};
