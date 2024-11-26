import { ITrigger } from "../../types";
import { TriggerActionTypes } from "../actiontypes/triggerActionTypes";

export interface TriggerState {
    triggers: {
        loading: boolean;
        triggers: ITrigger[];
        error: string | null;
    };
    trigger: {
        loading: boolean;
        trigger: ITrigger | null;
        error: string | null;
    };
}

export interface FetchTriggersSuccessPayload {
    triggers: ITrigger[];
}

export interface FetchTriggersFailurePayload {
    error: string;
}

export interface FetchTriggerRequestPayload {
    id: string;
}

export interface FetchTriggerSuccessPayload {
    trigger: ITrigger;
}

export interface FetchTriggerFailurePayload {
    error: string;
}

export type FetchTriggersRequest = {
    type: typeof TriggerActionTypes.FETCH_TRIGGERS;
}

export type FetchTriggersSuccess = {
    type: typeof TriggerActionTypes.FETCH_TRIGGERS_SUCCESS,
    payload: FetchTriggersSuccessPayload
}

export type FetchTriggersFailure = {
    type: typeof TriggerActionTypes.FETCH_TRIGGERS_FAILURE,
    payload: FetchTriggersFailurePayload
}

export type FetchTriggerRequest = {
    type: typeof TriggerActionTypes.FETCH_TRIGGER;
    payload: FetchTriggerRequestPayload;
}

export type FetchTriggerSuccess = {
    type: typeof TriggerActionTypes.FETCH_TRIGGER_SUCCESS,
    payload: FetchTriggerSuccessPayload
}

export type FetchTriggerFailure = {
    type: typeof TriggerActionTypes.FETCH_TRIGGER_FAILURE,
    payload: FetchTriggerFailurePayload
}

export type TriggerActions = FetchTriggersRequest | FetchTriggersSuccess | FetchTriggersFailure | FetchTriggerRequest | FetchTriggerSuccess | FetchTriggerFailure;