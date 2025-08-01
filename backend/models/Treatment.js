import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import TreatmentType from './TreatmentType.js';

const Treatment = sequelize.define('Treatment', {
  treatment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  treatment_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  end_date: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'treatment',
  freezeTableName: true,
  timestamps: false
});


Treatment.belongsTo(TreatmentType, {
  foreignKey: 'treatment_type_id'
});



export default Treatment;
