import { UserActionTypes } from "../actiontypes/userActionTypes";
import { FetchMyBotRequest, FetchUserFailure, FetchUserFailurePayload, FetchUserRequest, FetchUsersFailure, FetchUsersFailurePayload, FetchUsersRequest, FetchUsersSuccess, FetchUsersSuccessPayload, FetchUserSuccess, FetchUserSuccessPayload } from "../types/userTypes";

export const fetchUsersRequest = (): FetchUsersRequest => ( {
    type: UserActionTypes.FETCH_USERS
} );

export const fetchUsersSuccess = (
    payload: FetchUsersSuccessPayload
): FetchUsersSuccess => ( {
    type: UserActionTypes.FETCH_USERS_SUCCESS,
    payload
} );

export const fetchUsersFailure = (
    payload: FetchUsersFailurePayload
): FetchUsersFailure => ( {
    type: UserActionTypes.FETCH_USERS_FAILURE,
    payload
} );

export const fetchUserRequest = (
    id: string
): FetchUserRequest => ( {
    type: UserActionTypes.FETCH_USER,
    payload: {
        id: id
    }
} );

export const fetchMyBotRequest = (): FetchMyBotRequest => ( {
    type: UserActionTypes.FETCH_MY_BOT
} );

export const fetchUserSuccess = (
    payload: FetchUserSuccessPayload
): FetchUserSuccess => ( {
    type: UserActionTypes.FETCH_USER_SUCCESS,
    payload
} );

export const fetchUserFailure = (
    payload: FetchUserFailurePayload
): FetchUserFailure => ( {
    type: UserActionTypes.FETCH_USER_FAILURE,
    payload
} );