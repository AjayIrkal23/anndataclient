import { DataTypes, Model, Optional } from 'sequelize';
import { config } from '../config/config';

interface AdminAttributes {
	id: string;
	name: string;

	password: string;
}

export class AdminInstance extends Model<AdminAttributes> {
	declare id: string;
	declare name: string;

	declare password: string;
}

AdminInstance.init(
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

		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize: config.db,
		tableName: 'superAdmin'
	}
);

// UsersInstance.hasMany(PositionsInstance, { onDelete: 'cascade' });
// ProfileInstance.belongsTo(UsersInstance, { foreignKey: 'UsersInstanceId' });
// PositionsInstance.hasMany(ScriptsInstance, { onDelete: 'cascade' });
// ScriptsInstance.belongsTo(PositionsInstance, { foreignKey: 'PositionsInstanceId' });
