import { configureStore, Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistDataMiddleware } from "./middlewares";
import { cellsSlice, bundlesSlice } from "./slices";

export const store = configureStore({
  reducer: {
    cells: cellsSlice.reducer,
    bundles: bundlesSlice.reducer,
  },
  middleware: [persistDataMiddleware, thunk],
});

export type Dispatch = ReduxDispatch<any>;
export type RootState = ReturnType<typeof store.getState>;
