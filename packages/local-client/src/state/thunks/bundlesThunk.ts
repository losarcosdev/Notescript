import { bundler } from "../../bundler";
import { BUNDLE_COMPLETE, BUNDLE_START } from "../slices";
import { Dispatch } from "../store";

export const createBundle = (cellId: string, input?: string) => {
  return async (dispatch: Dispatch) => {
    // Start loading
    dispatch(BUNDLE_START({ cellId }));

    const bundle = await bundler(input);

    // Once is finished , updates the state
    dispatch(BUNDLE_COMPLETE({ cellId, bundle }));
  };
};
