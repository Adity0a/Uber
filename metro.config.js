const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;

// Force all packages to use the root expo-crypto to avoid
// expo-auth-session's nested expo-crypto missing ExpoCryptoAES
config.resolver.extraNodeModules = {
  "expo-crypto": path.resolve(__dirname, "node_modules/expo-crypto"),
  "swr": path.resolve(__dirname, "node_modules/swr"),
};

module.exports = withNativeWind(config, { input: "./global.css" });

