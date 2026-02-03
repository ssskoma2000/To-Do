const { sequelize } = require('../config/db')
const { DataTypes } = require('sequelize')

const Tag = sequelize.define(
    'Tag', 
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tasks: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    }, 
    {
        tableName: 'tag',
        timestamps: true,
    },
)

module.exports = { Tag }