import { combineReducers } from 'redux';

import {blogsReducer, editReducer, eachDataDisplayReducer } from './dataReducers';


export default combineReducers({ blogsReducer, editReducer, eachDataDisplayReducer});

