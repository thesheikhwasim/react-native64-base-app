/* global __DEV__ */
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer as network } from 'react-native-offline';
import userSettingsReducer from '../reducers/userSettingsReducer';

const appReducer = combineReducers({
    network: network,
    userSettings: userSettingsReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action)
};

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let middleware;

if (__DEV__) {
    middleware = applyMiddleware(thunk, logger)
} else {
    middleware = applyMiddleware(thunk)
}

const store = createStore(persistedReducer, middleware)
const persistor = persistStore(store)

export {
    store,
    persistor
}