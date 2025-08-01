import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const TreatmentType = sequelize.define('TreatmentType', {
  treatment_type_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  treatment_type_name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'treatment_type',
  timestamps: false
});

export default TreatmentType;
