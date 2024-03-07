import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user/userReducer";
import UserDetailsReducer from "./user/userDetailsReducer";

const rootReducer = combineReducers({
    UserReducer,
    UserDetailsReducer
});

export default configureStore(
    {reducer: rootReducer},
    {},
)