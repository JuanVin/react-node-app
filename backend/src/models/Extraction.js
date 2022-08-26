const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const CellPhone = require("./CellPhone");
const Notebook = require("./Notebook")
const Desktop = require("./Desktop")
const Extraction = sequelize.define('Extraction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numberOfDevices: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

Extraction.hasMany(CellPhone)
CellPhone.belongsTo(Extraction)

Extraction.hasMany(Notebook)
Notebook.belongsTo(Extraction)

Extraction.hasMany(Desktop)
Desktop.belongsTo(Extraction)

module.exports = Extraction
