import {DataTypes} from 'sequelize';
import Sequelize from './index.js'; //for connection to the database

const User = Sequelize.define(
    "User", //table name for doctors or admin user_table
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        schema: process.env.DB_SCHEMA, //database name in .env
        tableName: 'user_table', //real table name in the database
        timestamps : false,
    
    }
);

export default User;