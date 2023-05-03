import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface ConversationAttributes {
	id: string;
	members: Array<any>;
	messages?: string;
	Setype: string;
	ReType: string;
	meetingTime?: string;
	meetingLink?: string;
	meetingDate?: string;
	finished?: boolean;
	startingLink?: string;
}

export class ConversationInstance extends Model<ConversationAttributes> {
	declare id: string;
	declare members: Array<any>;
	declare Setype: string;
	declare ReType: string;
	declare messages?: string;
	declare meetingTime: string;
	declare startingLink?: string;
	declare meetingLink: string;
	declare meetingDate?: string;
	declare finished: boolean;
}

ConversationInstance.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		members: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false
		},
		ReType: {
			type: DataTypes.STRING,
			allowNull: false
		},
		Setype: {
			type: DataTypes.STRING,
			allowNull: false
		},

		meetingTime: {
			type: DataTypes.STRING,
			allowNull: true
		},
		meetingLink: {
			type: DataTypes.STRING,
			allowNull: true
		},
		meetingDate: {
			type: DataTypes.STRING,
			allowNull: true
		},
		finished: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		startingLink: {
			type: DataTypes.STRING,
			allowNull: true
		},
		messages: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize: config.db,
		tableName: 'conversation'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
