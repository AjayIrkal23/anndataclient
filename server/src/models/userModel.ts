import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface UsersAttributes {
	id: string;
	otp?: number | null;
	name: string;
	email: string;
	userType?: 'Farmer' | 'Student' | 'Startup' | 'Fresher';
	password?: string;
	stage?: 'Ideation' | 'Proof of Concept' | 'Early Traction' | 'Scaling';
	dob?: string;
	address?: string;
	zipCode?: Number;
	district?: string;
	taluk?: string;
	phoneNumber?: Number;
	state?: string;
	website?: string;
	linkedIn?: string;
	funded?: string;
	farmingType?: string;
	collabration?: string;
	addInfo?: string;
	interest?: 'Bank' | 'Mentorship' | 'Startup' | 'Marketing' | 'Social Media';
	companyLogo?: string;
	usp?: string;
	pitchDeckFile?: string;
	knowledgeFarming?: string;
	learningAbout?: string;
	active?: boolean;
	profileReady?: string;
	profilePic?: string;
	aboutMe?: string;
	paid?: boolean;
	role?: string;
	industry?: string;
}

export class UsersInstance extends Model<UsersAttributes> {
	declare id: string;
	declare name: string;
	declare otp: number;
	declare email: string;
	declare userType: 'Farmer' | 'Student' | 'Startup' | 'Fresher';
	declare password: string;
	declare stage: 'Ideation' | 'Proof of Concept' | 'Early Traction' | 'Scaling';
	declare dob: string;
	declare address: string;
	declare zipCode: Number;
	declare district: string;
	declare taluk: string;
	declare phoneNumber: Number;
	declare state: string;
	declare website: string;
	declare linkedIn: string;
	declare funded?: string;
	declare farmingType: string;
	declare collabration?: string;
	declare addInfo: string;
	declare interest: 'Bank' | 'Mentorship' | 'Startup' | 'Marketing' | 'Social Media';
	declare companyLogo: string;
	declare usp: string;
	declare pitchDeckFile: string;
	declare knowledgeFarming: string;
	declare learningAbout: string;
	declare active: boolean;
	declare profilePic?: string;
	declare profileReady?: string;
	declare aboutMe: string;
	declare paid?: boolean;
	declare role?: string;
	declare industry?: string;
}

UsersInstance.init(
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
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		userType: {
			type: DataTypes.STRING,
			allowNull: true
		},

		password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		stage: {
			type: DataTypes.STRING,
			allowNull: true
		},
		dob: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(10000),
			allowNull: true
		},

		taluk: {
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
		funded: {
			type: DataTypes.STRING,
			allowNull: true
		},

		farmingType: {
			type: DataTypes.STRING,
			allowNull: true
		},
		collabration: {
			type: DataTypes.STRING,
			allowNull: true
		},
		interest: {
			type: DataTypes.STRING,
			allowNull: true
		},
		usp: {
			type: DataTypes.STRING,
			allowNull: true
		},
		addInfo: {
			type: DataTypes.STRING(10000),
			allowNull: true
		},
		district: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		knowledgeFarming: {
			type: DataTypes.STRING,
			allowNull: true
		},
		learningAbout: {
			type: DataTypes.STRING,
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
		tableName: 'Member'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
