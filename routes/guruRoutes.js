const express = require('express');
const { getGuru, getGuruByNIP, postGuru, putGuru, deleteGuru, loginGuru } = require('../controller/guruControl');
const router = express.Router();

// Definisikan rute untuk guru
router.get('/guru', (req, res) => {
  getGuru(res);
});

router.get('/guru/:nip', getGuruByNIP);

router.post('/guru', postGuru);

router.post('/guru/login', loginGuru);

router.put('/guru/:nip', putGuru);

router.delete('/guru/:nip', deleteGuru);

// Ekspor router agar dapat digunakan di file lain
module.exports = router;
