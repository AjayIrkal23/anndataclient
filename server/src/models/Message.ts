import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface MessageAttributes {
	id: string;
	conversationId: string;
	receiverId: string;
	senderId: string;
	text: string;
	type: string;
}

export class MessageInstance extends Model<MessageAttributes> {
	declare id: string;
	declare conversationId: string;
	declare receiverId: string;
	declare senderId: string;
	declare text: string;
	declare type: string;
}

MessageInstance.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false
		},
		conversationId: {
			type: DataTypes.STRING,
			allowNull: false
		},

		receiverId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		senderId: {
			type: DataTypes.STRING,
			allowNull: false
		},

		text: {
			type: DataTypes.STRING,
			allowNull: true
		},

		type: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: config.db,
		tableName: 'messages'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
