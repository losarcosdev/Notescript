import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BundleStartAction, BundleCompleteAction } from "../interfaces";

interface BundlesInitialState {
  [id: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: BundlesInitialState = {};

export const bundlesSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    BUNDLE_START: (
      state: BundlesInitialState,
      { payload }: PayloadAction<BundleStartAction>
    ) => {
      state[payload.cellId] = {
        loading: true,
        code: "",
        error: "",
      };
    },

    BUNDLE_COMPLETE: (
      state: BundlesInitialState,
      { payload }: PayloadAction<BundleCompleteAction>
    ) => {
      const { code, error } = payload.bundle;
      state[payload.cellId] = {
        loading: false,
        code,
        error,
      };
    },
  },
});

export const { BUNDLE_COMPLETE, BUNDLE_START } = bundlesSlice.actions;
