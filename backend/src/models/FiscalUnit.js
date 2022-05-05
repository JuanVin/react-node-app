const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'),
    File = require('./File')
const FiscalUnit = sequelize.define('FiscalUnit', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    condition: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
})

FiscalUnit.hasMany(File)
File.belongsTo(FiscalUnit)

module.exports = FiscalUnit