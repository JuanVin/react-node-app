const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const File = require('./File')
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

FileType.hasMany(File)
File.belongsTo(FileType)

module.exports = FileType