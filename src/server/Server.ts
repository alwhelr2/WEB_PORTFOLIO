import express, { Request } from 'express';
import * as path from 'path';
import { readFileSync } from 'fs';
import { createServer } from 'node:http';
import { createServer as createHTTPSServer } from 'node:https';
import { config } from 'dotenv';
import Database from './Database';
import Guild from './Guild';
import User from './User';
import Trigger from './Trigger';
import ReactionRole from './ReactionRole';
import ButtonRole from './ButtonRole';
import GuildUser from './GuildUser';
import axios from 'axios';
import { IButtonRole, IChannel, IGuild, IGuildUser, IReactionRole, IRole, ITrigger, IUser } from './types';
import cors from 'cors';
config( { path: '../../data/.env' } );

const DIST_DIR = path.join( __dirname, '../../../dist' );
const PORT = 443;
const HTTP_PORT = 80;
const app = express();
const db = new Database( process.env.DB_USERNAME as string, process.env.DB_PASSWORD as string, process.env.DB_NAME as string );
const discordAxios = axios.create( {
    baseURL: `https://discord.com/api/v6`, headers: {
        Authorization: `Bot ${ process.env.BOT_TOKEN }`
    }
} );

const SetupGuildRoutes = () => {

    // #region Get requests
    app.get( '/guilds', ( req, res ) => {

        Guild.findAll().then( ( guilds ) => {

            res.status( 200 ).json( guilds );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching guilds: ${ error }!` );

        } );

    } );

    app.get( '/guild/:id', ( req, res ) => {

        Guild.findByPk( req.params.id, {
            include: [ { model: User, as: 'guild_users' } ]
        } ).then( ( guild ) => {

            if ( guild )
                res.status( 200 ).json( guild );
            else
                res.status( 404 ).send( 'Guild not found!' );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching guild: ${ error }!` );

        } );

    } );

    app.get( '/guild/:id/users', ( req, res ) => {

        Guild.findByPk( req.params.id, {

            include: [ { model: User, as: 'guild_users' } ]

        } ).then( ( guild ) => {

            if ( guild )
                res.status( 200 ).json( guild.get( 'guild_users' ) );
            else
                res.status( 404 ).send( 'Guild users not found!' );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching guild users: ${ error }!` );

        } );

    } );

    app.get( '/guild/:id/triggers', ( req, res ) => {

        Guild.findByPk( req.params.id, {

            include: [ Trigger ]

        } ).then( ( guild ) => {

            if ( guild )
                res.status( 200 ).json( guild.get( 'Triggers' ) );
            else
                res.status( 404 ).send( 'Guild triggers not found!' );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching guild triggers: ${ error }!` );

        } );

    } );

    app.get( '/guild/:id/reactionrole/message/:messageid/emoji/:emojiid', ( req, res ) => {

        ReactionRole.findOne( {
            where: {
                guildid: req.params.id,
                messageid: req.params.messageid,
                emojiid: req.params.emojiid
            }
        } ).then( ( reactionrole ) => {

            if ( reactionrole )
                res.status( 200 ).json( reactionrole.get() );
            else
                res.status( 404 ).send( 'Reaction role not found!' );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching reaction role: ${ error }!` );

        } );

    } );

    app.get( '/guild/:id/buttonrole/message/:messageid/customid/:customid', ( req, res ) => {

        ButtonRole.findAll( {
            where: {
                customid: req.params.customid,
                guildid: req.params.id,
                messageid: req.params.messageid
            }
        } ).then( ( buttonroles ) => {

            if ( buttonroles )
                res.status( 200 ).json( buttonroles );
            else
                res.status( 404 ).send( 'Button roles not found!' );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching button roles: ${ error }!` );

        } );

    } );

    app.get( `/guild/:id/channels`, ( req, res ) => {

        discordAxios.get< IChannel[] >( `/guilds/${ req.params.id }/channels` ).then( ( { data: channels } ) => {

            // console.log( `channels`, channels );
            res.status( 200 ).json( channels.filter( ( channel ) => channel.type === 0 ).map( ( channel ) => {
                return {
                    id: channel.id,
                    name: channel.name
                };
            } ) );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching guild channels: ${ error }!` );

        } );

    } );

    app.get( `/guild/:id/roles`, ( req, res ) => {

        discordAxios.get< IRole[] >( `/guilds/${ req.params.id }/roles` ).then( ( { data: roles } ) => {

            res.status( 200 ).json( roles.map( ( role ) => {
                return {
                    id: role.id,
                    name: role.name
                };
            } ) );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching guild roles: ${ error }!` );

        } );

    } );
    // #endregion
    // #region Post requests
    app.post( '/guilds', ( req: Request< object, object, IGuild >, res ) => {

        Guild.findOrCreate( {
            where: {
                id: req.body.id
            },
            defaults: {
                ...req.body
            }
        } ).then( ( [ guild, created ] ) => {

            if ( created ) 
                res.status( 200 ).json( guild );
            else {

                Guild.update( { 
                    ...req.body 
                }, {
                    where: {
                        id: req.body.id
                    }
                } ).then( () => {

                    Guild.findByPk( req.body.id ).then( ( updatedGuild ) => {

                        res.status( 200 ).json( updatedGuild! );

                    } ).catch( ( error ) => {

                        console.log( `Error fetching updated guild: ${ error }!` );

                    } );

                } ).catch( ( error ) => {

                    console.log( `Error updating guild: ${ error }!` );

                } );

            }

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error creating guild: ${ error }!` } );

        } );

    } );

    app.post( '/guild/:id/user', ( req: Request< IGuild, object, IUser[] >, res ) => {

        const id = req.params.id;
        const guildUsers: GuildUser[] = [];
        const alreadyExists: GuildUser[] = [];

        void ( async () => {

            for ( const user of req.body ) {

                const guildUser = {
                    userid: user.id,
                    guildid: id
                }

                const dbGuildUser = await GuildUser.findOne( {
                    where: {
                        guildid: guildUser.guildid,
                        userid: guildUser.userid
                    }
                } );

                if ( !dbGuildUser ) {

                    const newGuildUser = await GuildUser.create( guildUser );
                    guildUsers.push( newGuildUser );

                } else {

                    alreadyExists.push( dbGuildUser );

                }

            }
            res.status( 200 ).json( { addedUsers: guildUsers, alreadyExistingUsers: alreadyExists } );

        } )();

    } );

    app.post( '/guild/:id/reactionrole', ( req: Request< IGuild, object, IReactionRole >, res ) => {

        ReactionRole.findOrCreate( {
            where: {
                emojiid: req.body.emojiid,
                guildid: req.body.guildid,
                messageid: req.body.messageid
            },
            defaults: {
                ...req.body
            }
        } ).then( ( [ reactionrole, created ] ) => {

            if ( created ) res.status( 200 ).json( reactionrole );
            else res.status( 303 ).send( { error: 'Specified reactionrole already exists!' } );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error creating reactionrole: ${ error }!` } );

        } );

    } );

    app.post( '/guild/:id/buttonrole', ( req: Request< IGuild, object, IButtonRole >, res ) => {

        ButtonRole.findOrCreate( {
            where: {
                customid: req.body.customid,
                guildid: req.body.guildid,
                messageid: req.body.messageid,
                type: req.body.type
            },
            defaults: {
                ...req.body
            }
        } ).then( ( [ buttonrole, created ] ) => {

            if ( created ) res.status( 200 ).json( buttonrole );
            else res.status( 303 ).send( { error: 'Specified buttonrole already exists!' } );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error creating buttonrole: ${ error }!` } );

        } );

    } );
    // #endregion
    // #region Patch requests
    app.patch( '/guild/:id', ( req: Request< IGuild, object, IGuild >, res ) => {

        const id = req.params.id;
        Guild.update( {
            ...req.body
        }, {
            where: {
                id: id
            }
        } ).then( ( [ count ] ) => {

            if ( count > 0 ) {

                Guild.findByPk( id ).then( ( updatedGuild ) => {

                    res.status( 200 ).json( updatedGuild! );

                } ).catch( ( error ) => {

                    res.status( 404 ).send( { error: `Specified guild not found!` } );

                } );

            } else {

                res.status( 404 ).send( { error: 'Specified guild not found!' } );

            }

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error updating guild: ${ error }!` } );

        } );

    } );
    // #endregion
    // #region Delete requests
    app.delete( '/guild/:guildid/user/:userid', ( req: Request< IGuildUser, object, object >, res ) => {

        const userid = req.params.userid;
        const guildid = req.params.guildid;

        GuildUser.destroy( {
            where: {
                userid: userid,
                guildid: guildid
            }
        } ).then( ( count ) => {

            if ( count > 0 )
                res.status( 200 ).send( { guildid: guildid, userid: userid } );
            else
                res.status( 404 ).send( { error: `Error deleting guild user: ${ guildid }!` } );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error deleting guild user: ${ error }!` } );

        } );

    } );
    // #endregion

};

const SetupUserRoutes = () => {

    // #region Get requests
    app.get( '/users', ( req, res ) => {

        User.findAll().then( ( users ) => {

            res.status( 200 ).json( users );

        } ).catch( ( error ) => {

            res.status( 404 ).send( `Error fetching users: ${ error }!` );

        } );

    } );

    app.get( '/user/:id', ( req, res ) => {

        User.findByPk( req.params.id, {
            include: [ { model: Guild, as: 'user_guilds' } ]
        } ).then( ( user ) => {

            if ( user )
                res.status( 200 ).json( user );
            else
                res.status( 404 ).send( 'User not found!' );

        } ).catch( ( error ) => {

            res.status( 404 ).send( `Error fetching user: ${ error }!` );

        } );

    } );

    app.get( '/mybot', ( req, res ) => {

        User.findOne( {
            where: {
                mybot: true
            },
            include: [ { model: Guild, as: 'user_guilds' } ]
        } ).then( ( user ) => {

            if ( user )
                res.status( 200 ).json( user );
            else
                res.status( 404 ).send( 'Custom bot not found!' );

        } ).catch( ( error ) => {

            res.status( 404 ).send( `Error fetching custom bot: ${ error }!` );

        } );

    } );

    app.get( '/user/:id/guilds', ( req, res ) => {

        User.findByPk( req.params.id, {

            include: [ { model: Guild, as: 'user_guilds' } ]

        } ).then( ( user ) => {

            if ( user )
                res.status( 200 ).json( user.get( 'user_guilds' ) );
            else
                res.status( 404 ).send( 'User guilds not found!' );

        } ).catch( ( error ) => {

            res.status( 404 ).send( `Error fetching user guilds: ${ error }!` );

        } );

    } );

    app.get( '/user/:id/triggers', ( req, res ) => {

        User.findByPk( req.params.id, {

            include: [ Trigger ]

        } ).then( ( user ) => {

            if ( user )
                res.status( 200 ).json( user.get( 'Triggers' ) );
            else
                res.status( 404 ).send( 'User triggers not found!' );

        } ).catch( ( error ) => {

            res.status( 404 ).send( `Error fetching user triggers: ${ error }!` );

        } );

    } );
    // #endregion
    // #region Post requests
    app.post( '/users', ( req: Request< object, object, IUser >, res ) => {

        User.findOrCreate( {
            where: {
                id: req.body.id
            },
            defaults: {
                ...req.body
            }
        } ).then( ( [ user, created ] ) => {

            if ( created ) 
                res.status( 200 ).json( user );
            else {

                User.update( { 
                    ...req.body 
                }, {
                    where: {
                        id: req.body.id
                    }
                } ).then( () => {

                    User.findByPk( req.body.id ).then( ( updatedUser ) => {

                        res.status( 200 ).json( updatedUser! );

                    } ).catch( ( error ) => {

                        console.log( `Error fetching updated user: ${ error }!` );

                    } );

                } ).catch( ( error ) => {

                    console.log( `Error updating user: ${ error }!` );

                } );

            }

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error creating user: ${ error }!` } );

        } );

    } );
    // #endregion

};

