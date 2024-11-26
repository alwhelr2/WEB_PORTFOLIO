import { DataTypes, Model, Sequelize } from "sequelize";

export default class Guild extends Model {}

export function initGuildModel ( sequelize: Sequelize ) {

    Guild.init( {
        id: {
            type: DataTypes.STRING( 19 ),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING( 100 ),
            allowNull: false
        },
        themecolor: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0x0750aa
        },
        commandalias: {
            type: DataTypes.STRING( 1 ),
            allowNull: false,
            defaultValue: '!',
        },
        joinleavelogchannel: DataTypes.STRING( 19 ),
        messagelogchannel: DataTypes.STRING( 19 ),
        iconURL: DataTypes.TEXT,
        joinrole: DataTypes.STRING( 19 ),
        birthdaychannel: DataTypes.STRING( 19 ),
        starboardchannel: DataTypes.STRING( 19 ),
        starboardlimit: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        starboardenabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        starboardselfstar: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'guilds'
    } );

}