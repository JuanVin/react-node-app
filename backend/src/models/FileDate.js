const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'),
    File = require('./File')

const FileDate = sequelize.define('FileDate', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    }

})

module.exports = FileDate