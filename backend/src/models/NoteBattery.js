const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const Notebook = require("./Notebook")
const NoteBattery = sequelize.define('NoteBattery', {
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
})

Notebook.hasMany(NoteBattery)
NoteBattery.belongsTo(Notebook)

module.exports = NoteBattery