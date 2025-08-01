// models/SymptomRecord.js
import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const SymptomRecord = sequelize.define('SymptomRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  symptoms: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'symptom_records',
  timestamps: false
});

export default SymptomRecord;
