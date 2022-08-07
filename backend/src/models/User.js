const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const Files = require("./File")

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Files, {
    as: 'createdByUser',
    foreignKey: {
        name: 'createdBy',
        allowNull: true
    }
})
User.hasMany(Files, {
    as: 'updatedByUser',
    foreignKey: {
        name: 'updateBy',
        allowNull: true
    }
})

Files.belongsTo(User, {
    as: 'createdByUser',
    foreignKey: {
        name: 'createdBy',
        allowNull: true
    }
})

Files.belongsTo(User, {
    as: 'updatedByUser',
    foreignKey: {
        name: 'updateBy',
        allowNull: true
    }
})

module.exports = User