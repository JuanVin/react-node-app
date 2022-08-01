const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const User = require('./User')
const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
})

Role.belongsToMany(User, {
    through: "User_Roles"
})
User.belongsToMany(Role, {
    through: "User_Roles"
});

module.exports = Role