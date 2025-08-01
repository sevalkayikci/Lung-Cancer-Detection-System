import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Medication = sequelize.define('Medication', {
  medication_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  medication_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  treatment_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'medication',
  timestamps: false
});

export default Medication;
