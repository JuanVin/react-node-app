const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'),
    File = require('./File')
const FiscalOffice = sequelize.define('FiscalOffice', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

FiscalOffice.hasMany(File)
File.belongsTo(FiscalOffice)

module.exports = FiscalOffice