import { Cell } from "../state";
import { CodeCell, TextEditor, ActionBar } from "./";
import { Grid, Box } from "@mui/material";
import "./cellListItem.css";

interface Props {
  cell: Cell;
}

export const CellListItem = ({ cell }: Props) => {
  return (
    <Grid className="cell-list-item">
      {cell.type === "code" ? (
        <>
          <Box className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </Box>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <TextEditor cell={cell} />
          <ActionBar id={cell.id} />
        </>
      )}
    </Grid>
  );
};
