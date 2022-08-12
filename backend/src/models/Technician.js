const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'),
    File = require('./File')

const Technician = sequelize.define('Technician', {
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
/*
Technician.hasMany(File)
File.belongsTo(Technician)
*/
module.exports = Technician