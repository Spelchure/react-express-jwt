/**
 * Documentation
 */
import {configureStore} from '@reduxjs/toolkit';
import isAuthSlice from './features/is-auth/isAuthSlice';
const store = configureStore({
  reducer: {
    /** Reducers */
    isAuth: isAuthSlice,
  },
  /**  middleware: (getDefaultMiddleware)
   *    => getDefaultMiddleware().concat(logger),
   */
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
