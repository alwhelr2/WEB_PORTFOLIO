import { DataTypes, Model, Sequelize } from "sequelize";

export default class GuildUser extends Model {}

export function initGuildUserModel( sequelize: Sequelize ) {

    GuildUser.init( {
        birthdayreminder: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, { 
        sequelize, 
        tableName: 'guildusers',
        modelName: 'guildusers',
    } );

}