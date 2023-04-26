import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin, fetchPlugin } from "./plugins";

let service: esbuild.Service;

export const bundler = async (rawCode?: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  }

  const env = ["process", "env", "NODE_ENV"].join(".");

  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        [env]: "'production'",
        global: "window",
      },
      // To avoid naming conflicts
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return {
      code: result.outputFiles[0].text,
      error: "",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        code: "",
        error: error.message,
      };
    } else {
      throw error;
    }
  }
};
