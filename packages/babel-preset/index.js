const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isEnvTest = env === 'test';
const isEnvProduction = env === 'production';

const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === 'undefined') {
    value = defaultValue;
  }

  if (typeof value !== 'boolean') {
    throw new Error(
      `Preset @scarf/babel-preset: '${name}' option must be a boolean.`
    );
  }

  return value;
};

module.exports = function(api, opts) {
  api.assertVersion(7);

  if (!opts) {
    opts = {};
  }

  const useEmotion = validateBoolOption('useEmotion', opts.useEmotion, false);

  return {
    presets: [
      [
        require('@babel/preset-env').default,
        {
          targets: isEnvTest
            ? {
                node: '8.0'
              }
            : {
                browsers: ['last 2 versions', 'safari 7', 'ie 11']
              },
          // `entry` transforms `@babel/polyfill` into individual requires for
          // the targeted browsers. This is safer than `usage` which performs
          // static code analysis to determine what's required.
          // This is probably a fine default to help trim down bundles when
          // end-users inevitably import '@babel/polyfill'.
          modules: isEnvTest ? 'commonjs' : false
        }
      ],
      [
        require('@babel/preset-react').default,
        {
          useBuiltIns: true
        }
      ]
    ],
    plugins: [
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      // class { handleClick = () => { } }
      [
        require('@babel/plugin-proposal-class-properties').default,
        {
          loose: true
        }
      ],
      require('@babel/plugin-proposal-export-default-from').default,
      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        require('@babel/plugin-proposal-object-rest-spread').default,
        {
          useBuiltIns: true
        }
      ],
      require('@babel/plugin-transform-runtime').default,
      require('@babel/plugin-syntax-dynamic-import').default,
      isEnvTest && require('babel-plugin-transform-dynamic-import').default,
      require('babel-plugin-macros'),
      require('babel-plugin-lodash'),
      useEmotion && [
        require('babel-plugin-emotion').default,
        { sourceMap: !isEnvProduction, autoLabel: !isEnvProduction }
      ]
    ].filter(Boolean)
  };
};
