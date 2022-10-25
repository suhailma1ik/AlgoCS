// const { getDefaultConfig } = require("expo/metro-config");
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
  },
};
