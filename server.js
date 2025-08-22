// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Almacenar los datos sintéticos 
let syntheticData = [];

// Endpoint para subir los datos (solo para almacenarlos en memoria)
app.post('/upload', (req, res) => {
  const data = req.body;
  syntheticData = data;  // Almacenar en memoria
  console.log("Datos recibidos y almacenados en memoria:", data);
  res.status(200).json({
    message: 'Datos recibidos y almacenados correctamente',
  });
});

// Endpoint para consultar los datos almacenados en memoria
app.get('/data', (req, res) => {
  if (syntheticData.length === 0) {
    return res.status(404).json({ message: 'No hay datos disponibles' });
  }
  res.status(200).json({
    message: 'Datos recuperados correctamente',
    data: syntheticData,
  });
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
