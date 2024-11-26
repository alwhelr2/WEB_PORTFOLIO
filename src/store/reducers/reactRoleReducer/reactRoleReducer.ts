import { ReactRoleActionTypes } from "../../actiontypes/reactRoleActionTypes";
import { ReactRoleActions, ReactRoleState } from "../../types/reactRoleTypes";

const initialState: ReactRoleState = {
    reactroles: {
        loading: true,
        reactroles: [],
        error: null
    },
    reactrole: {
        loading: true,
        reactrole: null,
        error: null
    }
}

export default ( state = initialState, action: ReactRoleActions ) => {

    switch ( action.type ) {

        case ReactRoleActionTypes.FETCH_REACTROLES:
            return { ...state, reactroles: {
                ...state.reactroles,
                loading: true
            } };
        case ReactRoleActionTypes.FETCH_REACTROLES_SUCCESS:
            return { ...state, reactroles: {
                ...state.reactroles,
                loading: false,
                reactroles: action.payload.reactroles
            } };
        case ReactRoleActionTypes.FETCH_REACTROLES_FAILURE:
            return { ...state, reactroles: {
                loading: true,
                reactroles: [],
                error: action.payload.error
            } };
        case ReactRoleActionTypes.FETCH_REACTROLE:
            return { ...state, reactrole: {
                ...state.reactrole,
                loading: true,
            } };
        case ReactRoleActionTypes.FETCH_REACTROLE_SUCCESS:
            return { ...state, reactrole: {
                ...state.reactrole,
                loading: false,
                reactrole: action.payload.reactrole
            } };
        case ReactRoleActionTypes.FETCH_REACTROLE_FAILURE:
            return { ...state, reactrole: {
                loading: true,
                reactrole: null,
                error: action.payload.error
            } };
        default:
            return { ...state };

    }

}