import { RSAA } from 'redux-api-middleware';
import { LOAD_AIRPORTS_FAIL, LOAD_AIRPORTS_START, LOAD_AIRPORTS_SUCCESS } from '../constants/actionConstants'
import { apiUrls } from '../constants/apiUrls';

export const loadAirports = () => (
    {
      [RSAA]: {
        endpoint: apiUrls.loadAirports,
        method: 'GET',
        types: [LOAD_AIRPORTS_START, LOAD_AIRPORTS_SUCCESS, LOAD_AIRPORTS_FAIL]
      }
    }
)
