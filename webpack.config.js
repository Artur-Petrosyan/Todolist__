const path = require.resolve('path')

module.exports = {
    entry: {
         index : './src/index.js'
    },

    output: {
      filename : '[name].[contenthash].js',
      path : path.resolve(__dirname,'dist')
    }


}