import { connect } from "react-redux";
import { fetchGuildRequest, fetchGuildsRequest, fetchGuildChannelsRequest, fetchGuildRolesRequest } from "../../store/actions/guildActions";
import { RootState } from "../../store/reducers/rootReducer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ARGBtoRGBA } from "../../UtilityFunctions";

type BotGuildProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotGuild = ( { server, server_channels, server_roles, fetchGuildRequest, fetchGuildChannelsRequest, fetchGuildRolesRequest }: BotGuildProps ) => {

    const { guild } = server;
    const { channels }  = server_channels;
    const { roles } = server_roles;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect( () => {

        fetchGuildRequest( id! );
        fetchGuildChannelsRequest( id! );
        fetchGuildRolesRequest( id! );

    }, [] );

    const backClick = ( e: React.MouseEvent< HTMLElement > ) => {

        e.preventDefault();
        navigate( `/discord-bot/servers` );

    };

    const getChannelName = ( id: string ) => channels.find( ( channel ) => channel.id === id )?.name ?? `Channel not found!`;
    const getRoleName = ( id: string ) => roles.find( ( role ) => role.id === id )?.name ?? `Role not found!`;

    return (
        <div className='BotGuild card text-center'>
            <div className='card-header d-flex'>
                <h5 className={ `title ${ guild ? `` : `placeholder-glow` }` }>{ guild ? `Server ${ guild?.name }` : <span className='placeholder col-6'></span>}</h5>
                <img src={ guild?.iconURL ?? `...` } className='guildicon' alt='...' />
            </div>
            <div className='card-body'>
                <ul className={ `list-group list-group-flush ${ guild ? `` : `placeholder-glow` }` }>
                    <li className={ `list-group-item list-header` }>Server Members:</li>
                    {
                        !guild &&
                        <li className='list-group-item placeholder col-8'></li>
                    }
                    {
                        guild?.guild_users?.map( ( user, i ) => {
                            return (
                                <div className='text-decoration-none' key={ i }>
                                    <li className='list-group-item'><span role='button' onClick={ () => navigate( `/discord-bot/user/${ user.id }` ) } className='d-flex my-auto align-items-center guild-user-div'><img className='me-2' src={ user.avatar } width='30' height='30' /><p className='mb-0'>{ `User ${ user.id }: ${ user.username }` }</p></span></li>
                                </div>
                            );
                        } )
                    }
                    <li className={ `list-group-item list-header` }>Server Settings:</li>
                    <li className={ `list-group-item card-text text-start d-flex gap-2 ${ guild ? `` : `placeholder col-4` }` }>{ guild ? <><p className='mb-0'>Themecolor:</p><p className='mb-0' style={{ color: ARGBtoRGBA( guild?.themecolor ?? 0 ) }}> { ARGBtoRGBA( guild?.themecolor ?? 0 ) }</p></> : `` }</li>
                    <li className={ `list-group-item ${ guild ? `` : `placeholder col-4` }` }>{ guild ? <p className="card-text text-start">Command Alias: { guild?.commandalias }</p> : `` }</li>
                    { guild?.joinleavelogchannel && <li className={ `list-group-item ${ guild && channels.length > 0 ? `` : `placeholder col-4` }` }>{ <p className="card-text text-start">Join/Leave Log Channel: { getChannelName( guild.joinleavelogchannel ) }</p> }</li> }
                    { guild?.birthdaychannel && <li className={ `list-group-item ${ guild && channels.length > 0 ? `` : `placeholder col-4` }` }>{ <p className="card-text text-start">Birthday Channel: { getChannelName( guild.birthdaychannel ) }</p> }</li> }
                    { guild?.messagelogchannel && <li className={ `list-group-item ${ guild && channels.length > 0 ? `` : `placeholder col-4` }` }>{ <p className="card-text text-start">Message Log Channel: { getChannelName( guild.messagelogchannel ) }</p> }</li> }
                    { guild?.starboardchannel && <li className={ `list-group-item ${ guild && channels.length > 0 ? `` : `placeholder col-4` }` }>{ <p className="card-text text-start">Starboard Channel: { getChannelName( guild.starboardchannel ) }</p> }</li> }
                    { guild?.starboardlimit && <li className={ `list-group-item ${ guild ? `` : `placeholder col-4` }` }>{ <p className="card-text text-start">Starboard Limit: { guild.starboardlimit }</p> }</li> }
                    { guild?.starboardenabled && <li className={ `list-group-item ${ guild ? `` : `placeholder col-4` }` }>{ <p className="card-text text-start">Starboard Enabled: { guild.starboardenabled.toString() }</p> }</li> }
                    { guild?.joinrole && <li className={ `list-group-item ${ guild && roles.length > 0 ? `` : `placeholder col-4` }` }>{ <p className="card-text text-start">Join Role: { getRoleName( guild.joinrole ) }</p> }</li> }
                    <li className={ `list-group-item ${ guild ? `` : `placeholder col-6` }` }>{ guild ? <p className='card-text text-start'>ID: { guild?.id }</p> : `` }</li>
                    <li className={ `list-group-item ${ guild ? `` : `placeholder col-6` }` }><button disabled={ guild === undefined || guild === null } type="button" className="btn botBtn" data-bs-toggle="modal" data-bs-target="#guildModal">Edit Server</button></li>
                </ul>
            </div>
            <div className='card-footer text-muted d-flex'>
                <span className='text-light'><a href='#' className='link-light text-start text-decoration-none' onClick={ backClick }><i className='bi bi-arrow-left-square me-3'/>Servers</a></span>
            </div>
            { /* guild.guild && <BotGuildModal guild={ guild.guild } /> */}
        </div>
    );

}

const mapStateToProps = ( state: RootState ) => ( {
    server: state.guildReducer.guild,
    server_channels: state.guildReducer.channels,
    server_roles: state.guildReducer.roles
} );

const mapDispatchToProps = {
    fetchGuildRequest,
    fetchGuildChannelsRequest,
    fetchGuildRolesRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotGuild );