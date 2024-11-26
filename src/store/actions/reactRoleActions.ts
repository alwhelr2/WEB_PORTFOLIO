import { GuildActionTypes } from "../actiontypes/guildActionTypes";
import { ReactRoleActionTypes } from "../actiontypes/reactRoleActionTypes";
import { FetchGuildRequest } from "../types/guildTypes";
import { FetchReactRoleFailure, FetchReactRoleFailurePayload, FetchReactRoleRequest, FetchReactRolesFailure, FetchReactRolesFailurePayload, FetchReactRolesRequest, FetchReactRolesSuccess, FetchReactRolesSuccessPayload, FetchReactRoleSuccess, FetchReactRoleSuccessPayload } from "../types/reactRoleTypes";

export const fetchReactRolesRequest = (): FetchReactRolesRequest => ( {
    type: ReactRoleActionTypes.FETCH_REACTROLES
} );

export const fetchReactRolesSuccess = (
    payload: FetchReactRolesSuccessPayload
): FetchReactRolesSuccess => ( {
    type: ReactRoleActionTypes.FETCH_REACTROLES_SUCCESS,
    payload
} );

export const fetchReactRolesFailure = (
    payload: FetchReactRolesFailurePayload
): FetchReactRolesFailure => ( {
    type: ReactRoleActionTypes.FETCH_REACTROLES_FAILURE,
    payload
} );

export const fetchReactRoleRequest = (
    guildid: string,
    messageid: string,
    emojiid: string
): FetchReactRoleRequest => ( {
    type: ReactRoleActionTypes.FETCH_REACTROLE,
    payload: {
        guildid: guildid,
        messageid: messageid,
        emojiid: emojiid
    }
} );

export const fetchGuildRequest = (
    id: string
): FetchGuildRequest => ( {
    type: GuildActionTypes.FETCH_GUILD,
    payload: {
        id: id
    }
} );

export const fetchReactRoleSuccess = (
    payload: FetchReactRoleSuccessPayload
): FetchReactRoleSuccess => ( {
    type: ReactRoleActionTypes.FETCH_REACTROLE_SUCCESS,
    payload
} );

export const fetchReactRoleFailure = (
    payload: FetchReactRoleFailurePayload
): FetchReactRoleFailure => ( {
    type: ReactRoleActionTypes.FETCH_REACTROLE_FAILURE,
    payload
} );