import { CellTypes, CellDirections, Cell } from "./cellInterface";

export interface MoveCellAction {
  id: string;
  direction: CellDirections;
}

export interface DeleteCellAction {
  id: string;
}

export interface InsertCellAction {
  type: CellTypes;
  content?: string;
}

export interface UpdateCellAction {
  id: string;
  content?: string;
}

export interface FetchCellsCompleteAction {
  cells: Cell[];
}

export interface FetchCellsErrorAction {
  error: string;
}

export interface SaveCellsErrorAction {
  errorMessage: string;
}

export interface BundleStartAction {
  cellId: string;
}

export interface BundleCompleteAction {
  cellId: string;
  bundle: {
    code: string;
    error: string;
  };
}

export type Actions =
  | BundleCompleteAction
  | BundleStartAction
  | DeleteCellAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | InsertCellAction
  | MoveCellAction
  | SaveCellsErrorAction
  | UpdateCellAction;
