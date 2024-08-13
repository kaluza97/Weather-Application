module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['module:react-native-dotenv'], 'react-native-reanimated/plugin', [
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@components': './src/components',
        '@constants': './src/constants',
        '@screens': './src/screens',
        '@services': './src/services',
        '@utils': './src/utils',
      },
    },
  ],]
};
