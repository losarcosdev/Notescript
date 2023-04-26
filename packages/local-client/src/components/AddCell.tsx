import { useActions } from "../hooks";
import { Box, Button, Tooltip } from "@mui/material";
import { Code, FormatColorText } from "@mui/icons-material";
import "./addCell.css";

export const AddCell = () => {
  const { INSERT_CELL } = useActions();

  return (
    <Box className="add-cell_wrapper">
      <Tooltip
        className="add-cell_tooltip"
        arrow
        title="Add a code cell"
        placement="top"
      >
        <Button
          variant="contained"
          onClick={() => INSERT_CELL({ type: "code" })}
        >
          <Code />
        </Button>
      </Tooltip>
      <Tooltip
        className="add-cell_tooltip"
        arrow
        title="Add a text cell"
        placement="top"
      >
        <Button
          variant="contained"
          onClick={() => INSERT_CELL({ type: "text" })}
        >
          <FormatColorText />
        </Button>
      </Tooltip>
    </Box>
  );
};
