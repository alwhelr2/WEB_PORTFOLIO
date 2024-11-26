import { AxiosError, AxiosResponse } from "axios";
import { IUser } from "../../../types";
import { all, call, Effect, put, takeLatest } from "redux-saga/effects";
import { UserActionTypes } from "../../actiontypes/userActionTypes";
import { fetchUserFailure, fetchUsersFailure, fetchUsersSuccess, fetchUserSuccess } from "../../actions/userActions";
import { FetchUserRequest } from "../../types/userTypes";
import Service from "../../service";

const getUsers = () => Service.guildAxios.get( `/users` );
const getUser = ( id: string ) => Service.guildAxios.get( `/user/${ id }` );
const getMyBot = () => Service.guildAxios.get( `/mybot` );

function* fetchUsersSaga(): Generator< Effect, void, AxiosResponse< IUser[] > > {
    
    try {

        const { data: users } = yield call( getUsers );
        yield put(
            fetchUsersSuccess( {
                users: users
            } )
        );

    } catch ( error ) {

        yield put(
            fetchUsersFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* fetchUserSaga( action: FetchUserRequest ): Generator< Effect, void, AxiosResponse< IUser > > {
    
    try {

        const { data: user } = yield call( getUser, action.payload.id );
        yield put(
            fetchUserSuccess( {
                user: user
            } )
        );

    } catch ( error ) {

        yield put(
            fetchUserFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* fetchMyBotSaga(): Generator< Effect, void, AxiosResponse< IUser > > {
    
    try {

        const { data: user } = yield call( getMyBot );
        yield put(
            fetchUserSuccess( {
                user: user
            } )
        );

    } catch ( error ) {

        yield put(
            fetchUserFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* userSaga() {
    yield all( [ 
        takeLatest( UserActionTypes.FETCH_USERS, fetchUsersSaga ),
        takeLatest( UserActionTypes.FETCH_USER, fetchUserSaga ),
        takeLatest( UserActionTypes.FETCH_MY_BOT, fetchMyBotSaga )
    ] );
}

export default userSaga;
