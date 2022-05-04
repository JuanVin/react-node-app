const { Sequelize } = require('sequelize');

module.exports = sequelize = new Sequelize(
    process.env.DB_NAME,
    "root",
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    });