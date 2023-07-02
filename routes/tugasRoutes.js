const express = require('express');
const router = express.Router();
const { getTugas, getTugasById, postTugas, putTugas, deleteTugas } = require('../controller/tugasController');

//Definisikan rute untuk tugas

router.get('/tugas', (req, res) => {
  getTugas(res);
});

router.get('/tugas/:id', getTugasById);

router.post('/tugas', postTugas);

router.put('/tugas/:id', putTugas);

router.delete('/tugas/:id', deleteTugas);

module.exports = router;