const SetupTriggerRoutes = () => {

    // #region Get requests
    app.get( '/triggers', ( req, res ) => {

        Trigger.findAll().then( ( triggers ) => {

            res.status( 200 ).json( triggers );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching triggers: ${ error }!` );

        } );

    } );

    app.get( '/trigger/:id', ( req, res ) => {

        Trigger.findByPk( req.params.id ).then( ( trigger ) => {

            if ( trigger )
                res.status( 200 ).json( trigger );
            else
                res.status( 404 ).send( 'Trigger not found!' );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching trigger: ${ error }!` );

        } );

    } );

    app.get( '/dmtriggers', ( req, res ) => {

        Trigger.findAll( {
            where: {
                guildid: null
            }
        } ).then( ( triggers ) => {

            res.status( 200 ).json( triggers );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching dm triggers: ${ error }!` );

        } );

    } );

    // #endregion
    // #region Post requests
    app.post( '/triggers', ( req: Request< object, object, ITrigger >, res ) => {

        Trigger.create( {
            ...req.body
        } ).then( ( trigger ) => {

            res.status( 200 ).json( trigger );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error creating trigger: ${ error }!` } );

        } );

    } );
    // #endregion
    // #region Delete requests
    app.delete( '/trigger/:id', ( req: Request< ITrigger, object, object >, res ) => {

        const id = req.params.id;
        Trigger.destroy( {
            where: {
                id: id
            }
        } ).then( ( count ) => {

            if ( count > 0 )
                res.status( 200 ).send( { id: id } );
            else
                res.status( 404 ).send( { error: `Error deleting trigger: ${ id }!` } );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error deleting trigger: ${ error }!` } );

        } );

    } );
    // #endregion
    // #region Patch requests
    app.patch( '/trigger/:id', ( req: Request< ITrigger, object, ITrigger >, res ) => {

        const id = req.params.id;
        Trigger.update( {
            ...req.body
        }, {
            where: {
                id: id
            }
        } ).then( ( [ count ] ) => {

            if ( count > 0 )
                res.status( 200 ).send( { id: id } );
            else
                res.status( 404 ).send( { error: `Error deleting trigger: ${ id }!` } );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error updating trigger: ${ error }!` } );

        } );

    } );
    // #endregion

};

