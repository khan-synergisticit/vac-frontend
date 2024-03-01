import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user/userReducer";

const rootReducer = combineReducers({
    UserReducer
});

export default configureStore(
    {reducer: rootReducer},
    {},
)