import { RSAA } from 'redux-api-middleware';
import { LOAD_REPORT_START, LOAD_REPORT_SUCCESS, LOAD_REPORT_FAIL } from '../constants/actionConstants'
import { apiUrls } from '../constants/apiUrls';

export const loadReport = (id) => (
    {
        [RSAA]: {
            endpoint: apiUrls.loadReport(id),
            method: 'GET',
            types: [LOAD_REPORT_START, LOAD_REPORT_SUCCESS, LOAD_REPORT_FAIL]
        }
    }
)
