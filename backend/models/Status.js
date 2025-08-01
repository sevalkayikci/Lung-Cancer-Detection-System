import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Status = sequelize.define('Status', {
  status_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'status',
  timestamps: false
});


export default Status;
