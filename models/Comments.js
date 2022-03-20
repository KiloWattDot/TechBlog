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
		which: {
			type: DataTypes.INTEGER,
			references: {
			  model: 'posts',
			  key: 'id',
			},
		},
		user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
			references: {
				model: 'user',
				key: 'id',
			  }
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
