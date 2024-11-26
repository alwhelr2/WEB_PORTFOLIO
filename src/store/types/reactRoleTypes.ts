import { IReactionRole } from "../../types";
import { ReactRoleActionTypes } from "../actiontypes/reactRoleActionTypes";

export interface ReactRoleState {
    reactroles: {
        loading: boolean;
        reactroles: IReactionRole[];
        error: string | null;
    };
    reactrole: {
        loading: boolean;
        reactrole: IReactionRole | null;
        error: string | null;
    };
}

export interface FetchReactRolesSuccessPayload {
    reactroles: IReactionRole[];
}

export interface FetchReactRolesFailurePayload {
    error: string;
}

export interface FetchReactRoleRequestPayload {
    guildid: string;
    emojiid: string;
    messageid: string;
}

export interface FetchReactRoleSuccessPayload {
    reactrole: IReactionRole;
}

export interface FetchReactRoleFailurePayload {
    error: string;
}

export type FetchReactRolesRequest = {
    type: typeof ReactRoleActionTypes.FETCH_REACTROLES;
}

export type FetchReactRolesSuccess = {
    type: typeof ReactRoleActionTypes.FETCH_REACTROLES_SUCCESS,
    payload: FetchReactRolesSuccessPayload
}

export type FetchReactRolesFailure = {
    type: typeof ReactRoleActionTypes.FETCH_REACTROLES_FAILURE,
    payload: FetchReactRolesFailurePayload
}

export type FetchReactRoleRequest = {
    type: typeof ReactRoleActionTypes.FETCH_REACTROLE;
    payload: FetchReactRoleRequestPayload;
}

export type FetchReactRoleSuccess = {
    type: typeof ReactRoleActionTypes.FETCH_REACTROLE_SUCCESS,
    payload: FetchReactRoleSuccessPayload
}

export type FetchReactRoleFailure = {
    type: typeof ReactRoleActionTypes.FETCH_REACTROLE_FAILURE,
    payload: FetchReactRoleFailurePayload
}

export type ReactRoleActions = FetchReactRolesRequest | FetchReactRolesSuccess | FetchReactRolesFailure | FetchReactRoleRequest | FetchReactRoleSuccess | FetchReactRoleFailure;