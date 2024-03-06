//  Combine reducers [Module wise Reducers] into combined reducer
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import appReducer from './reducers';
import exampleReducer from '../features/Feature1/store/reducers';

const rootReducer = combineReducers({
    app: appReducer,
    example: exampleReducer,
});

// Store
const store = configureStore({ reducer: rootReducer })
export default store