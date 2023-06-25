const express = require('express');
const { getSiswa, getSiswaByNIS, postSiswa, putSiswa, deleteSiswa, loginSiswa } = require('../controller/siswaControl');
const router = express.Router();

// Definisikan rute untuk siswa
router.get('/siswa', (req, res) => {
  getSiswa(res);
});

router.get('/siswa/:nis', getSiswaByNIS);

router.post('/siswa/login', loginSiswa);

router.post('/siswa', postSiswa);

router.put('/siswa', putSiswa);

router.delete('/siswa', deleteSiswa);

// Ekspor router agar dapat digunakan di file lain
module.exports = router;
