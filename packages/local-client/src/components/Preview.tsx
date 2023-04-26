import { Box, Grid } from "@mui/material";
import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  error?: string;
}

const html = `
<html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
    const handleError = (error) => {
      const root = document.getElementById("root");
      root.innerHTML = "<div style='color: red;'><h4>Runtime Error</h4>" + error + "</div>"
    }
    window.addEventListener('error' , (event) => {
      event.preventDefault();
      handleError(event.error);
    })
    window.addEventListener('message' ,  (event) => {
      try{
        eval(event.data);
      } catch(error){
        handleError(error);
      }
    },false)
    </script>
  </body>
</html>
`;

export const Preview = ({ code, error }: PreviewProps) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <Grid className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <Box className="preview-error">{error}</Box>}
    </Grid>
  );
};
