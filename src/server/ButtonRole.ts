import { DataTypes, Model, Sequelize } from "sequelize";

export default class ButtonRole extends Model {}

export function initButtonRoleModel( sequelize: Sequelize ) {

    ButtonRole.init( {
        type: {
            type: DataTypes.STRING( 10 ),
            primaryKey: true
        },
        messageid: {
            type: DataTypes.STRING( 19 ),
            primaryKey: true
        },
        customid: {
            type: DataTypes.STRING( 100 ),
            primaryKey: true
        },
        roleid: {
            type: DataTypes.STRING( 19 ),
            allowNull: false
        },
    }, { sequelize, tableName: 'buttonroles' } );

}