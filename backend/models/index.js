//connection to the database
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();  //import .env

const sequelize = new Sequelize(
  process.env.DB_NAME, //database name
  process.env.DB_USER, //database user
  process.env.DB_PASS, //database password
  {
    host: process.env.DB_HOST, //database host
    dialect: "postgres", //database
    port: process.env.DB_PORT, //database port
    schema: process.env.DB_SCHEMA, //database schema
  }
);

export default sequelize;
