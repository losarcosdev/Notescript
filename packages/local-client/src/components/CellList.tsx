import "./cellList.css";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import { CellListItem } from "./";
import { useCustomSelector, useActions } from "../hooks";
import { Cell } from "../state";

export const CellList = () => {
  const cells = useCustomSelector(({ cells: { data, order } }) =>
    order.map((id: string) => data[id])
  );

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  return (
    <Grid className="cell-list">
      {cells.map((cell: Cell) => (
        <CellListItem key={cell.id} cell={cell} />
      ))}
    </Grid>
  );
};
