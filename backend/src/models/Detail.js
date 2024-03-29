const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const Detail = sequelize.define('Detail', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = Detail