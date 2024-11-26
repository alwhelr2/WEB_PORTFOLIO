import { all, fork } from "redux-saga/effects";
import guildSaga from "./guildSaga/guildSaga";
import userSaga from "./usersSaga/usersSaga";
import triggerSaga from "./triggerSaga/triggerSaga";
import reactRoleSaga from "./reactRoleSaga/reactRoleSaga";

export function* rootSaga() {
    yield all( [ fork( guildSaga ), fork( userSaga ), fork( triggerSaga ), fork( reactRoleSaga  ) ] );
}