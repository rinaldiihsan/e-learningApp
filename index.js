const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT;

const bodyParser = require('body-parser');
const siswaRoutes = require('./routes/siswaRoutes');
const guruRoutes = require('./routes/guruRoutes');
const mpRoutes = require('./routes/mpRoutes');
const materiRoutes = require('./routes/materiRoutes');
const tugasRoutes = require('./routes/tugasRoutes');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Selamat datang di elearning');
});

app.use(siswaRoutes);
app.use(guruRoutes);
app.use(mpRoutes);
app.use(materiRoutes);
app.use(tugasRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
