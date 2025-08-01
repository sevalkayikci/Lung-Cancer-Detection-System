import { DataTypes } from 'sequelize';
import sequelize from './index.js';


const Diagnosis = sequelize.define('Diagnosis', {
    diagnosis_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    confidence_score: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    diagnosis_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
   
    output_path: {
      type: DataTypes.TEXT,
      allowNull: true
    }

  }, {
    tableName: 'diagnosis',
    timestamps: false
  });
  
  export default Diagnosis;