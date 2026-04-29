const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const config = withNativeWind(getDefaultConfig(projectRoot), {
  input: "./app/global.css",
});

const originalEnhanceMiddleware = config.server?.enhanceMiddleware;

config.server = {
  ...config.server,
  enhanceMiddleware(middleware, metroServer) {
    void metroServer
      .getBundler()
      .getBundler()
      .getDependencyGraph()
      .then((graph) => {
        const haste = graph?._haste;
        if (!haste || haste.emit.__nestlyPatched) {
          return;
        }

        const originalEmit = haste.emit.bind(haste);

        haste.emit = function patchedEmit(eventName, payload, ...rest) {
          // NativeWind v4 emits Metro change events in the legacy `eventsQueue`
          // shape, while Metro 0.83 expects `changes.{added,modified,removed}Files`.
          if (eventName === "change" && payload?.eventsQueue && !payload?.changes) {
            const modifiedFiles = new Map();

            for (const event of payload.eventsQueue) {
              if (event.type !== "change" || !event.filePath) {
                continue;
              }

              const relativePath = path.relative(projectRoot, event.filePath);
              modifiedFiles.set(relativePath, {
                isSymlink: false,
                modifiedTime: event.metadata?.modifiedTime ?? Date.now(),
              });
            }

            return originalEmit(
              eventName,
              {
                changes: {
                  addedFiles: new Map(),
                  modifiedFiles,
                  removedFiles: new Map(),
                },
                logger: null,
                rootDir: projectRoot,
              },
              ...rest,
            );
          }

          return originalEmit(eventName, payload, ...rest);
        };

        haste.emit.__nestlyPatched = true;
      });

    return originalEnhanceMiddleware
      ? originalEnhanceMiddleware(middleware, metroServer)
      : middleware;
  },
};

module.exports = config;
