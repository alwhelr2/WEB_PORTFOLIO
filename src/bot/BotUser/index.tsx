import { connect } from "react-redux";
import { fetchGuildRequest, fetchGuildsRequest } from "../../store/actions/guildActions";
import { RootState } from "../../store/reducers/rootReducer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserRequest } from "../../store/actions/userActions";

type BotUserProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotUser = ( { member, fetchUserRequest }: BotUserProps ) => {

    const { user } = member;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect( () => {

        fetchUserRequest( id! );

    }, [] );

    const backClick = ( e: React.MouseEvent< HTMLElement > ) => {

        e.preventDefault();
        navigate( `/discord-bot/users` );
        // returnToUsers( BackTo.USERS );

    };

    const isValidHex = ( banner: string ) => {

        console.log( banner );
        return /^#([0-9a-f]{3}|[0]){1,2}$/i.test( `#${ banner }` );

    }

    return (
        <div className='BotUser card text-center'>
            <div className='card-header' style={ user?.banner && !isValidHex( parseInt( user.banner ).toString( 16 ) ) ? {
                backgroundImage: `url( "${ user?.banner }" )`
            } : {
                backgroundColor: `${ user?.banner ? user.banner !== '0' ? `#${ parseInt( user.banner ?? '0' ).toString( 16 ) }` : '#000' : `transparent` }`
            } }>
                <h5 className={ `title ${ user ? `` : `placeholder-glow` }` }>{ user ? `User ${ user?.username }` : <span className='placeholder col-6'></span> }</h5>
                { user && <img src={ user ? user?.avatar : `...` } className='usericon' alt='...' style={ !user?.banner || isValidHex( parseInt( user.banner ).toString( 16 ) ) ? {
                    outline: `2px solid darkgray`
                } : {

                } }/> }
            </div>
            <div className='card-body'>
                <ul className={ `list-group list-group-flush ${ user ? `` : `placeholder-glow` }` }>
                    <li className='list-group-item list-header'>User Guilds:</li>
                    {
                        !user &&
                        <li className='list-group-item placeholder col-8'></li>
                    }
                    {
                        user?.user_guilds.map( ( guild, i ) => {
                            return (
                                <div className='text-decoration-none' key={ i }>
                                    <li className='list-group-item'><span role='button' onClick={ () => navigate( `/discord-bot/server/${ guild.id }` ) } className='d-flex my-auto align-items-center user-guild-div'><img className='me-2' src={ guild ? ( guild.iconURL ?? `...` ) : `...` } width='30' height='30' /><p className='mb-0'>{ `Guild ${ guild.id }: ${ guild.name }` }</p></span></li>
                                </div>
                            );
                        } )
                    }
                    <li className='list-group-item list-header'>User Info:</li>
                    <li className={ `list-group-item text-start ${ user ? `` : `placeholder col-6` }` }>{ user?.mybot ? <i className='bi bi-check-square-fill' /> : user && <i className='bi bi-x-square-fill' /> }{ user ? <span className='card-text ms-1'>Custom Bot: { user.mybot.toString() }</span> : `` }</li>
                    <li className={ `list-group-item text-start ${ user ? `` : `placeholder col-6` }` }>{ user?.bot ? <i className='bi bi-check-square-fill' /> : user && <i className='bi bi-x-square-fill' /> }{ user ? <span className='card-text ms-1'>Bot: { user.bot.toString() }</span> : `` }</li>
                    { user?.birthdaydate && user?.birthdaydate && <li className={ `list-group-item ${ user ? `` : `placeholder col-6` }` }>{ user ? <p className='card-text text-start'>Birthday: { `${ user.birthdaymonth } ${ user.birthdaydate }` }</p> : `` }</li> }
                    { user?.status && <li className={ `list-group-item ${ user ? `` : `placeholder col-6` }` }>{ <p className='card-text text-start'>Status: { `${ user.status }` }</p> }</li> }
                    <li className={ `list-group-item ${ user ? `` : `placeholder col-6` }` }>{ user ? <p className='card-text text-start'>Created At: { new Date( parseInt( user.createdTimestamp.toString() ) ).toString() }</p> : `` }</li>
                    <li className={ `list-group-item ${ user ? `` : `placeholder col-6` }` }>{ user ? <p className='card-text text-start'>ID: { user?.id }</p> : `` }</li>
                </ul>
            </div>
            <div className='card-footer text-muted d-flex'>
                <span className='text-light'><a href='#' className='link-light text-start text-decoration-none' onClick={ backClick }><i className='bi bi-arrow-left-square me-3'/>Users</a></span>
            </div>
        </div>
    );

}

const mapStateToProps = ( state: RootState ) => ( {
    member: state.userReducer.user
} );

const mapDispatchToProps = {
    fetchUserRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotUser );