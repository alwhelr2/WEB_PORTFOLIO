import { connect } from "react-redux";
import { fetchGuildsRequest } from "../../store/actions/guildActions";
import { fetchTriggerRequest } from "../../store/actions/triggerActions";
import { fetchUsersRequest } from "../../store/actions/userActions";
import { RootState } from "../../store/reducers/rootReducer";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type BotTriggerProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotTrigger = ( { triggerState, guildState, userState, fetchGuildsRequest, fetchUsersRequest, fetchTriggerRequest }: BotTriggerProps ) => {

    const navigate = useNavigate();
    const { guilds } = guildState;
    const { users } = userState;
    const { trigger } = triggerState;
    const { id } = useParams();

    useEffect( () => {

        fetchTriggerRequest( id! );
        fetchUsersRequest();
        fetchGuildsRequest();

    }, [] );

    const backClick = ( e: React.MouseEvent< HTMLElement > ) => {

        e.preventDefault();
        navigate( `/discord-bot/triggers` );

    };

    const getGuildAvatar = ( guildId: string ) => {

        return guilds.find( ( guild ) => guild.id === guildId )?.iconURL ?? '...';

    };

    const getGuildName = ( guildId: string ) => {

        return guilds.find( ( guild ) => guild.id === guildId )?.name ?? '';

    };

    const getUserAvatar = ( userId: string ) => {

        return users.find( ( user ) => user.id === userId )?.avatar ?? '...';

    };

    const getUsername = ( userId: string ) => {

        return users.find( ( user ) => user.id === userId )?.username ?? '';

    };

    return (
        <div className='BotTrigger card text-center'>
            <div className='card-header'>
                <h5 className={ `title ${ trigger ? `` : `placeholder-glow` }` }>{ trigger ? `Trigger` : <span className='placeholder col-6'></span> }</h5>
            </div>
            <div className='card-body'>
                <ul className={ `list-group list-group-flush ${ trigger ? `` : `placeholder-glow` }` }>
                    <li className='list-group-item list-header'>Trigger Info:</li>
                    <li className='list-group-item text-start'>Text: { trigger ? trigger.text : <span className='placeholder col-4'></span> }</li>
                    <li className='list-group-item text-start'>Response: { trigger ? trigger.response : <span className='placeholder col-4'></span> }</li>
                    <li className='list-group-item text-start'>Type: { trigger ? trigger.type : <span className='placeholder col-4'></span> }</li>
                    <li className='list-group-item text-start'>Chance: { trigger ? `${ 100 / trigger.chance }%` : <span className='placeholder col-4'></span> }</li>
                    <li className='list-group-item text-start'>{ trigger?.enabled ? <i className='bi bi-check-square-fill' /> : <i className='bi bi-x-square-fill' /> }<span className='ms-1'>Enabled: </span>{ trigger ? `${ trigger?.enabled }` : <span className='placeholder col-4'></span> }</li>
                    { trigger?.guildid && <li className='list-group-item text-start'><span role='button' onClick={ () => navigate( `/discord-bot/server/${ trigger?.guildid }` ) } className='d-flex my-auto align-items-center trigger-guild-div'><img className='me-2' src={ getGuildAvatar( trigger.guildid ) } width='30' height='30' /><p className='mb-0'>{ `Guild ${ trigger.guildid }: ${ getGuildName( trigger.guildid  ) }` }</p></span></li> }
                    { trigger?.channelid && <li className='list-group-item text-start'>Channel ID: { trigger.channelid }</li> }
                    { trigger?.triggerbyuser && <li className='list-group-item'><span role='button' onClick={ () => navigate( `/discord-bot/user/${ trigger?.triggerbyuser }` ) } className='d-flex my-auto align-items-center trigger-user-div'><img className='me-2' src={ getUserAvatar( trigger?.triggerbyuser ) } width='30' height='30' /><p className='mb-0'>{ `User ${ trigger.triggerbyuser }: ${ getUsername( trigger.triggerbyuser ) }` }</p></span></li> }
                    <li className={ `list-group-item ${ trigger ? `` : `placeholder col-6` }` }>{ trigger ? <p className='card-text text-start'>ID: { trigger?.id }</p> : `` }</li>
                    <li className={ `list-group-item ${ trigger ? `` : `placeholder col-6` }` }><button disabled={ !trigger } type="button" className="btn botBtn" data-bs-toggle="modal" data-bs-target="#triggerModal">Edit Trigger</button></li>
                </ul>
            </div>
            <div className='card-footer text-muted d-flex'>
                <span className='text-light'><a href='#' className='link-light text-start text-decoration-none' onClick={ backClick }><i className='bi bi-arrow-left-square me-3'/>Triggers</a></span>
            </div>
            { /*trigger && <BotTriggerModal trigger={ trigger } />*/ }
        </div>
    );

};

const mapStateToProps = ( state: RootState ) => ( {
    triggerState: state.triggerReducer.trigger,
    guildState: state.guildReducer.guilds,
    userState: state.userReducer.users
} );

const mapDispatchToProps = {
    fetchTriggerRequest,
    fetchGuildsRequest,
    fetchUsersRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotTrigger );