const db = require('../db/koneksi');
const response = require('../response');

const getGuru = (res) => {
  const sql = 'SELECT * FROM guru';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'guru get list ', res);
  });
};

////getMatapelajaran->input materi dan tugas

const getGuruByNIP = (req, res) => {
  const nip = req.params.nip;
  const sql = ' SELECT * FROM guru WHERE nip = ?';
  db.query(sql, [nip], (err, fields) => {
    if (err) throw err;
    response(200, fields, 'get detail guru', res);
  });
};

const postGuru = (req, res) => {
  const { nip, nama_guru, Password } = req.body;

  const sql = `INSERT INTO guru (nip, nama_guru,Password) VALUES (${nip},'${nama_guru}','${Password}')`;

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

//login guru
const loginGuru = (req, res) => {
  const { nip, Password } = req.body;

  const sql = 'SELECT * FROM guru WHERE nip = ? AND Password = ?';
  db.query(sql, [nip, Password], (err, result) => {
    if (err) {
      response(500, null, 'Invalid login', res);
      return;
    }

    if (result.length === 0) {
      response(401, null, 'Invalid login', res);
      return;
    }

    const guruData = {
      nip: result[0].nip,
      nama_guru: result[0].nama_guru,
    };

    response(200, guruData, 'Login successful', res);
  });
};

const putGuru = (req, res) => {
  const { nip, nama_guru, Password } = req.body;

  const sql = `UPDATE guru SET nama_guru = '${nama_guru}', Password = '${Password}' WHERE nip = ${nip}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'Update Data Success', res);
    } else {
      response(404, 'User not found', 'error', res);
    }
  });
};

const deleteGuru = (req, res) => {
  const { nip } = req.body;
  const sql = `DELETE FROM guru WHERE nip = ${nip}`;

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
  getGuru,
  getGuruByNIP,
  postGuru,
  putGuru,
  deleteGuru,
  loginGuru,
};
