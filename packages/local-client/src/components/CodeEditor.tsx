import MonacoEditor from "@monaco-editor/react";
import { CircularProgress, Grid } from "@mui/material";
import "./codeEditor.css";

interface CoderEditorProps {
  value?: string;
  onInputChange: (value: string | undefined) => void;
}

export const CodeEditor = ({ value, onInputChange }: CoderEditorProps) => {
  return (
    <Grid className="editor-wrapper">
      <MonacoEditor
        onChange={onInputChange}
        value={value}
        theme="vs-dark"
        height="100%"
        language="javascript"
        loading={<CircularProgress color="secondary" />}
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 2,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </Grid>
  );
};
