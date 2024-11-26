import { GuildActionTypes } from "../../actiontypes/guildActionTypes";
import { GuildState, GuildActions } from "../../types/guildTypes";

const initialState: GuildState = {
    guilds: {
        loading: true,
        guilds: [],
        error: null
    },
    guild: {
        loading: true,
        guild: null,
        error: null
    },
    channels: {
        channels: [],
        loading: true,
        error: null
    },
    roles: {
        roles: [],
        loading: true,
        error: null
    }
}

export default ( state = initialState, action: GuildActions ) => {

    switch ( action.type ) {

        case GuildActionTypes.FETCH_GUILDS:
            return { ...state, guilds: {
                ...state.guilds,
                loading: true
            } };
        case GuildActionTypes.FETCH_GUILDS_SUCCESS:
            return { ...state, guilds: {
                ...state.guilds,
                loading: false,
                guilds: action.payload.guilds
            } };
        case GuildActionTypes.FETCH_GUILDS_FAILURE:
            return { ...state, guilds: {
                loading: true,
                guilds: [],
                error: action.payload.error
            } };
        case GuildActionTypes.FETCH_GUILD:
            return { ...state, guild: {
                ...state.guild,
                loading: true,
            } };
        case GuildActionTypes.FETCH_GUILD_SUCCESS:
            return { ...state, guild: {
                ...state.guild,
                loading: false,
                guild: action.payload.guild
            } };
        case GuildActionTypes.FETCH_GUILD_FAILURE:
            return { ...state, guild: {
                loading: true,
                guild: null,
                error: action.payload.error
            } };
        case GuildActionTypes.FETCH_GUILD_CHANNELS:
            return { ...state, channels: {
                ...state.channels,
                loading: true
            } };
        case GuildActionTypes.FETCH_GUILD_CHANNELS_SUCCESS:
            return { ...state, channels: {
                ...state.channels,
                loading: false,
                channels: action.payload.channels
            } };
        case GuildActionTypes.FETCH_GUILD_CHANNELS_FAILURE:
            return { ...state, channels: {
                loading: true,
                error: action.payload.error,
                channels: []
            } };
        case GuildActionTypes.FETCH_GUILD_ROLES:
            return { ...state, roles: {
                ...state.roles,
                loading: true
            } };
        case GuildActionTypes.FETCH_GUILD_ROLES_SUCCESS:
            return { ...state, roles: {
                ...state.roles,
                loading: false,
                roles: action.payload.roles
            } };
        case GuildActionTypes.FETCH_GUILD_ROLES_FAILURE:
            return { ...state, roles: {
                loading: true,
                error: action.payload.error,
                roles: []
            } };
        default:
            return { ...state };

    }

}