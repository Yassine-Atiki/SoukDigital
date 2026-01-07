// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Exclure le dossier soukdigital-api du bundling
config.resolver.blockList = [
  /soukdigital-api\/.*/,
];

// Ignorer les fichiers du backend
config.watchFolders = [path.resolve(__dirname)];
config.resolver.sourceExts = [...config.resolver.sourceExts];

module.exports = config;
