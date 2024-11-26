import { Sequelize } from "sequelize";
import User, { initUserModel } from "./User";
import Guild, { initGuildModel } from "./Guild";
import Trigger, { initTriggerModel } from "./Trigger";
import ReactionRole, { initReactionRoleModel } from "./ReactionRole";
import { initGuildUserModel } from "./GuildUser";
import ButtonRole, { initButtonRoleModel } from "./ButtonRole";

export default class Database {

    sequelize: Sequelize;

    constructor( username: string, password: string, dbName: string ) {

        this.sequelize = new Sequelize( dbName, username, password, {
            dialect: 'oracle',
            host: 'localhost',
            logging: false,
            quoteIdentifiers: false,
            define: {
                timestamps: false,
                freezeTableName: true
            },
        } );

    }

    async Connect() {

        try {

            await this.sequelize.authenticate();
            console.log( 'Database connection has been established successfully.' );

        } catch ( error ) {

            console.error( 'Unable to connect to the database', error );
            throw error;

        }

    }

    InitTables() {

        initUserModel( this.sequelize );
        initGuildModel( this.sequelize );
        initTriggerModel( this.sequelize );
        initReactionRoleModel( this.sequelize );
        initGuildUserModel( this.sequelize );
        initButtonRoleModel( this.sequelize );
        Guild.belongsToMany( User, { through: 'guildusers', foreignKey: { name: `guildid`, allowNull: false }, as: 'guild_users' } );
        User.belongsToMany( Guild, { through: 'guildusers', foreignKey: { name: `userid`, allowNull: false }, as: 'user_guilds' } );
        Guild.hasMany( Trigger, { foreignKey: { name: 'guildid' } } );
        User.hasMany( Trigger, { foreignKey: { name: 'triggerbyuser' } } );
        User.hasMany( Guild, { foreignKey: { name: `owner`, allowNull: false } } );
        Guild.hasMany( ReactionRole, { foreignKey: { name: `guildid`, allowNull: false } } );
        Guild.hasMany( ButtonRole, { foreignKey: { name: `guildid`, allowNull: false } } );

    }

    async SyncTables() {

        await this.sequelize.sync();

    }

}