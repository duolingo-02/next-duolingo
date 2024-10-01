import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import authReducer from "../reducers/authReducer";
import gameReducer from "../reducers/gameReducer";
import languageReducer from "../reducers/languageReducer";
import { userReducer } from "../reducers/userReducers";

import gameReducer2 from "../slices/gameSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    language: languageReducer,
    game: gameReducer,
    game2: gameReducer2,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
