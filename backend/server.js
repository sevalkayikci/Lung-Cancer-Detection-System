import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import sequelize from "./models/index.js"; // sequelize for postgresql

import userRoutes from "./routes/userRoutes.js"; // user routes
import loginRoutes from './routes/loginRoutes.js'; // login routes
import patientRoutes from './routes/patientRoutes.js'; // patient routes
import diagnosisRoutes from './routes/diagnosisRoutes.js'; // diagnosis routes
import medicationRoutes from './routes/medicationRoutes.js'; // medication routes
import patientMedicationRoutes from './routes/patientMedicationRoutes.js'; // patient medication routes
import treatmentRoutes from './routes/treatmentRoutes.js'; // treatment routes
import patientNote from './routes/patientNoteRoutes.js'; // patient note routes
import treatmentTypeRoutes from "./routes/treatmentTypeRoutes.js"; // treatment type routes
import noteRoutes from './routes/noteRoutes.js'; // note routes
import patientInfoRoutes from './routes/patientInfoRoutes.js'; // patient info routes
import statusRoutes from './routes/statusRoutes.js';
import symptomRoutes from './routes/symptomRoutes.js';

dotenv.config();

console.log("server.js started");


const app = express(); 
//first middleware
app.use(cors());
app.use(express.json());

app.use('/lungscans', express.static(path.join(process.env.HOME, 'Desktop', 'LungScans')));
//then route
app.use('/api/login', loginRoutes);
app.use("/api/admin", userRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/medications", medicationRoutes);
app.use('/api/patient', patientMedicationRoutes);
app.use('/api/patient', treatmentRoutes);
app.use('/api/patient-note', patientNote);
app.use('/api/treatment-types', treatmentTypeRoutes);
app.use('/api/notes', noteRoutes); 
app.use('/api/patient', patientInfoRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/symptoms', symptomRoutes);

// postgresql connectio check
sequelize.authenticate()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB Connection Error:", err));

  //testing route
app.get("/", (req, res) => {
  res.send("api working...");
});


const PORT = process.env.PORT || 8080; // couldnt use the 5000 port so i changed to 8080 on .env
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
