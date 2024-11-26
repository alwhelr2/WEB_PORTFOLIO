import { AxiosError, AxiosResponse } from "axios";
import { ITrigger } from "../../../types";
import { all, call, Effect, put, takeLatest } from "redux-saga/effects";
import { TriggerActionTypes } from "../../actiontypes/triggerActionTypes";
import Service from "../../service";
import { fetchTriggerFailure, fetchTriggersFailure, fetchTriggersSuccess, fetchTriggerSuccess } from "../../actions/triggerActions";
import { FetchTriggerRequest } from "../../types/triggerTypes";

const getTriggers = () => Service.guildAxios.get( `/triggers` );
const getTrigger = ( id: string ) => Service.guildAxios.get( `/trigger/${ id }` );

function* fetchTriggersSaga(): Generator< Effect, void, AxiosResponse< ITrigger[] > > {
    
    try {

        const { data: triggers } = yield call( getTriggers );
        yield put(
            fetchTriggersSuccess( {
                triggers: triggers
            } )
        );

    } catch ( error ) {

        yield put(
            fetchTriggersFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* fetchTriggerSaga( action: FetchTriggerRequest ): Generator< Effect, void, AxiosResponse< ITrigger > > {

    try {

        const { data: trigger } = yield call( getTrigger, action.payload.id );
        yield put(
            fetchTriggerSuccess( {
                trigger: trigger
            } )
        );

    } catch ( error ) {

        yield put(
            fetchTriggerFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* triggerSaga() {
    yield all( [ takeLatest( TriggerActionTypes.FETCH_TRIGGERS, fetchTriggersSaga ), takeLatest( TriggerActionTypes.FETCH_TRIGGER, fetchTriggerSaga ) ] );
}

export default triggerSaga;