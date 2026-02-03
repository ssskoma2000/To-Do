const { sequelize } = require('../config/db')
const { DataTypes } = require('sequelize')

const SubTask = sequelize.define(
    'SubTask', 
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
    },
    {
        tableName: 'subtask',
        timestamps: true,
    },
)

module.exports = { SubTask }