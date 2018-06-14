import { RSAA } from 'redux-api-middleware';
import { LOAD_REPORT_START, LOAD_REPORT_SUCCESS, LOAD_REPORT_FAIL } from '../constants/actionConstants'
import { apiUrls } from '../constants/apiUrls';

export const loadReport = (id, start, end) => (
    {
        [RSAA]: {
            endpoint: apiUrls.loadReport(id, start, end),
            method: 'GET',
            types: [
                LOAD_REPORT_START,
                {
                    type: LOAD_REPORT_SUCCESS,
                    meta: {id, start, end}
                },
                LOAD_REPORT_FAIL]
        }
    }
)
