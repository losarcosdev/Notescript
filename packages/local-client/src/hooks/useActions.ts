import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createBundle,
  DELETE_CELL,
  INSERT_CELL,
  MOVE_CELL,
  UPDATE_CELL,
  fetchCells,
  saveCells,
} from "../state";

const actionCreators = {
  createBundle,
  fetchCells,
  saveCells,
  DELETE_CELL,
  INSERT_CELL,
  MOVE_CELL,
  UPDATE_CELL,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );
};
