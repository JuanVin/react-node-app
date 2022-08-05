const { DataTypes, ExclusionConstraintError } = require('sequelize');
let sequelize = require('../database/db'),
    Detail = require('./Detail'),
    Dates = require('./FileDate'),
    Extraction = require('./Extraction'),
    User = require("./User")

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
    CreatedBy:{
        type: DataTypes.STRING,
        allowNull: true
    },
    ModifiedBy:{
        type: DataTypes.STRING,
        allowNull: true
    },
    shift_granted: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Files.belongsTo(Dates)
Dates.hasOne(Files)
Files.hasMany(Detail)

Files.hasOne(Extraction)
Extraction.belongsTo(Files)


module.exports = Files