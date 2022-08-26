const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const Desktop = sequelize.define('Desktop', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    model: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    brand: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sn: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = Desktop