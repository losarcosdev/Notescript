import axios from "axios";
import { Cell } from "../interfaces";
import { Dispatch, RootState } from "../store";
import {
  FETCH_CELLS,
  FETCH_CELLS_COMPLETE,
  FETCH_CELLS_ERROR,
  SAVE_CELLS_ERROR,
} from "../slices";

export const fetchCells = () => async (dispatch: Dispatch) => {
  dispatch(FETCH_CELLS());

  try {
    const { data }: { data: Cell[] } = await axios.get("/cells");

    console.log(data);

    dispatch(FETCH_CELLS_COMPLETE({ cells: data }));
  } catch (error: any) {
    dispatch(FETCH_CELLS_ERROR({ error: error.message }));
  }
};

export const saveCells =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells: Cell[] = order.map((id: string) => data[id]);

    try {
      await axios.post("/cells", { cells });
    } catch (error: any) {
      dispatch(SAVE_CELLS_ERROR({ errorMessage: error.message }));
    }
  };
