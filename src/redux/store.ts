import { configureStore } from "@reduxjs/toolkit";
import producersReducer from "./producersSlice";

const store = configureStore({
  reducer: {
    producers: producersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
