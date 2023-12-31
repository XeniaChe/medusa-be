const { DataSource } = require('typeorm');
const dotenv = require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/models/*.js'],
  migrations: ['dist/migrations/*.js'],
  cache: true,
  synchronize: true
});

module.exports = {
  datasource: AppDataSource
};
