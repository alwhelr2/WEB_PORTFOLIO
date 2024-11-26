import { connect } from "react-redux";
import { fetchReactRoleRequest } from "../../store/actions/reactRoleActions";
import { RootState } from "../../store/reducers/rootReducer";
import { fetchGuildsRequest } from "../../store/actions/guildActions";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type BotReactRoleProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotReactRole = ( { fetchGuildsRequest, fetchReactRoleRequest, guildState, reactionrole }: BotReactRoleProps ) => {

    const { reactrole } = reactionrole;
    const { guilds } = guildState;
    const { guildid, emojiid, messageid } = useParams();
    const navigate = useNavigate();

    useEffect( () => {

        fetchGuildsRequest();
        fetchReactRoleRequest( guildid!, messageid!, emojiid! );

    }, [] );

    const backClick = ( e: React.MouseEvent< HTMLElement > ) => {

        e.preventDefault();
        navigate( `/discord-bot/reactionroles` );

    };

    const getGuildAvatar = ( guildId: string ) => {

        return guilds.find( ( guild ) => guild.id === guildId )?.iconURL ?? '...';

    };

    const getGuildName = ( guildId: string ) => {

        return guilds.find( ( guild ) => guild.id === guildId )?.name ?? '';

    };

    return (
        <div className='BotReactRole card text-center'>
            <div className='card-header'>
                <h5 className={ `title ${ reactrole ? `` : `placeholder-glow` }` }>{ reactrole ? `Reaction Role` : <span className='placeholder col-6'></span> }</h5>
            </div>
            <div className='card-body'>
                <ul className={ `list-group list-group-flush ${ reactrole ? `` : `placeholder-glow` }` }>
                    <li className='list-group-item text-start'>Message ID: { reactrole ? reactrole.messageid : <span className='placeholder col-4'></span> }</li>
                    <li className='list-group-item text-start'>Emoji ID: { reactrole ? reactrole.emojiid : <span className='placeholder col-4'></span> }</li>
                    <li className='list-group-item text-start'>Role ID: { reactrole ? reactrole.roleid : <span className='placeholder col-4'></span> }</li>
                    <li className='list-group-item text-start'><span role='button' onClick={ () => navigate( `/discord-bot/server/${ guildid! }` ) } className='d-flex my-auto align-items-center react-role-guild-div'><img className='me-2' src={ getGuildAvatar( guildid! ) } width='30' height='30' /><p className='mb-0'>{ `Guild ${ guildid }: ${ getGuildName( guildid!  ) }` }</p></span></li>
                </ul>
            </div>
            <div className='card-footer text-muted d-flex'>
                <span className='text-light'><a href='#' className='link-light text-start text-decoration-none' onClick={ backClick }><i className='bi bi-arrow-left-square me-3'/>Reaction Roles</a></span>
            </div>
        </div>
    );

};

const mapStateToProps = ( state: RootState ) => ( {
    reactionrole: state.reactRoleReducer.reactrole,
    guildState: state.guildReducer.guilds
} );

const mapDispatchToProps = {
    fetchReactRoleRequest,
    fetchGuildsRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotReactRole );