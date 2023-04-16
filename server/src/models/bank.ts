import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface BankAttributes {
	id: string;
	name: string;
	email: string;
	password?: string;
	address?: string;
	zipCode?: Number;
	district?: string;
	bankScheme?: String;
	state?: string;
	phoneNumber?: Number;
	country?: string;
	website?: string;
	documentFile?: string;
	additionalContact1?: string;
	additionalContact2?: string;
	interest?: 'Investor Connect' | 'Mentorship' | 'Startup Connect';
	active: boolean;
	profileReady?: string;
	profilePic?: string;
	otp?: number | null;
	paid?: boolean;
	role?: string;
	industry?: string;
}

export class BankInstance extends Model<BankAttributes> {
	declare id: string;
	declare name: string;
	declare email: string;
	declare password: string;
	declare address: string;
	declare zipCode: Number;
	declare district: string;
	declare bankScheme: String;
	declare state: string;
	declare phoneNumber: Number;
	declare country: string;
	declare website: string;
	declare documentFile: string;
	declare additionalContact1: string;
	declare additionalContact2: string;
	declare interest: 'Investor Connect' | 'Mentorship' | 'Startup Connect';
	declare active: boolean;
	declare profileReady?: string;
	declare profilePic?: string;
	declare otp: number;
	declare paid?: boolean;
	declare role?: string;
	declare industry?: string;
}

BankInstance.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true
		},
		zipCode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		district: {
			type: DataTypes.STRING,
			allowNull: true
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true
		},
		bankScheme: {
			type: DataTypes.STRING(10000),
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
		interest: {
			type: DataTypes.STRING,
			allowNull: true
		},
		website: {
			type: DataTypes.STRING,
			allowNull: true
		},
		documentFile: {
			type: DataTypes.STRING,
			allowNull: true
		},

		additionalContact1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		additionalContact2: {
			type: DataTypes.STRING,
			allowNull: true
		},

		otp: {
			type: DataTypes.STRING,
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
		tableName: 'bank'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
