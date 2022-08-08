const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const CellPhone = require("./CellPhone");
const Extraction = sequelize.define('Extraction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numberOfDevices: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
})

Extraction.hasMany(CellPhone)
CellPhone.belongsTo(Extraction)


module.exports = Extraction