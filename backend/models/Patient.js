import sequelize from './index.js'; //for connection to the database
import { DataTypes } from 'sequelize';
import Status from './Status.js'; //importing the Status model

const Patient = sequelize.define('Patient', {
  patient_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emergency_phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'status',        
      key: 'status_id'
    }
  }
}, {
  tableName: 'patient',
  schema: 'lung_cancer_detection_system',
  timestamps: false
});

Patient.belongsTo(Status, {
  foreignKey: 'status_id'
});

export default Patient;
