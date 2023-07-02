const db = require('../db/koneksi');
const response = require('../response');

const getMateri = (res) => {
  const sql = 'SELECT * FROM materi';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'materi get list', res);
  });
};

const getMateriById = (req, res) => {
  const id_m = req.params.id;
  const sql = 'SELECT * FROM materi WHERE id_m = ?';
  db.query(sql, [id_m], (err, fields) => {
    if (err) throw err;
    response(200, fields, 'get Materi by ID', res);
  });
};

const postMateri = (req, res) => {
  const { judul_materi, input_materi } = req.body;
  const id_mp = req.body.id_mp;

  const getMataPelajaranQuery = 'SELECT id_mp, nama_mp, kelas, jurusan FROM mata_pelajaran WHERE id_mp = ?';

  db.query(getMataPelajaranQuery, [id_mp], (err, result) => {
    if (err) {
      response(500, null, 'Failed to fetch mata pelajaran data', res);
      return;
    }

    if (result.length === 0) {
      response(404, null, 'Mata Pelajaran not found', res);
      return;
    }

    const mataPelajaran = result[0];
    const { nama_mp, kelas, jurusan } = mataPelajaran;

    const insertMateriQuery = 'INSERT INTO materi (id_mp, judul_materi, input_materi, nama_mp, kelas, jurusan) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [id_mp, judul_materi, input_materi, nama_mp, kelas, jurusan];

    db.query(insertMateriQuery, values, (err, result) => {
      if (err) {
        response(500, null, 'Failed to insert materi data', res);
        return;
      }

      const insertedMateri = {
        id_mp,
        nama_mp,
        judul_materi,
        input_materi,
        kelas,
        jurusan,
      };

      response(200, insertedMateri, 'Materi data inserted successfully', res);
    });
  });
};

const putMateri = (req, res) => {
  const id_m = req.params.id;
  const { judul_materi, input_materi } = req.body;
  const sql = `UPDATE materi SET judul_materi = '${judul_materi}', input_materi = '${input_materi}' WHERE id_m = ${id_m}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSucces: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'Update Data Success', res);
    } else {
      response(404, 'User not found', 'error', res);
    }
  });
};

const deleteMateri = (req, res) => {
  const id_m = req.params.id;
  const sql = `DELETE FROM materi WHERE id_m = ${id_m}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, 'DELETED Data SUCCESS', res);
    } else {
      response(404, 'Materi not found', 'error', res);
    }
  });
};

module.exports = {
  getMateri,
  getMateriById,
  postMateri,
  putMateri,
  deleteMateri,
};
