const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'),
    FiscalUnit = require('./FiscalUnit')

const District = sequelize.define('District', {

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

District.hasMany(FiscalUnit);
FiscalUnit.belongsTo(District)

module.exports = District