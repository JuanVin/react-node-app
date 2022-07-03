const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const CellPhone = sequelize.define('CellPhone', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deviceNumber:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phoneBrand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneModel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    simcardNumber1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    simcardNumber2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    simcardCompany1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    simcardCompany2:{
        type: DataTypes.STRING,
        allowNull: true
    },
    imeiNumber1:{
        type: DataTypes.STRING,
        allowNull: true
    },
    imeiNumber2:{
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