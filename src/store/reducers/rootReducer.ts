import { combineReducers } from "@reduxjs/toolkit";
import guildReducer from "./guildReducer/guildReducer";
import userReducer from "./userReducer/userReducer";
import triggerReducer from "./triggerReducer/triggerReducer";
import reactRoleReducer from "./reactRoleReducer/reactRoleReducer";

const rootReducer = combineReducers( {
    guildReducer: guildReducer,
    userReducer: userReducer,
    triggerReducer: triggerReducer,
    reactRoleReducer: reactRoleReducer
} );

export type RootState = ReturnType< typeof rootReducer >;
export default rootReducer;