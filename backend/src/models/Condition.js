const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'),
    File = require('./File')

const Condition = sequelize.define('Condition', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

Condition.hasMany(File);

module.exports = Condition