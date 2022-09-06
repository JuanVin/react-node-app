const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')
const Notebook = require("./Notebook")
const Desktop = require("./Desktop")

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

const Disk = sequelize.define('Disk', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    brand: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    model: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sn: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deviceType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    getDevice(options) {
        if (!this.deviceType) return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(this.deviceType)}`;
        return this[mixinMethodName](options);
    }
})

Notebook.hasMany(Disk, {
    foreignKey: 'deviceId',
    constraints: false,
    scope: {
        deviceType: 'notebook'
    }
})

Disk.belongsTo(Notebook, { foreignKey: 'deviceId', constraints: false })

Desktop.hasMany(Disk, {
    foreignKey: 'deviceId',
    constraints: false,
    scope: {
        deviceType: 'desktop'
    }
})

Disk.belongsTo(Desktop, { foreignKey: 'deviceId', constraints: false })

module.exports = Disk