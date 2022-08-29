const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const CellPhone = sequelize.define('CellPhone', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deviceNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    extraction: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})



module.exports = CellPhone