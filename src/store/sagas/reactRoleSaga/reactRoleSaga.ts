import { AxiosError, AxiosResponse } from "axios";
import { IReactionRole } from "../../../types";
import { all, call, Effect, put, takeLatest } from "redux-saga/effects";
import { ReactRoleActionTypes } from "../../actiontypes/reactRoleActionTypes";
import Service from "../../service";
import { FetchReactRoleRequest } from "../../types/reactRoleTypes";
import { fetchReactRolesSuccess, fetchReactRolesFailure, fetchReactRoleFailure, fetchReactRoleSuccess } from "../../actions/reactRoleActions";

const getReactRoles = () => Service.guildAxios.get( `/reactionroles` );
const getReactRole = ( guildid: string, messageid: string, emojiid: string ) => Service.guildAxios.get( `/guild/${ guildid }/reactionrole/message/${ messageid }/emoji/${ emojiid }` );

function* fetchReactRolesSaga(): Generator< Effect, void, AxiosResponse< IReactionRole[] > > {
    
    try {

        const { data: reactionroles } = yield call( getReactRoles );
        yield put(
            fetchReactRolesSuccess( {
                reactroles: reactionroles
            } )
        );

    } catch ( error ) {

        yield put(
            fetchReactRolesFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* fetchReactRoleSaga( action: FetchReactRoleRequest ): Generator< Effect, void, AxiosResponse< IReactionRole > > {

    try {

        const { data: reactrole } = yield call( getReactRole, action.payload.guildid, action.payload.messageid, action.payload.emojiid );
        yield put(
            fetchReactRoleSuccess( {
                reactrole: reactrole
            } )
        );

    } catch ( error ) {

        yield put(
            fetchReactRoleFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* reactRoleSaga() {
    yield all( [ takeLatest( ReactRoleActionTypes.FETCH_REACTROLES, fetchReactRolesSaga ), takeLatest( ReactRoleActionTypes.FETCH_REACTROLE, fetchReactRoleSaga ) ] );
}

export default reactRoleSaga;