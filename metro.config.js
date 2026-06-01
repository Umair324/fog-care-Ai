const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// TensorFlow model files (.bin) ko support karne ke liye extension add karein
config.resolver.assetExts.push('bin');

module.exports = config;