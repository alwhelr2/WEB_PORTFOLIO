import { UserActionTypes } from "../../actiontypes/userActionTypes";
import { UserActions, UserState } from "../../types/userTypes";

const initialState: UserState = {
    users: {
        loading: true,
        users: [],
        error: null
    },
    user: {
        loading: true,
        user: null,
        error: null
    }
}

export default ( state = initialState, action: UserActions ) => {

    switch ( action.type ) {

        case UserActionTypes.FETCH_USERS:
            return { ...state };
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return { ...state, users: {
                ...state.users,
                loading: false,
                users: action.payload.users
            } };
        case UserActionTypes.FETCH_USERS_FAILURE:
            return { ...state, users: {
                loading: true,
                users: [],
                error: action.payload.error
            } };
        case UserActionTypes.FETCH_USER:
            return { ...state, user: {
                ...state.user,
                loading: true
            } };
        case UserActionTypes.FETCH_MY_BOT:
            return { ...state, user: {
                ...state.user,
                loading: true
            } };
        case UserActionTypes.FETCH_USER_SUCCESS:
            return { ...state, user: {
                ...state.user,
                loading: false,
                user: action.payload.user
            } };
        case UserActionTypes.FETCH_USER_FAILURE:
            return { ...state, user: {
                error: action.payload.error,
                loading: true,
                user: null
            } };
        default:
            return { ...state };

    }

}