import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Cell,
  DeleteCellAction,
  FetchCellsErrorAction,
  InsertCellAction,
  MoveCellAction,
  UpdateCellAction,
  FetchCellsCompleteAction,
  SaveCellsErrorAction,
} from "../interfaces";

interface CellsInitialState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [id: string]: Cell;
  };
}

const initialState: CellsInitialState = {
  loading: false,
  error: null,
  order: [], // ["id1" , "id2" , "id3"]
  data: {},
};

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    INSERT_CELL: (
      state: CellsInitialState,
      { payload }: PayloadAction<InsertCellAction>
    ) => {
      const newCell: Cell = {
        id: crypto.randomUUID(),
        type: payload.type,
        content: "",
      };

      state.data[newCell.id] = newCell;
      state.order = [...state.order, newCell.id];
    },

    UPDATE_CELL: (
      state: CellsInitialState,
      { payload }: PayloadAction<UpdateCellAction>
    ) => {
      state.data[payload.id].content = payload.content;
    },

    MOVE_CELL: (
      state: CellsInitialState,
      { payload }: PayloadAction<MoveCellAction>
    ) => {
      const index = state.order.findIndex((id) => id === payload.id);
      const targetIndex = payload.direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = payload.id;
    },

    DELETE_CELL: (
      state: CellsInitialState,
      { payload }: PayloadAction<DeleteCellAction>
    ) => {
      delete state.data[payload.id];
      state.order = state.order.filter((id) => id !== payload.id);
    },

    FETCH_CELLS: (state: CellsInitialState) => {
      state.loading = true;
      state.error = null;
    },

    FETCH_CELLS_ERROR: (
      state: CellsInitialState,
      { payload }: PayloadAction<FetchCellsErrorAction>
    ) => {
      state.loading = false;
      state.order = [];
      state.data = {};
      state.error = payload.error;
    },

    FETCH_CELLS_COMPLETE: (
      state: CellsInitialState,
      { payload }: PayloadAction<FetchCellsCompleteAction>
    ) => {
      state.loading = false;
      state.error = null;
      state.order = payload.cells.map((cell) => cell.id);

      const data: { [id: string]: Cell } = {};

      payload.cells.forEach((cell) => {
        data[cell.id] = cell;
      });
      state.data = data;
    },

    SAVE_CELLS_ERROR: (
      state,
      { payload }: PayloadAction<SaveCellsErrorAction>
    ) => {
      state.loading = false;
      state.order = [];
      state.data = {};
      state.error = payload.errorMessage;
    },
  },
});

export const {
  DELETE_CELL,
  FETCH_CELLS_COMPLETE,
  FETCH_CELLS_ERROR,
  FETCH_CELLS,
  INSERT_CELL,
  MOVE_CELL,
  SAVE_CELLS_ERROR,
  UPDATE_CELL,
} = cellsSlice.actions;
