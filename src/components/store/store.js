import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userLoginSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
 userLogin:userSlice


});
const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);