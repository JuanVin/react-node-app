const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const CellPhone = require('./CellPhone');
const Battery = sequelize.define('Battery', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

CellPhone.hasMany(Battery, { onDelete: 'cascade' })
Battery.belongsTo(CellPhone)

module.exports = Battery