const { Sequelize } = require('sequelize')
const { config } = require('dotenv')
config()

const sequelize = new Sequelize(
	process.env.db_name,
	process.env.db_username,
	process.env.db_password,
	{
		host: process.env.db_host,
		dialect: 'postgres',
		logging: false,
	},
)

module.exports = {sequelize}
