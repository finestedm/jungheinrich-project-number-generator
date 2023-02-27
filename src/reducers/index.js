import { combineReducers } from "redux";

import posts from './posts'
import authSlice from "../features/auth/authSlice";

export default combineReducers({posts, authSlice})