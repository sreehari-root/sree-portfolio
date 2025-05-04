// filepath: c:\timepass\Sreeportfolio App\a0-project\babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Add other plugins here if you have them
      
      // IMPORTANT: react-native-reanimated/plugin must be the last plugin listed
      'react-native-reanimated/plugin', 
    ],
  };
};
