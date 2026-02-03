const { sequelize } = require('../config/db')
const { DataTypes } = require('sequelize')

const TaskTags = sequelize.define(
  'TaskTags',
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
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: 'TaskTags',
    timestamps: false,
  }
)

module.exports = { TaskTags }
