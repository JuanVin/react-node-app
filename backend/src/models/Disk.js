const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const Notebook = require("./Notebook")
const Desktop = require("./Desktop")
const Disk = sequelize.define('Disk', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    brand: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    model: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sn: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
})

Notebook.hasMany(Disk)
Disk.belongsTo(Notebook)

Desktop.hasMany(Disk)
Disk.belongsTo(Desktop)

module.exports = Disk