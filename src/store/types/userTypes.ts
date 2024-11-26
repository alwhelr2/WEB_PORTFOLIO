import { IUser } from "../../types";
import { UserActionTypes } from "../actiontypes/userActionTypes";

export interface UserState {
    users: {
        loading: boolean;
        users: IUser[];
        error: string | null;
    };
    user: {
        loading: boolean;
        user: IUser | null;
        error: string | null;
    };
}

export interface FetchUsersSuccessPayload {
    users: IUser[];
}

export interface FetchUsersFailurePayload {
    error: string;
}

export interface FetchUserRequestPayload {
    id: string;
}

export interface FetchUserSuccessPayload {
    user: IUser;
}

export interface FetchUserFailurePayload {
    error: string;
}

export type FetchUsersRequest = {
    type: typeof UserActionTypes.FETCH_USERS;
}

export type FetchMyBotRequest = {
    type: typeof UserActionTypes.FETCH_MY_BOT;
}

export type FetchUsersSuccess = {
    type: typeof UserActionTypes.FETCH_USERS_SUCCESS,
    payload: FetchUsersSuccessPayload
}

export type FetchUsersFailure = {
    type: typeof UserActionTypes.FETCH_USERS_FAILURE,
    payload: FetchUsersFailurePayload
}

export type FetchUserRequest = {
    type: typeof UserActionTypes.FETCH_USER;
    payload: FetchUserRequestPayload;
}

export type FetchUserSuccess = {
    type: typeof UserActionTypes.FETCH_USER_SUCCESS,
    payload: FetchUserSuccessPayload
}

export type FetchUserFailure = {
    type: typeof UserActionTypes.FETCH_USER_FAILURE,
    payload: FetchUsersFailurePayload
}

export type UserActions = FetchUsersRequest | FetchUsersSuccess | FetchUsersFailure | FetchUserRequest | FetchUserSuccess | FetchUserFailure | FetchMyBotRequest;