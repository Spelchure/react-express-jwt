/**
 * Documentation
 */
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    /** Reducers */
    // counter: counterSlice,
  },
  /**  middleware: (getDefaultMiddleware)
   *    => getDefaultMiddleware().concat(logger),
   */
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
