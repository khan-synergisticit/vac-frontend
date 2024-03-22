import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user/userReducer";
import UserDetailsReducer from "./user/userDetailsReducer";
import UserRoleReducer from "./user/userRoleReducer";

const rootReducer = combineReducers({
    UserReducer,
    UserDetailsReducer,
    UserRoleReducer
});

export default configureStore(
    {reducer: rootReducer},
    {},
)