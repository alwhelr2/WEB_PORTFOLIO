import { connect } from "react-redux";
import { fetchGuildsRequest } from "../../store/actions/guildActions";
import { RootState } from "../../store/reducers/rootReducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type BotGuildsProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotGuilds = ( { servers, fetchGuildsRequest }: BotGuildsProps ) => {

    const { guilds } = servers;
    const [ search, setSearch ] = useState< string >( '' );
    const navigate = useNavigate();

    useEffect( () => {

        fetchGuildsRequest();

    }, [] );

    useEffect( () => {

        document.querySelectorAll( '.server-div' )
            .forEach( tip => {
                new bootstrap.Tooltip( tip );
            } );

    } );

    const openGuild = ( guildId: string, index: number ) => {

        navigate( `/discord-bot/server/${ guildId }` );
        bootstrap.Tooltip.getInstance( `#serverDiv${ index }` ).dispose();

    };

    return (
        <div className='BotGuilds card'>
            <div className='card-header'>
                <h4 className='text-center title'>Servers</h4>
            </div>
            <div className='card-body'>
                <form role='search' className='mb-3'>
                    <input id='guildSearch' onChange={ ( event ) => setSearch( event.target.value ) } className='form-control w-75 mx-auto' type='search' placeholder='Search Servers...' />
                </form>
                <div className='justify-content-center container-fluid d-flex flex-wrap servers-list-container'>
                    {
                        guilds.filter( ( guild ) => search.length === 0 || guild.name.toLowerCase().includes( search.toLowerCase() ) ).map( ( guild, i ) => {

                            return (
                                <div id={ 'serverDiv'+ i } className='p-2 server-div' data-bs-trigger='hover focus' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title={ guild.name } key={ i } onClick={ () => openGuild( guild.id, i ) } >
                                    <img className='guildicon' src={ guild.iconURL } alt='guild' width='78' height='78' />
                                    <p className='text-center server-name'>{ guild.name }</p>
                                </div>
                            );

                        } )
                    }
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = ( state: RootState ) => ( {
    servers: state.guildReducer.guilds
} );

const mapDispatchToProps = {
    fetchGuildsRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotGuilds );