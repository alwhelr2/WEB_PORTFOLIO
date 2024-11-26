import { GuildActionTypes } from "../actiontypes/guildActionTypes";
import { FetchGuildsRequest, FetchGuildsFailure, FetchGuildsFailurePayload, FetchGuildsSuccess, FetchGuildsSuccessPayload, FetchGuildSuccess, FetchGuildSuccessPayload, FetchGuildRequest, FetchGuildFailure, FetchGuildFailurePayload, FetchGuildRequestPayload, FetchGuildChannelsRequest, FetchGuildChannelsSuccessPayload, FetchGuildChannelsFailure, FetchGuildChannelsFailurePayload, FetchGuildChannelsSuccess, FetchGuildRolesFailure, FetchGuildRolesFailurePayload, FetchGuildRolesRequest, FetchGuildRolesSuccess, FetchGuildRolesSuccessPayload } from "../types/guildTypes"

export const fetchGuildsRequest = (): FetchGuildsRequest => ( {
    type: GuildActionTypes.FETCH_GUILDS
} );

export const fetchGuildsSuccess = (
    payload: FetchGuildsSuccessPayload
): FetchGuildsSuccess => ( {
    type: GuildActionTypes.FETCH_GUILDS_SUCCESS,
    payload
} );

export const fetchGuildsFailure = (
    payload: FetchGuildsFailurePayload
): FetchGuildsFailure => ( {
    type: GuildActionTypes.FETCH_GUILDS_FAILURE,
    payload
} );

export const fetchGuildRequest = (
    id: string
): FetchGuildRequest => ( {
    type: GuildActionTypes.FETCH_GUILD,
    payload: {
        id: id
    }
} );

export const fetchGuildSuccess = (
    payload: FetchGuildSuccessPayload
): FetchGuildSuccess => ( {
    type: GuildActionTypes.FETCH_GUILD_SUCCESS,
    payload
} );

export const fetchGuildFailure = (
    payload: FetchGuildFailurePayload
): FetchGuildFailure => ( {
    type: GuildActionTypes.FETCH_GUILD_FAILURE,
    payload
} );

export const fetchGuildChannelsRequest = (
    id: string
): FetchGuildChannelsRequest => ( {
    type: GuildActionTypes.FETCH_GUILD_CHANNELS,
    payload: {
        id: id
    }
} );

export const fetchGuildChannelsSuccess = (
    payload: FetchGuildChannelsSuccessPayload
): FetchGuildChannelsSuccess => ( {
    type: GuildActionTypes.FETCH_GUILD_CHANNELS_SUCCESS,
    payload
} );

export const fetchGuildChannelsFailure = (
    payload: FetchGuildChannelsFailurePayload
): FetchGuildChannelsFailure => ( {
    type: GuildActionTypes.FETCH_GUILD_CHANNELS_FAILURE,
    payload
} );

export const fetchGuildRolesRequest = (
    id: string
): FetchGuildRolesRequest => ( {
    type: GuildActionTypes.FETCH_GUILD_ROLES,
    payload: {
        id: id
    }
} );

export const fetchGuildRolesSuccess = (
    payload: FetchGuildRolesSuccessPayload
): FetchGuildRolesSuccess => ( {
    type: GuildActionTypes.FETCH_GUILD_ROLES_SUCCESS,
    payload
} );

export const fetchGuildRolesFailure = (
    payload: FetchGuildRolesFailurePayload
): FetchGuildRolesFailure => ( {
    type: GuildActionTypes.FETCH_GUILD_ROLES_FAILURE,
    payload
} );