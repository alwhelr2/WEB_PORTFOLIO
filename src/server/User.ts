import { DataTypes, Model, Sequelize } from "sequelize";

export default class User extends Model {}

export function initUserModel ( sequelize: Sequelize ) {

    User.init( {
        id: {
            type: DataTypes.STRING( 19 ),
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING( 32 ),
            allowNull: false
        },
        avatar: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        bot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        banner: DataTypes.TEXT,
        mybot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdTimestamp: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        birthdaymonth: DataTypes.STRING( 9 ),
        birthdaydate: DataTypes.INTEGER,
        birthdayreminder: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        status: DataTypes.STRING( 128 )
    }, {
        sequelize,
        tableName: 'users'
    } );

}