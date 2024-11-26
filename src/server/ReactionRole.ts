import { DataTypes, Model, Sequelize } from "sequelize";

export default class ReactionRole extends Model {}

export function initReactionRoleModel( sequelize: Sequelize ) {

    ReactionRole.init( {
        emojiid: {
            type: DataTypes.STRING( 19 ),
            primaryKey: true
        },
        roleid: {
            type: DataTypes.STRING( 19 ),
            allowNull: false
        },
        messageid: {
            type: DataTypes.STRING( 19 ),
            primaryKey: true
        },
        uniquereact: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, { 
        sequelize,
        tableName: 'reactionroles' 
    } );

}