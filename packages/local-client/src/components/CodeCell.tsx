import { useEffect } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import { Cell } from "../state";
import { useActions, useCustomSelector } from "../hooks";
import { Resizable } from "./Resizable";
import { CodeEditor, Preview } from "./";
import "./codeCell.css";
import { useCumulativeCode } from "../hooks/useCumulativeCode";

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell = ({ cell }: CodeCellProps) => {
  const { UPDATE_CELL, createBundle } = useActions();
  const bundle = useCustomSelector((state) => state.bundles[cell.id]);
  const { cumulativeCode } = useCumulativeCode(cell.id);

  // Bundles the code 750ms after the user changes the content
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    // Debouncing
    const timer = setTimeout(() => {
      createBundle(cell.id, cumulativeCode);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode]);

  return (
    <Resizable direction="vertical">
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          zIndex: 999,
        }}
      >
        {/* Code editor */}
        <Resizable direction="horizontal">
          <CodeEditor
            onInputChange={(val) => UPDATE_CELL({ id: cell.id, content: val })}
            value={cell.content}
          />
        </Resizable>
        {/* Preview window */}
        <Box
          sx={{ backgroundColor: "whitesmoke", height: "100%", flexGrow: 1 }}
        >
          {!bundle || bundle.loading ? (
            <Box className="loading-spinner_wrapper">
              <CircularProgress sx={{ zIndex: 999 }} color="secondary" />
            </Box>
          ) : (
            <Preview error={bundle.error} code={bundle.code} />
          )}
        </Box>
      </Grid>
    </Resizable>
  );
};
