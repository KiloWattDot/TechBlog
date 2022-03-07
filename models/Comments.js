const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Comments extends Model {}

Comments.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		post_id: {
			type: DataTypes.INTEGER,
			references: {
			  model: 'posts',
			  key: 'id',
			},
		},
		username: {
            type: DataTypes.STRING,
            allowNull: false,

		},
		description: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: 'comments',
	}
);

module.exports = Comments;
