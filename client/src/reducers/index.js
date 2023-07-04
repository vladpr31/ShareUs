import { combineReducers } from "@reduxjs/toolkit";

import posts from "./posts";
import auth from "./auth";
export default combineReducers({ posts, auth });

/*
The combineReducers helper function turns an object whose values are different 
reducing functions into a single reducing function you can pass to createStore

in short from 2 reducers creates 1 reducer object.
 */
