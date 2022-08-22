const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const CellPhone = require('./CellPhone');
const Microsd = sequelize.define('Microsd', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

CellPhone.hasOne(Microsd)
Microsd.belongsTo(CellPhone)