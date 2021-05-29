import * as types from './types';

export const setUserStatus = (userStatus) => {
    return {
        type: types.USER.SET_USER_STATUS,
        payload: userStatus
    }
}

export const setMealsData = (mealsParamData) => {
    return {
        type: types.USER.SET_MEALS_DATA,
        payload: mealsParamData
    }
}