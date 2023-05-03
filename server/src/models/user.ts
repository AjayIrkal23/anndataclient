import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface AllUserAttributes {
	id: string;
	email?: string;
	type: string;
	last?: string;
	Time?: string;
	day1?: string;
	day2?: string;
	day3?: string;

	ready?: boolean;
	Time1?: string;
	Time2?: string;
	Time3?: string;
}

export class AllUserInstance extends Model<AllUserAttributes> {
	declare id: string;
	declare email: string;
	declare type: string;
	declare last: string;
	declare Time1?: string;
	declare Time2?: string;
	declare Time3?: string;
	declare day1: string;
	declare day2: string;
	declare day3: string;
	declare ready: boolean;
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
		},
		day1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		day2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		day3: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Time1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Time2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		Time3: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ready: {
			type: DataTypes.BOOLEAN,
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
