import { connect } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import { fetchTriggersRequest } from "../../store/actions/triggerActions";
import { useEffect, useState } from "react";
import { ITrigger } from "../../types";
import { fetchGuildsRequest } from "../../store/actions/guildActions";
import { useNavigate } from "react-router-dom";

type BotTriggersProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotTriggers = ( { triggerState, guildState, fetchTriggersRequest, fetchGuildsRequest }: BotTriggersProps ) => {

    const [ search, setSearch ] = useState< string >( '' );
    const { triggers } = triggerState;
    const { guilds, loading: guildsLoading } = guildState;
    const navigate = useNavigate();
    
    useEffect( () => {

        fetchTriggersRequest();
        fetchGuildsRequest();

    }, [] );

    const openTrigger = ( triggerId: string, index: number ) => {

        navigate( `/discord-bot/trigger/${ triggerId }` );
        bootstrap.Tooltip.getInstance( `#triggerDiv${ index }` ).dispose();

    };

    useEffect( () => {

        if ( !guildsLoading )
            document.querySelectorAll( '.trigger-div' )
                .forEach( tip => {
                    new bootstrap.Tooltip( tip );
                } )

    } );

    const getGuildAvatar = ( guildId: string ) => {

        return guilds.find( ( guild ) => guild.id === guildId )?.iconURL ?? '...';

    };

    return (
        <div className='BotTriggers card'>
            <div className='text-center card-header'>
                <h4 className='text-center title'>Triggers</h4>
            </div>
            <div className='card-body'>
                <form role='search' className='mb-3'>
                    <input id='triggerSearch' onChange={ ( event ) => setSearch( event.target.value ) } className='form-control w-75 mx-auto' type='search' placeholder='Search Triggers...' />
                </form>
                <div className='justify-content-center container-fluid d-flex flex-wrap triggers-list-container'>
                    {
                        triggers.filter( ( trigger ) => search.length === 0 || trigger.text.toLowerCase().includes( search.toLowerCase() ) ).map( ( trigger: ITrigger, i ) => {
                            return (
                                <div id={ 'triggerDiv' + i } className='p-2 trigger-div' data-bs-trigger='hover focus' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title={ trigger.text } key={ i } onClick={ () => openTrigger( trigger.id, i ) }>
                                    <img className='triggericon' src={ trigger.guildid ? getGuildAvatar( trigger.guildid ) : '...' } alt="alt" width="78" height="78"/>
                                    <p className='text-center trigger-name'>{ trigger.text }</p>
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
    triggerState: state.triggerReducer.triggers,
    guildState: state.guildReducer.guilds
} );

const mapDispatchToProps = {
    fetchTriggersRequest,
    fetchGuildsRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotTriggers );