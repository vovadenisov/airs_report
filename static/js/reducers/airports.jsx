import update from 'immutability-helper';
import {
    LOAD_AIRPORTS_START, LOAD_AIRPORTS_SUCCESS, LOAD_AIRPORTS_FAIL
} from '../constants/actionConstants';

const defaultState = {
    airports: [],
    loadSuccess: false,
    fail: false,
};


export const airports = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_AIRPORTS_START:
            return update(state, {
                loadSuccess: {
                    $set: false
                },
            });

        case LOAD_AIRPORTS_SUCCESS:
            if (action.payload) {
                return update(state, {
                    airports: {
                        $set: action.payload
                    },
                    fail: {
                        $set: false,
                    },
                    loadSuccess: {
                        $set: true,
                    },
                });
            }
            return state;

        case LOAD_AIRPORTS_FAIL:
            return update(state, {
                fail: {
                    $set: true
                }
            });

        default:
            return state;
    }
};
