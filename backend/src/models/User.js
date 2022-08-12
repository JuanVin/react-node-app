const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const Files = require("./File")
const Technician = require("./Technician")
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})


User.hasMany(Files,{
    as: "technician",
    foreignKey: {
        name: 'userId',
        allowNull: true
    }
})
Files.belongsTo(User,{
    as: "technician",
    foreignKey: {
        name: 'userId',
        allowNull: true
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

User.hasOne(Technician)
Technician.belongsTo(User)

module.exports = User