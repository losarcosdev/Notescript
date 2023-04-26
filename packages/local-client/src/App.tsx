import { Grid } from "@mui/material";
import { CellList } from "./components";
import { AddCell } from "./components/AddCell";
import { useCustomSelector } from "./hooks/useCustomSelector";
import { useActions } from "./hooks";

export const App = () => {
  return (
    <Grid>
      <>
        <AddCell />
        <CellList />
      </>
    </Grid>
  );
};
