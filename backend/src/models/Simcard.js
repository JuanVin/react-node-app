const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const CellPhone = require('./CellPhone');
const Simcard = sequelize.define('Simcard', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true
    },
    number: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

CellPhone.hasMany(Simcard, { onDelete: 'cascade' })
Simcard.belongsTo(CellPhone)

module.exports = Simcard