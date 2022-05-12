const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const FileType = sequelize.define('FileType', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
})

module.exports = FileType