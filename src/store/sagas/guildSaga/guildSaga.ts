import { AxiosError, AxiosResponse } from "axios";
import { IChannel, IGuild, IRole } from "../../../types";
import { all, call, Effect, put, takeLatest } from "redux-saga/effects";
import { GuildActionTypes } from "../../actiontypes/guildActionTypes";
import { fetchGuildFailure, fetchGuildsFailure, fetchGuildsSuccess, fetchGuildSuccess, fetchGuildChannelsFailure, fetchGuildChannelsSuccess, fetchGuildRolesFailure, fetchGuildRolesSuccess } from "../../actions/guildActions";
import { FetchGuildRequest, FetchGuildChannelsRequest, FetchGuildRolesRequest } from "../../types/guildTypes";
import Service from "../../service";

const getGuilds = () => Service.guildAxios.get( `/guilds` );
const getGuild = ( id: string ) => Service.guildAxios.get( `/guild/${ id }` );
const getGuildChannels = ( id: string ) => Service.guildAxios.get( `/guild/${ id }/channels` );
const getGuildRoles = ( id: string ) => Service.guildAxios.get( `/guild/${ id }/roles` );

function* fetchGuildsSaga(): Generator< Effect, void, AxiosResponse< IGuild[] > > {
    
    try {

        const { data: guilds } = yield call( getGuilds );
        yield put(
            fetchGuildsSuccess( {
                guilds: guilds
            } )
        );

    } catch ( error ) {

        yield put(
            fetchGuildsFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* fetchGuildSaga( action: FetchGuildRequest ): Generator< Effect, void, AxiosResponse< IGuild > > {

    try {

        const { data: guild } = yield call( getGuild, action.payload.id );
        yield put(
            fetchGuildSuccess( {
                guild: guild
            } )
        );

    } catch ( error ) {

        yield put(
            fetchGuildFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* fetchGuildChannelsSaga( action: FetchGuildChannelsRequest ): Generator< Effect, void, AxiosResponse< IChannel[] > > {

    try {

        const { data: channels } = yield call( getGuildChannels, action.payload.id );
        yield put(
            fetchGuildChannelsSuccess( {
                channels: channels
            } )
        );

    } catch ( error ) {

        yield put(
            fetchGuildChannelsFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* fetchGuildRolesSaga( action: FetchGuildRolesRequest ): Generator< Effect, void, AxiosResponse< IRole[] > > {

    try {

        const { data: roles } = yield call( getGuildRoles, action.payload.id );
        yield put(
            fetchGuildRolesSuccess( {
                roles: roles
            } )
        );

    } catch ( error ) {

        yield put(
            fetchGuildRolesFailure( {
                error: ( error as AxiosError ).message
            } )
        );

    }

}

function* guildSaga() {
    yield all( [ takeLatest( GuildActionTypes.FETCH_GUILDS, fetchGuildsSaga ), takeLatest( GuildActionTypes.FETCH_GUILD, fetchGuildSaga ), takeLatest( GuildActionTypes.FETCH_GUILD_CHANNELS, fetchGuildChannelsSaga ), takeLatest( GuildActionTypes.FETCH_GUILD_ROLES, fetchGuildRolesSaga ) ] );
}

export default guildSaga;