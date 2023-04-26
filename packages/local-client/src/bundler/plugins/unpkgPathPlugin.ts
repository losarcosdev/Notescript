import * as esbuild from "esbuild-wasm";

// The "unpkgPathPlugin" function creates a plugin that helps resolve module paths.
export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",

    setup(build: esbuild.PluginBuild) {
      // When a file with a name matching "index.js" is being resolved,
      // this handler returns a resolved path for that file and sets the "namespace" property to "a".
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          path: "index.js",
          namespace: "a", // All files resolved through this plugin will have the "namespace" property set to "a".
        };
      });

      // When a file with a name starting with "./" is being resolved,
      // this handler returns a resolved path for that file using the "unpkg.com" URL and sets the "namespace" property to "a".
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a", // All files resolved through this plugin will have the "namespace" property set to "a".
          path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
        };
      });

      // For all other files being resolved, this handler returns a resolved path for that file using the "unpkg.com" URL
      // and sets the "namespace" property to "a".
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a", // All files resolved through this plugin will have the "namespace" property set to "a".
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
