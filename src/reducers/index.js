import { combineReducers } from 'redux';

import {blogsReducer, editReducer } from './dataReducers';


export default combineReducers({ blogsReducer, editReducer });

