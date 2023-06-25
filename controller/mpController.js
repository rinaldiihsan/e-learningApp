const db = require('../db/koneksi');
const response = require('../response');

const getMP = (res) => {
  const sql = 'SELECT * FROM mata_pelajaran';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'mata pelajaran get list', res);
  });
};

const getMPbyID = (req, res) => {
  const id_mp = req.params.id;
  const sql = 'SELECT * FROM mata_pelajaran WHERE id_mp = ?';
  db.query(sql, [id_mp], (err, fields) => {
    if (err) throw err;
    response(200, fields, 'get MP by ID', res);
  });
};

const postMataPelajaran = (req, res) => {
  const { nama_mp, kelas, jurusan, nip } = req.body;

  const getGuruByNIPQuery = 'SELECT nama_guru FROM guru WHERE nip = ?';

  db.query(getGuruByNIPQuery, [nip], (err, result) => {
    if (err) {
      response(500, null, 'Failed to fetch guru data', res);
      return;
    }

    if (result.length === 0) {
      response(404, null, 'Guru not found', res);
      return;
    }

    const nama_guru = result[0].nama_guru;

    const insertMataPelajaranQuery = 'INSERT INTO mata_pelajaran (nama_mp, kelas, jurusan , nama_guru) VALUES (?, ?, ?,?)';
    const values = [nama_mp, kelas, jurusan, nama_guru];

    db.query(insertMataPelajaranQuery, values, (err, result) => {
      if (err) {
        response(500, null, 'Failed to insert mata pelajaran data', res);
        return;
      }

      response(200, result, 'Mata pelajaran data inserted successfully', res);
    });
  });
};

const putMataPelajaran = (req, res) => {
  const { id_mp, nama_mp } = req.body;
  const sql = `UPDATE mata_pelajaran SET nama_mp = '${nama_mp}' WHERE id_mp= ${id_mp}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSucces: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'Update Data Success', res);
    } else {
      response(404, 'User not found', 'erorr', res);
    }
  });
};

const deleteMP = (req, res) => {
  const { id_mp } = req.body;
  const sql = `DELETE FROM mata_pelajaran WHERE id_mp = ${id_mp}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, 'Deleted Data Success', res);
    } else {
      response(404, 'Mata Pelajaran not found', 'error', res);
    }
  });
};

module.exports = {
  getMP,
  getMPbyID,
  postMataPelajaran,
  putMataPelajaran,
  deleteMP,
};
