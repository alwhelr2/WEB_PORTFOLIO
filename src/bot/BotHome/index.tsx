import { useEffect } from "react";
import { RootState } from "../../store/reducers/rootReducer";
import { connect } from "react-redux";
import { fetchMyBotRequest } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";

type BotHomeProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotHome = ( { userState, fetchMyBotRequest }: BotHomeProps ) => {

    const { user } = userState;
    const { loading, user: bot } = user;
    const navigate = useNavigate();

    useEffect( () => {

        fetchMyBotRequest();

    }, [] );

    return (
        <div className='BotHome card text-center'>
            <div className='card-header' style={ {
                backgroundImage: `${ !loading ? `url( "${ bot!.banner }" )` : `` }`
            } }>
                <h5 className={ `title ${ !loading ? `` : `placeholder-glow` }` }>{ !loading ? `${ bot!.username }` : <span className='placeholder col-6'></span> }</h5>
                <img src={ !loading ? bot!.avatar : `...` } className='usericon' alt='...' />
            </div>
            <div className='card-body'>
                <ul className={ `list-group list-group-flush ${ !loading ? `` : `placeholder-glow` }` }>
                    <li className='list-group-item list-header'>Bot Guilds:</li>
                    {
                        loading &&
                        <li className='list-group-item placeholder col-8'></li>
                    }
                    {
                        !loading && 
                        bot!.user_guilds.map( ( guild, i ) => {
                            return (
                                <div className='text-decoration-none' key={ i }>
                                    <li className='list-group-item'><span role='button' onClick={ () => navigate( `/discord-bot/server/${ guild.id }` ) } className='d-flex my-auto align-items-center user-guild-div'><img className='me-2' src={ guild ? ( guild.iconURL ?? `...` ) : `...` } width='30' height='30' /><p className='mb-0'>{ `Guild ${ guild.id }: ${ guild.name }` }</p></span></li>
                                </div>
                            );
                        } )
                    }
                    <li className={ `list-group-item ${ !loading ? `` : `placeholder col-6` }` }>{ !loading ? <p className='card-text text-start'>Created At: { new Date( parseInt( bot!.createdTimestamp.toString() ) ).toString() }</p> : `` }</li>
                    <li className={ `list-group-item ${ !loading ? `` : `placeholder col-6` }` }>{ !loading ? <p className='card-text text-start'>ID: { bot!.id }</p> : `` }</li>
                </ul>
            </div>
        </div>
    );

}

const mapStateToProps = ( state: RootState ) => ( {
    userState: state.userReducer
} );

const mapDispatchToProps = {
    fetchMyBotRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotHome );