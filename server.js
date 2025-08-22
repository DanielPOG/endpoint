const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// 🔹 Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err));

// 🔹 Definir esquema
const datoSchema = new mongoose.Schema({
  centro_de_formacion: String,
  nombre_aprendiz: String,
  nombre_instructor: String,
  programa_formacion: String,
  departamento_residencia: String,
  nivel_ingles: String,
  usuario_github: Boolean,
  fecha_inscripcion: Date
});

// 🔹 Crear modelo
const Dato = mongoose.model('Dato', datoSchema);

// 📌 POST /upload → Guardar en la BD
app.post('/upload', async (req, res) => {
  try {
    const data = req.body;
    await Dato.insertMany(data);
    res.status(200).json({ message: "Datos guardados en MongoDB correctamente" });
  } catch (error) {
    console.error("Error al guardar:", error);
    res.status(500).json({ message: "Error al guardar datos" });
  }
});

// 📌 GET /data → Consultar datos de la BD
app.get('/data', async (req, res) => {
  try {
    const data = await Dato.find();
    res.status(200).json({ message: "Datos recuperados correctamente", data });
  } catch (error) {
    console.error("Error al recuperar:", error);
    res.status(500).json({ message: "Error al recuperar datos" });
  }
});

// 🔹 Iniciar servidor (local)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
