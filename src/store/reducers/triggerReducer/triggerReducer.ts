import { TriggerActionTypes } from "../../actiontypes/triggerActionTypes";
import { TriggerActions, TriggerState } from "../../types/triggerTypes";

const initialState: TriggerState = {
    triggers: {
        loading: true,
        triggers: [],
        error: null
    },
    trigger: {
        loading: true,
        trigger: null,
        error: null
    }
}

export default ( state = initialState, action: TriggerActions ) => {

    switch ( action.type ) {

        case TriggerActionTypes.FETCH_TRIGGERS:
            return { ...state, triggers: {
                ...state.triggers,
                loading: true
            } };
        case TriggerActionTypes.FETCH_TRIGGERS_SUCCESS:
            return { ...state, triggers: {
                ...state.triggers,
                loading: false,
                triggers: action.payload.triggers
            } };
        case TriggerActionTypes.FETCH_TRIGGERS_FAILURE:
            return { ...state, triggers: {
                loading: true,
                triggers: [],
                error: action.payload.error
            } };
        case TriggerActionTypes.FETCH_TRIGGER:
            return { ...state, trigger: {
                ...state.trigger,
                loading: true,
            } };
        case TriggerActionTypes.FETCH_TRIGGER_SUCCESS:
            return { ...state, trigger: {
                ...state.trigger,
                loading: false,
                trigger: action.payload.trigger
            } };
        case TriggerActionTypes.FETCH_TRIGGER_FAILURE:
            return { ...state, trigger: {
                loading: true,
                trigger: null,
                error: action.payload.error
            } };
        default:
            return { ...state };

    }

}