const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let syntheticData = [];

app.post('/upload', (req, res) => {
  const data = req.body;
  syntheticData = data;
  console.log("Datos recibidos y almacenados en memoria:", data);
  res.status(200).json({ message: 'Datos recibidos y almacenados correctamente' });
});

app.get('/data', (req, res) => {
  if (syntheticData.length === 0) {
    return res.status(404).json({ message: 'No hay datos disponibles' });
  }
  res.status(200).json({
    message: 'Datos recuperados correctamente',
    data: syntheticData,
  });
});

// Exportar para Vercel (no usar app.listen)
module.exports = app;
