import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface TestValues {
	id: string;
	swayamRef?: string;
	affiliate?: string;
	cRef?: string;
	uRef?: string;
	state?: boolean;
	page?: string;
	age?: string;
	email?: string;
	physiology?: string;
	physiology_attribute?: string;
	physiology_nature?: string;
	testResp?: object;
	physiology_additional_info?: string;
}

export class TestInstance extends Model<TestValues> {
	declare id: string;
	declare affiliate: string;
	declare swayamRef: string;
	declare cRef: string;
	declare uRef: string;
	declare age: string;
	declare email: string;
	declare state: boolean;
	declare page: string;
	declare testResp?: object;
	declare physiology: string;
	declare physiology_attribute: string;
	declare physiology_nature: string;
	declare physiology_additional_info: string;
}

TestInstance.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		testResp: {
			type: DataTypes.JSONB,
			allowNull: false
		},
		affiliate: {
			type: DataTypes.STRING,
			allowNull: true
		},
		swayamRef: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: true
		},

		cRef: {
			type: DataTypes.STRING,
			allowNull: true
		},

		uRef: {
			type: DataTypes.STRING,
			allowNull: true
		},

		age: {
			type: DataTypes.STRING,
			allowNull: true
		},
		state: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},

		page: {
			type: DataTypes.STRING,
			allowNull: true
		},
		physiology: {
			type: DataTypes.STRING,
			allowNull: true
		},

		physiology_attribute: {
			type: DataTypes.STRING,
			allowNull: true
		},
		physiology_nature: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},

		physiology_additional_info: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize: config.db,
		tableName: 'Tests'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
