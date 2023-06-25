const express = require('express');
const { getMateri, getMateriById, postMateri, putMateri, deleteMateri } = require('../controller/materiController');
const router = express.Router();

//Definisikan rute untuk materi

router.get('/materi', (req, res) => {
  getMateri(res);
});

router.get('/materi/:id', getMateriById);

router.post('/materi', postMateri);

router.put('/materi', putMateri);

router.delete('/materi', deleteMateri);

module.exports = router;
