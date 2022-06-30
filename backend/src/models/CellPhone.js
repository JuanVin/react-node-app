const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const CellPhone = sequelize.define('CellPhone', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    deviceNumber:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cellBrand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cellModel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    simcard:{
        type: DataTypes.STRING,
        allowNull: true
    },
    simcard1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    company:{
        type: DataTypes.STRING,
        allowNull: true
    },
    company1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    imei:{
        type: DataTypes.STRING,
        allowNull: true
    },
    imei1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    batteryBrand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    batteryModel:{
        type: DataTypes.STRING,
        allowNull: true
    },
    detail:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    extraction:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    microsdType:{
        type: DataTypes.STRING,
        allowNull: true
    },
    microsdCapacity:{
        type: DataTypes.STRING,
        allowNull: true
    },
})



module.exports = CellPhone