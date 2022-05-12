const { DataTypes } = require('sequelize');
let sequelize = require('../database/db'),
    Detail = require('./Detail'),
    Dates = require('./FileDate')

const Files = sequelize.define('File', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    file_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shift_granted: {
        type: DataTypes.STRING,
        allowNull: true
    }
})
Files.belongsTo(Dates)
Dates.hasOne(Files)

Files.hasMany(Detail)


module.exports = Files