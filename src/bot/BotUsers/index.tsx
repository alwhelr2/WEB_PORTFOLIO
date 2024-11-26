import { connect } from "react-redux";
import { fetchUsersRequest } from "../../store/actions/userActions";
import { RootState } from "../../store/reducers/rootReducer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUser } from "../../types";

type BotUsersProps = ReturnType< typeof mapStateToProps > & typeof mapDispatchToProps;

const BotUsers = ( { userState, fetchUsersRequest }: BotUsersProps ) => {

    const navigate = useNavigate();
    const { users } = userState;
    const [ search, setSearch ] = useState< string >( '' );

    useEffect( () => {

        fetchUsersRequest();

    }, [] );

    useEffect( () => {

        document.querySelectorAll( '.user-div' )
            .forEach( tip => {
                new bootstrap.Tooltip( tip );
            } )

    } );

    const openUser = ( userId: string, index: number ) => {

        navigate( `/discord-bot/user/${ userId }` );
        bootstrap.Tooltip.getInstance( `#userDiv${ index }` ).dispose();

    };

    return (
        <div className='BotUsers card'>
            <div className='text-center card-header'>
                <h4 className='text-center title'>Users</h4>
            </div>
            <div className='card-body'>
                <form role='search' className='mb-3'>
                    <input id='userSearch' onChange={ ( event ) => setSearch( event.target.value ) } className='form-control w-75 mx-auto' type='search' placeholder='Search Users...' />
                </form>
                <div className='justify-content-center container-fluid d-flex flex-wrap users-list-container'>
                    {
                        users.filter( ( user ) => search.length === 0 || user.username.toLowerCase().includes( search.toLowerCase() ) ).map( ( user: IUser, i ) => {
                            return (
                                <div id={ 'userDiv' + i } className='p-2 user-div' data-bs-trigger='hover focus' data-bs-toggle='tooltip' data-bs-placement='top' data-bs-title={ user.username } key={ i } onClick={ () => openUser( user.id, i ) }>
                                    <img className='usericon' src={ user.avatar } alt="..." width="78" height="78"/>
                                    <p className='text-center user-name'>{ user.username }</p>
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
    userState: state.userReducer.users
} );

const mapDispatchToProps = {
    fetchUsersRequest
}

export default connect( mapStateToProps, mapDispatchToProps )( BotUsers );