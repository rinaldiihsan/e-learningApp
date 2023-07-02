const express = require('express');
const { getMP, getMPbyID, postMataPelajaran, putMataPelajaran, deleteMP } = require('../controller/mpController');
const router = express.Router();

// Definisikan rute untuk guru
router.get('/mata_pelajaran', (req, res) => {
  getMP(res);
});

router.get('/mata_pelajaran/:id', getMPbyID);

router.post('/mata_pelajaran', postMataPelajaran);

router.put('/mata_pelajaran/:id', putMataPelajaran);

router.delete('/mata_pelajaran/:id', deleteMP);

// Ekspor router agar dapat digunakan di file lain
module.exports = router;
