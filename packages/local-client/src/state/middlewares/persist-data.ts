import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { RootState, Dispatch } from "../store";
import { saveCells } from "../thunks";

export const persistDataMiddleware: Middleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: AnyAction) => void) => {
    return (action: AnyAction) => {
      next(action);

      if (
        [
          "cells/DELETE_CELL",
          "cells/INSERT_CELL",
          "cells/MOVE_CELL",
          "cells/UPDATE_CELL",
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};
