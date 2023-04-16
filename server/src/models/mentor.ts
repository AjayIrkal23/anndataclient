import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface MentorAttributes {
	id: string;
	name: string;
	email: string;
	password: string;
	profileDetails?: string;
	fundingStage?: 'Low' | 'High';
	address?: string;
	zipCode?: Number;
	otp?: number | null;
	district?: string;
	workExp?: string;
	companyAssociated?: string;
	state?: string;
	phoneNumber?: Number;
	country?: string;
	website?: string;
	linkedIn?: string;
	interest?: 'POC Stage' | 'Early Traction' | 'Startup' | 'Scaling';
	active: boolean;
	profileReady?: string;
	profilePic?: string;
	aboutMe?: string;
	paid?: boolean;
	role?: string;
	industry?: string;
}

export class MentorInstance extends Model<MentorAttributes> {
	declare id: string;
	declare name: string;
	declare email: string;
	declare password: string;
	declare profileDetails: string;
	declare fundingStage: 'Low' | 'High';
	declare address: string;
	declare zipCode: Number;
	declare district: string;
	declare workExp: string;
	declare phoneNumber: Number;
	declare state: string;
	declare website: string;
	declare linkedIn: string;
	declare interest: 'POC Stage' | 'Early Traction' | 'Startup' | 'Scaling';
	declare country: string;
	declare companyAssociated: string;
	declare active: boolean;
	declare otp: number;
	declare profilePic?: string;
	declare profileReady?: string;
	declare aboutMe?: string;
	declare paid?: boolean;
	declare role?: string;
	declare industry?: string;
}

MentorInstance.init(
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
		fundingStage: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(10000),
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
		website: {
			type: DataTypes.STRING,
			allowNull: true
		},
		linkedIn: {
			type: DataTypes.STRING,
			allowNull: true
		},
		zipCode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		workExp: {
			type: DataTypes.STRING,
			allowNull: true
		},
		profileDetails: {
			type: DataTypes.STRING(10000),
			allowNull: true
		},
		companyAssociated: {
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
		interest: {
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
		aboutMe: {
			type: DataTypes.STRING(10000),
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
		tableName: 'Investor/Mentor/Vc'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
