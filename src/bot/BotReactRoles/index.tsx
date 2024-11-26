import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchReactRolesRequest } from "../../store/actions/reactRoleActions";
import { RootState } from "../../store/reducers/rootReducer";
import { connect } from "react-redux";
import { fetchGuildsRequest } from "../../store/actions/guildActions";
import { IReactionRole } from "../../types";

type BotReactRolesProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotReactRoles = ( { reactionroles, servers, fetchGuildsRequest, fetchReactRolesRequest }: BotReactRolesProps ) => {

    const navigate = useNavigate();
    const [ search, setSearch ] = useState< string >( '' );
    const { reactroles } = reactionroles;
    const { guilds, loading: guildsLoading } = servers;

    useEffect( () => {

        fetchGuildsRequest();
        fetchReactRolesRequest();

    }, [] );

    const openReactRole = ( reactRole: IReactionRole, index: number ) => {

        navigate( `/discord-bot/reactionrole/guild/${ reactRole.guildid }/message/${ reactRole.messageid }/emoji/${ reactRole.emojiid }` );
        bootstrap.Tooltip.getInstance( `#reactRoleDiv${ index }` ).dispose();

    };

    useEffect( () => {
        if ( !guildsLoading )
            document.querySelectorAll( '.react-role-div' )
                .forEach( tip => {
                    new bootstrap.Tooltip( tip );
                } )

    } );

    const getGuildName = ( guildId: string ) => {

        return guilds.find( ( guild ) => guild.id === guildId )?.name ?? '';

    };

    const emojiIsUnicode = ( emoji: string ) => {

        return !( emoji.length >= 17 && emoji.length <= 19 );

    };

    return (
        <div className='BotReactRoles card'>
            <div className='text-center card-header'>
                <h4 className='text-center title'>React Roles</h4>
            </div>
            <div className='card-body'>
                <form role='search' className='mb-3'>
                    <input id='reactRoleSearch' onChange={ ( event ) => setSearch( event.target.value ) } className='form-control w-75 mx-auto' type='search' placeholder='Search Reaction Roles...' />
                </form>
                <div className='justify-content-center container-fluid d-flex flex-wrap react-roles-list-container'>
                    {

                        reactroles.filter( ( reactRole ) => search.length === 0 || reactRole.emojiid.toLowerCase().includes( search.toLowerCase() ) ).map( ( reactRole, i ) => {
                            return (
                                <div id={ 'reactRoleDiv' + i } className='p-2 react-role-div' data-bs-trigger='hover focus' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title={ getGuildName( reactRole.guildid ) } key={ i } onClick={ () => openReactRole( reactRole, i ) }>
                                    { !emojiIsUnicode( reactRole.emojiid ) && <img className='reactroleicon' src={ ( reactRole.emojiid.length >= 17 && reactRole.emojiid.length <= 19 ) ? `https://cdn.discordapp.com/emojis/${ reactRole.emojiid }` : `` } alt={ `${ reactRole.emojiid }` } width="78" height="78"/> }
                                    { emojiIsUnicode( reactRole.emojiid ) && <span className='reactrolespan noto-color-emoji-regular-font'>{ reactRole.emojiid }</span> }
                                    <p className='text-center trigger-name'>{ getGuildName( reactRole.guildid ) }</p>
                                </div>
                            );
                        } )
                    }
                </div>
            </div>
        </div>
    );

};

const mapStateToProps = ( state: RootState ) => ( {
    reactionroles: state.reactRoleReducer.reactroles,
    servers: state.guildReducer.guilds
} );

const mapDispatchToProps = {
    fetchReactRolesRequest,
    fetchGuildsRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotReactRoles );