import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({

});

export default configureStore(
    {reducer: rootReducer},
    {},
)