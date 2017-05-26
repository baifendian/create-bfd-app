var autoprefixer = require('autoprefixer')

module.exports = function(config) {
  return [

    /* babel */
    {
      test: /\.js?$/,
      exclude: [/node_modules/],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "stage-0", "react"],
          plugins: ['transform-runtime']
        }
      }
    },

    /* less */
    {
      test: /\.(css|less)$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcss: [
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9'
                ]
              })
            ]
          }
        }
      ]
    },

    /* json */
    {
      test: /\.json$/,
      loader: 'json-loader'
    },

    /* files */
    {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)(\?v=[\d\.]+)?$/,
      loader: 'file-loader?name=' + config.static + '/files/[hash].[ext]'
    }
  ]

}
