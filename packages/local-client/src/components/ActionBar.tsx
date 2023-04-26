import { Button, Grid } from "@mui/material";
import { ArrowDownward, ArrowUpward, Delete } from "@mui/icons-material/";
import { useActions } from "../hooks";
import "./actionBar.css";

interface ActionBarProps {
  id: string;
}

export const ActionBar = ({ id }: ActionBarProps) => {
  const { MOVE_CELL, DELETE_CELL } = useActions();

  return (
    <Grid className="action-bar">
      <Button
        sx={{ borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }}
        variant="contained"
        onClick={() => MOVE_CELL({ id, direction: "up" })}
      >
        <ArrowUpward />
      </Button>
      <Button
        variant="contained"
        onClick={() => MOVE_CELL({ id, direction: "down" })}
      >
        <ArrowDownward />
      </Button>
      <Button variant="contained" onClick={() => DELETE_CELL({ id })}>
        <Delete />
      </Button>
    </Grid>
  );
};
