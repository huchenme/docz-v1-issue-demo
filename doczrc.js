import merge from 'webpack-merge';
import path from 'path';

export default {
  title: 'Components Demo',
  host: 'localhost',
  codeSandbox: false,
  modifyBabelRc: config => {
    config.presets = [
      ...config.presets,
      ['@demo/babel-preset', { useEmotion: true }]
    ];
    return config;
  },
  modifyBundlerConfig: config => {
    const newConfig = merge(config, {
      resolve: {
        mainFields: ['src', 'module', 'main'],
        alias: { '@docs': path.resolve(__dirname, 'docs') }
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    });
    return newConfig;
  }
};
