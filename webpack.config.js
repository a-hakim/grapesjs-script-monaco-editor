const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/index.js',
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'grapesjs-script-monaco-editor.min.js' : 'grapesjs-script-monaco-editor.js',
      library: 'grapesjs-script-monaco-editor',
      libraryTarget: 'umd',
      globalObject: 'this',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['javascript', 'typescript'],
        features: [
          'coreCommands',
          'find',
          'format',
          'folding',
          'bracketMatching',
          'wordHighlighter',
          'clipboard',
          'contextmenu',
          'hover',
          'parameterHints',
          'suggest'
        ]
      })
    ],
    externals: {
      grapesjs: {
        commonjs: 'grapesjs',
        commonjs2: 'grapesjs',
        amd: 'grapesjs',
        root: 'grapesjs'
      }
    },
    resolve: {
      extensions: ['.js'],
      fallback: {
        "path": false,
        "fs": false
      }
    },
    optimization: {
      minimize: isProduction
    }
  };
};