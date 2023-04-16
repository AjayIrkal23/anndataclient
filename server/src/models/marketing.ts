import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface MarketingAttributes {
	id: string;
	name: string;
	email: string;
	usertype?: 'Marketing' | 'Social Media';
	password: string;
	address?: string;
	zipCode?: Number;
	district?: string;
	servicesOffered?: String;
	state?: string;
	phoneNumber?: Number;
	country?: string;
	website?: string;
	imagesVideos?: string;
	previousWork?: string;
	otp?: number | null;
	active: boolean;
	profileReady?: string;
	profilePic?: string;
	paid?: boolean;
	role?: string;
	industry?: string;
}

export class MarketingInstance extends Model<MarketingAttributes> {
	declare id: string;
	declare name: string;
	declare email: string;
	declare usertype: 'Marketing' | 'Social Media';
	declare password: string;
	declare address: string;
	declare zipCode: Number;
	declare district: string;
	declare servicesOffered: String;
	declare state: string;
	declare phoneNumber: Number;
	declare country: string;
	declare website: string;
	declare active: boolean;
	declare previousWork: string;
	declare profileReady?: string;
	declare otp: number;
	declare profilePic?: string;
	declare paid?: boolean;
	declare role?: string;
	declare industry?: string;
}

MarketingInstance.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		otp: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		usertype: {
			type: DataTypes.STRING,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		district: {
			type: DataTypes.STRING,
			allowNull: true
		},
		servicesOffered: {
			type: DataTypes.STRING,
			allowNull: true
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true
		},
		website: {
			type: DataTypes.STRING,
			allowNull: true
		},

		zipCode: {
			type: DataTypes.STRING,
			allowNull: true
		},

		imagesVideos: {
			type: DataTypes.STRING,
			allowNull: true
		},
		previousWork: {
			type: DataTypes.STRING(10000),
			allowNull: true
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		profileReady: {
			type: DataTypes.STRING,
			allowNull: true
		},
		profilePic: {
			type: DataTypes.STRING,
			allowNull: true
		},
		paid: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		role: {
			type: DataTypes.STRING,
			allowNull: true
		},
		industry: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize: config.db,
		tableName: 'marketing'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
