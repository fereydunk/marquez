const postCssModulesValues = require("postcss-modules-values")
const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [{
        test: /\.css$/,
      use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules : {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            }
        }]
      },
      {
        test: /\.(png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.ico$/,
        loader: 'file-loader'
      },
      // SVGs imported with ?url query → return a URL string (for use in <img src>)
      {
        test: /\.svg$/,
        resourceQuery: /url/,
        type: 'asset/resource',
      },
      // SVGs imported from JS/TS without ?url → React components via SVGR
      {
        test: /\.svg$/,
        resourceQuery: { not: [/url/] },
        use: [{ loader: '@svgr/webpack', options: { exportType: 'named' } }],
        issuer: {
          and: [/\.(js|ts|jsx|tsx)$/],
        },
        type: 'javascript/auto',
      },
      // SVGs imported from CSS → URL string
      {
        test: /\.svg$/,
        type: 'asset/resource',
        issuer: {
          and: [/\.(css|sass|scss|less)$/],
        },
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    symlinks: false
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
