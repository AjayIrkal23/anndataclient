import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface AllUserAttributes {
	id: string;
	email?: string;
	type: string;
	last?: string;
}

export class AllUserInstance extends Model<AllUserAttributes> {
	declare id: string;
	declare email: string;
	declare type: string;
	declare last: string;
}

AllUserInstance.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true
		},
		last: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize: config.db,
		tableName: 'User'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