const SetupReactionRoleRoutes = () => {

    // #region Get requests
    app.get( '/reactionroles', ( req, res ) => {

        ReactionRole.findAll().then( ( reactionRoles ) => {

            res.status( 200 ).json( reactionRoles );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching reaction roles: ${ error }!` );

        } );

    } );
    // #endregion
    // #region Delete requests
    app.delete( '/reactionrole/message/:messageid', ( req: Request< IReactionRole, object, object >, res ) => {

        const id = req.params.messageid;
        ReactionRole.findAll( {
            where: {
                messageid: id
            }
        } ).then( ( reactionroles ) => {

            ReactionRole.destroy( {
                where: {
                    messageid: id
                }
            } ).then( ( count ) => {

                if ( count > 0 )
                    res.status( 200 ).send( reactionroles.map( ( reactionrole ) => reactionrole.get() as ReactionRole ) );
                else
                    res.status( 404 ).send( { error: `No reactionroles found: ${ id }!` } );

            } ).catch( ( error ) => {

                res.status( 500 ).send( { error: `Error deleting reactionroles: ${ error }!` } );

            } );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error fetching reactionroles: ${ error }!` } );

        } );

    } );
    app.delete( '/reactionrole/guild/:guildid/message/:messageid/emoji/:emojiid', ( req: Request< IReactionRole, object, object >, res ) => {

        const { messageid, emojiid, guildid } = req.params;
        ReactionRole.destroy( {
            where: {
                messageid: messageid,
                emojiid: emojiid,
                guildid: guildid
            }
        } ).then( ( count ) => {

            if ( count > 0 )
                res.status( 200 ).send( { message: 'Reaction role deleted!' } );
            else
                res.status( 404 ).send( { error: `No reactionrole found: ${ messageid}/${emojiid}/${guildid }!` } );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error deleting reactionrole: ${ error }!` } );

        } );

    } );
    // #endregion

};

const SetupButtonRoleRoutes = () => {

    // #region Get requests
    app.get( '/buttonroles', ( req, res ) => {

        ButtonRole.findAll().then( ( buttonRoles ) => {

            res.status( 200 ).json( buttonRoles );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching button roles: ${ error }!` );

        } );

    } );
    // #endregion
    // #region Delete requests
    app.delete( '/buttonrole/message/:messageid', ( req: Request< IButtonRole, object, object >, res ) => {

        const id = req.params.messageid;
        ButtonRole.findAll( {
            where: {
                messageid: id
            }
        } ).then( ( buttonRoles ) => {

            ButtonRole.destroy( {
                where: {
                    messageid: id
                }
            } ).then( ( count ) => {

                if ( count > 0 )
                    res.status( 200 ).send( buttonRoles.map( ( buttonRole ) => buttonRole.get() as ButtonRole ) );
                else
                    res.status( 404 ).send( { error: `No buttonroles found: ${ id }!` } );

            } ).catch( ( error ) => {

                res.status( 500 ).send( { error: `Error deleting buttonroles: ${ error }!` } );

            } );

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error fetching buttonroles: ${ error }!` } );

        } );

    } );
    // #endregion

};

const SetupGuildUserRoutes = () => {

    // #region Get requests
    app.get( '/guild/:guildid/user/:userid', ( req, res ) => {

        GuildUser.findOne( {
            where: {
                guildid: req.params.guildid,
                userid: req.params.userid
            }
        } ).then( ( guilduser ) => {

            if ( guilduser )
                res.status( 200 ).json( guilduser.get() );
            else
                res.status( 404 ).send( 'Guilduser not found!' );

        } ).catch( ( error ) => {

            res.status( 500 ).send( `Error fetching guilduser: ${ error }!` );

        } );

    } );
    // #endregion
    // #region Patch requests
    app.patch( '/guild/:guildid/user/:userid', ( req: Request< IGuildUser, object, IGuildUser >, res ) => {

        const guildid = req.params.guildid;
        const userid = req.params.userid;

        GuildUser.update( {
            ...req.body
        }, {
            where: {
                guildid: guildid,
                userid: userid
            }
        } ).then( ( [ count ] ) => {

            if ( count > 0 ) {

                GuildUser.findOne( {
                    where: {
                        guildid: guildid,
                        userid: userid
                    }
                } ).then( ( updatedGuild ) => {

                    res.status( 200 ).json( updatedGuild! );

                } ).catch( ( error ) => {

                    res.status( 404 ).send( { error: `Specified guild not found!` } );

                } );

            } else {

                res.status( 404 ).send( { error: 'Specified guilduser not found!' } );

            }

        } ).catch( ( error ) => {

            res.status( 500 ).send( { error: `Error updating guilduser: ${ error }!` } );

        } );

    } );
    // #endregion

};

void db.Connect().then( async () => {

    db.InitTables();
    await db.SyncTables();
    console.log( 'Tables have been initialized and synced successfully.' );

    app.use( express.json() );
    app.use( cors() );
    app.all( '*', ( req, res, next ) => {
    
        if ( req.secure )
            return next();
        res.redirect( 'https://' + req.hostname + req.url );
    
    } );
    app.use( express.static( DIST_DIR ) );
    SetupGuildRoutes();
    SetupUserRoutes();
    SetupTriggerRoutes();
    SetupReactionRoleRoutes();
    SetupButtonRoleRoutes();
    SetupGuildUserRoutes();
    app.get( '*', function ( req, res ) {
        if ( req.ip !== `::ffff:10.0.0.195` && req.ip !== `::ffff:10.0.0.177` ) console.log( `from ${ req.ip } - ${ req.method } - ${ req.originalUrl }` );
        res.sendFile( path.join( DIST_DIR, 'index.html' ) );
    } );
    
    const httpServer = createServer( app );
    const httpsServer = createHTTPSServer( {
        key: readFileSync( '../../public/private.key', 'utf-8' ),
        cert: readFileSync( '../../public/certificate.crt', 'utf-8' ),
        ca: readFileSync( '../../public/ca_bundle.pem', 'utf-8' )
    }, app );
    
    httpServer.listen( HTTP_PORT, () => {
        console.log( `Http server listening on ${ HTTP_PORT }!` );
    } );
    httpsServer.listen( PORT, () => {
        console.log( `Https server listening on ${ PORT }!` );
        console.log( `routes`, app._router.stack.filter( ( layer: { route: { path: string, methods: { get: boolean | undefined, post: boolean | undefined, patch: boolean | undefined, delete: boolean | undefined } }  } ) => layer.route ).map( ( layer: { route: { path: string, methods: { get: boolean | undefined, post: boolean | undefined, patch: boolean | undefined, delete: boolean | undefined } } } ) => {
            const { get, post, patch } = layer.route.methods;
            return `${ get ? `GET` : ( post ? `POST` : ( patch ? `PATCH` : `DELETE` ) ) } ${ layer.route.path }`;
        } ).sort() );
    } );

} );