import { combineReducers } from 'redux';
import { airports } from './airports';
import { planes } from './planes';
import { reports } from './reports';

export const airportsReport = combineReducers({
    airports,
    planes,
    reports,
});
