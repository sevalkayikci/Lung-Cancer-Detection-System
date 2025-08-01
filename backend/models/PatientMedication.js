import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Medication from './Medication.js';
const PatientMedication = sequelize.define('PatientMedication', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  medication_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dosage: {
    type: DataTypes.TEXT
  },
  frequency: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'patient_medications',
  timestamps: false
});

PatientMedication.belongsTo(Medication, {
  foreignKey: 'medication_id'
});

export default PatientMedication;
