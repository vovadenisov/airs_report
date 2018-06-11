import { RSAA } from 'redux-api-middleware';
import { LOAD_PLANES_FAIL, LOAD_PLANES_START, LOAD_PLANES_SUCCESS } from '../constants/actionConstants'
import { apiUrls } from '../constants/apiUrls';

export const loadPlanes = () => (
    {
        [RSAA]: {
            endpoint: apiUrls.loadPlanes,
            method: 'GET',
            types: [LOAD_PLANES_START, LOAD_PLANES_SUCCESS, LOAD_PLANES_FAIL]
        }
    }
);
