import update from 'immutability-helper';
import {
    LOAD_PLANES_START, LOAD_PLANES_SUCCESS, LOAD_PLANES_FAIL
} from '../constants/actionConstants';

const defaultState = {
    planes: {},
    loadSuccess: false,
    fail: false,
};


export const planes = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_PLANES_START:
            return update(state, {
                loadSuccess: {
                    $set: false
                },
            });

        case LOAD_PLANES_SUCCESS:
            if (action.payload) {
                const planesObj = {}
                for (const item of action.payload){
                    planesObj[item.id] = item.name
                }
                return update(state, {
                    planes: {
                        $set: planesObj
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

        case LOAD_PLANES_FAIL:
            return update(state, {
                fail: {
                    $set: true
                }
            });

        default:
            return state;
    }
};
