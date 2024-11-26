import { TriggerActionTypes } from "../actiontypes/triggerActionTypes";
import { FetchTriggersRequest, FetchTriggersSuccessPayload, FetchTriggersSuccess, FetchTriggersFailurePayload, FetchTriggersFailure, FetchTriggerFailure, FetchTriggerFailurePayload, FetchTriggerRequest, FetchTriggerSuccess, FetchTriggerSuccessPayload } from "../types/triggerTypes";

export const fetchTriggersRequest = (): FetchTriggersRequest => ( {
    type: TriggerActionTypes.FETCH_TRIGGERS
} );

export const fetchTriggersSuccess = (
    payload: FetchTriggersSuccessPayload
): FetchTriggersSuccess => ( {
    type: TriggerActionTypes.FETCH_TRIGGERS_SUCCESS,
    payload
} );

export const fetchTriggersFailure = (
    payload: FetchTriggersFailurePayload
): FetchTriggersFailure => ( {
    type: TriggerActionTypes.FETCH_TRIGGERS_FAILURE,
    payload
} );

export const fetchTriggerRequest = (
    id: string
): FetchTriggerRequest => ( {
    type: TriggerActionTypes.FETCH_TRIGGER,
    payload: {
        id: id
    }
} );

export const fetchTriggerSuccess = (
    payload: FetchTriggerSuccessPayload
): FetchTriggerSuccess => ( {
    type: TriggerActionTypes.FETCH_TRIGGER_SUCCESS,
    payload
} );

export const fetchTriggerFailure = (
    payload: FetchTriggerFailurePayload
): FetchTriggerFailure => ( {
    type: TriggerActionTypes.FETCH_TRIGGER_FAILURE,
    payload
} );