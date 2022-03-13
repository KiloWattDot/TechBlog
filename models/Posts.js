const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Posts extends Model { }

Posts.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.INTEGER,
			references: {
			  model: 'user',
			  key: 'id',
			},
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'posts',
	}
);

module.exports = Posts;
