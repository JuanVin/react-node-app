const { DataTypes } = require('sequelize');
let sequelize = require('../database/db')
   

const noIndexFiles = sequelize.define('NoIndexFiles', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, 
    file_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    office: {
        type: DataTypes.STRING,
        allowNull: true
    },
    shift_granted: {
        type: DataTypes.STRING,
        allowNull: true
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: true
    },
    admission_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    egress_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    shift_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    technical: {
        type: DataTypes.STRING,
        allowNull: true
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    }

})

module.exports = noIndexFiles