import update from 'immutability-helper';
import {
    LOAD_REPORT_START, LOAD_REPORT_SUCCESS, LOAD_REPORT_FAIL
} from '../constants/actionConstants';

const defaultState = {
    reports: {},
    loadSuccess: false,
    fail: false,
};


export const reports = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_REPORT_START:
            return update(state, {
                loadSuccess: {
                    $set: false
                },
            });

        case LOAD_REPORT_SUCCESS:
            if (action.payload) {
                return update(state, {
                    reports: reports => update(reports || {}, {
                        [action.meta.id]: id => update(id || {}, {
                            [`${action.meta.start}${action.meta.end}`]: {
                                $set: action.payload.report
                            }
                        }),
                    }),
                    fail: {
                        $set: false,
                    },
                    loadSuccess: {
                        $set: true,
                    },
                });
            }
            return state;

        case LOAD_REPORT_FAIL:
            return update(state, {
                fail: {
                    $set: true
                }
            });

        default:
            return state;
    }
};
