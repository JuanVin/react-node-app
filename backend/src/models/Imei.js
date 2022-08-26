const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const CellPhone = require('./CellPhone');
const Imei = sequelize.define('Imei', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

CellPhone.hasMany(Imei, { onDelete: 'cascade' })
Imei.belongsTo(CellPhone)

module.exports = Imei