import { IChannel, IGuild, IRole } from "../../types";
import { GuildActionTypes } from "../actiontypes/guildActionTypes";

export interface GuildState {
    guilds: {
        loading: boolean;
        guilds: IGuild[];
        error: string | null;
    };
    guild: {
        loading: boolean;
        guild: IGuild | null;
        error: string | null;
    };
    channels: {
        loading: boolean;
        error: string | null;
        channels: { id: string, name: string }[];
    };
    roles: {
        loading: boolean;
        error: string | null;
        roles: { id: string, name: string }[];
    }
}

export interface FetchGuildsSuccessPayload {
    guilds: IGuild[];
}

export interface FetchGuildsFailurePayload {
    error: string;
}

export interface FetchGuildRequestPayload {
    id: string;
}

export interface FetchGuildSuccessPayload {
    guild: IGuild;
}

export interface FetchGuildFailurePayload {
    error: string;
}

export interface FetchGuildChannelsRequestPayload {
    id: string;
}

export interface FetchGuildChannelsSuccessPayload {
    channels: IChannel[];
}

export interface FetchGuildChannelsFailurePayload {
    error: string;
}

export interface FetchGuildRolesRequestPayload {
    id: string;
}

export interface FetchGuildRolesSuccessPayload {
    roles: IRole[];
}

export interface FetchGuildRolesFailurePayload {
    error: string;
}

export type FetchGuildsRequest = {
    type: typeof GuildActionTypes.FETCH_GUILDS;
}

export type FetchGuildsSuccess = {
    type: typeof GuildActionTypes.FETCH_GUILDS_SUCCESS,
    payload: FetchGuildsSuccessPayload
}

export type FetchGuildsFailure = {
    type: typeof GuildActionTypes.FETCH_GUILDS_FAILURE,
    payload: FetchGuildsFailurePayload
}

export type FetchGuildRequest = {
    type: typeof GuildActionTypes.FETCH_GUILD;
    payload: FetchGuildRequestPayload;
}

export type FetchGuildSuccess = {
    type: typeof GuildActionTypes.FETCH_GUILD_SUCCESS,
    payload: FetchGuildSuccessPayload
}

export type FetchGuildFailure = {
    type: typeof GuildActionTypes.FETCH_GUILD_FAILURE,
    payload: FetchGuildFailurePayload
}

export type FetchGuildChannelsRequest = {
    type: typeof GuildActionTypes.FETCH_GUILD_CHANNELS;
    payload: FetchGuildChannelsRequestPayload;
}

export type FetchGuildChannelsSuccess = {
    type: typeof GuildActionTypes.FETCH_GUILD_CHANNELS_SUCCESS,
    payload: FetchGuildChannelsSuccessPayload
}

export type FetchGuildChannelsFailure = {
    type: typeof GuildActionTypes.FETCH_GUILD_CHANNELS_FAILURE,
    payload: FetchGuildChannelsFailurePayload
}

export type FetchGuildRolesRequest = {
    type: typeof GuildActionTypes.FETCH_GUILD_ROLES;
    payload: FetchGuildRolesRequestPayload;
}

export type FetchGuildRolesSuccess = {
    type: typeof GuildActionTypes.FETCH_GUILD_ROLES_SUCCESS;
    payload: FetchGuildRolesSuccessPayload;
}

export type FetchGuildRolesFailure = {
    type: typeof GuildActionTypes.FETCH_GUILD_ROLES_FAILURE;
    payload: FetchGuildRolesFailurePayload;
}

export type GuildActions = FetchGuildsRequest | FetchGuildsSuccess | FetchGuildsFailure | FetchGuildRequest | FetchGuildSuccess | FetchGuildFailure | FetchGuildChannelsRequest | FetchGuildChannelsSuccess | FetchGuildChannelsFailure | FetchGuildRolesRequest | FetchGuildRolesSuccess | FetchGuildRolesFailure;