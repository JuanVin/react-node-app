const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const CellPhone = require('./CellPhone');
const Battery = sequelize.define('Battery', {
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

CellPhone.hasOne(Battery)
Battery.belongsTo(CellPhone)