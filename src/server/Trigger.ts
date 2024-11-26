import { DataTypes, Model, Sequelize } from "sequelize";

export default class Trigger extends Model {}

export function initTriggerModel( sequelize: Sequelize ) {

    Trigger.init( {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        response: {
            type: DataTypes.STRING( 2000 ),
            allowNull: false
        },
        chance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        type: {
            type: DataTypes.STRING( 20 ),
            allowNull: false,
            defaultValue: `Normal`
        },
        triggerbyuser: DataTypes.STRING( 19 ),
        channelid: DataTypes.STRING( 19 )
    }, { 
        sequelize,
        tableName: 'triggers' 
    } );

}