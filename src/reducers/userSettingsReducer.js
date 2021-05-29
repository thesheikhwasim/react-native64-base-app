import * as types from '../actions/types';

const initialState = {
    userStatus: false,
    mealsData: []
};

export default function userSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case types.USER.SET_USER_STATUS:
            return { ...state, userStatus: action.payload }
        case types.USER.SET_MEALS_DATA:
            return { ...state, mealsData: action.payload }
        default:
            return state;
    }
}