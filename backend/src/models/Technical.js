const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'),
    File = require('./File')
const Technical = sequelize.define('Technical', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

Technical.hasMany(File)

module.exports = Technical