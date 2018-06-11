import { combineReducers } from 'redux';
import { airports } from './airports';
import { planes } from './planes';

export const airportsReport = combineReducers({
    airports,
    planes,
});
