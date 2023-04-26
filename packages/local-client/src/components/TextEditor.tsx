import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import "./textEditor.css";
import { Card, CardActionArea, Grid, Chip } from "@mui/material";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";

interface TextEditorProps {
  cell: Cell;
}

export const TextEditor = ({ cell }: TextEditorProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const { UPDATE_CELL } = useActions();

  // Hides the editor when the user clicks outside of it
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        divRef.current &&
        event?.target &&
        divRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  console.log(cell.content);

  if (editing) {
    return (
      <Grid className="text-editor" ref={divRef}>
        <MDEditor
          value={cell.content}
          onChange={(val) => UPDATE_CELL({ id: cell.id, content: val })}
        />
      </Grid>
    );
  }

  return (
    <Card onClick={() => setEditing(true)}>
      <CardActionArea sx={{ padding: "20px", backgroundColor: "#081726" }}>
        <MDEditor.Markdown
          style={{ color: "white" }}
          source={cell.content || "Click here to add a note"}
        />
      </CardActionArea>
    </Card>
  );
};
