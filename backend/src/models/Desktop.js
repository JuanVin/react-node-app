const { DataTypes } = require('sequelize');
const sequelize = require('../database/db')

const Desktop = sequelize.define('Desktop', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    model: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    brand: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sn: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    detail: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deviceNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    scopes: {
        async deleteDisk() {
            const disks = await Desktop.getDisks()
            if (disks) {
                for (let x of disks) {
                    await x.destroy()
                }
            }
        }
    }
})

module.exports = Desktop