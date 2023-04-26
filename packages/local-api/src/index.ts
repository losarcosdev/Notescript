import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";

interface Serve {
  dir: string;
  filename: string;
  port: number;
  useProxy: boolean;
}

export const serve = ({ dir, filename, port, useProxy }: Serve) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  // If we are not in production
  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:5173",
        ws: true,
        logLevel: "silent",
      })
    );
  } else {
    const packagePath = require.resolve(
      "@notesscript/local-client/dist/index.html"
    );
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};
