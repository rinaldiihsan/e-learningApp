const db = require('../db/koneksi');
const response = require('../response');

const getTugas = (res) => {
  const sql = 'SELECT * FROM tugas';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'tugas get list', res);
  });
};

const getTugasById = (req, res) => {
  const id_t = req.params.id;
  const sql = 'SELECT * FROM tugas WHERE id_t = ?';
  db.query(sql, [id_t], (err, fields) => {
    if (err) throw err;
    response(200, fields, 'GET Tugas By ID', res);
  });
};

const postTugas = (req, res) => {
  const { id_mp, nama_tugas, input_tugas, deadline } = req.body;

  const getMataPelajaranQuery = 'SELECT nama_mp, kelas, jurusan FROM mata_pelajaran WHERE id_mp = ?';
  db.query(getMataPelajaranQuery, [id_mp], (err, result) => {
    if (err) {
      response(500, null, 'Failed to fetch mata pelajaran data', res);
      return;
    }

    if (result.length === 0) {
      response(404, null, 'Mata Pelajaran not found', res);
      return;
    }

    const { nama_mp, kelas, jurusan } = result[0];

    const insertTugasQuery = 'INSERT INTO tugas (id_mp,nama_tugas, input_tugas, deadline, nama_mp, kelas, jurusan) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [id_mp, nama_tugas, input_tugas, deadline, nama_mp, kelas, jurusan];

    db.query(insertTugasQuery, values, (err, result) => {
      if (err) {
        response(500, null, 'Failed to insert tugas data', res);
        return;
      }

      const insertedTugas = {
        id_mp,
        nama_tugas,
        input_tugas,
        nama_mp,
        kelas,
        jurusan,
        deadline,
      };

      response(200, insertedTugas, 'Tugas data inserted successfully', res);
    });
  });
};

const putTugas = (req, res) => {
  const id_t = req.params.id;
  const { nama_tugas, input_tugas, deadline } = req.body;
  const sql = `UPDATE tugas SET nama_tugas = '${nama_tugas}',input_tugas ='${input_tugas}',deadline = '${deadline}' WHERE id_t = ${id_t}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSucces: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'Update Data Succes', res);
    } else {
      response(404, 'User not found', 'error', res);
    }
  });
};

const deleteTugas = (req, res) => {
  const id_t = req.params.id;
  const sql = `DELETE FROM tugas WHERE id_t = ${id_t}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, 'DELETED data SUCCESS', res);
    } else {
      response(404, 'Materi not found', 'error', res);
    }
  });
};

module.exports = {
  getTugas,
  getTugasById,
  postTugas,
  putTugas,
  deleteTugas,
};
