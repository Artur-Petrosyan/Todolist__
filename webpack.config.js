const path = require.resolve('path')

module.exports = {
    entry: {
         index : './src/index.js',
         login: './src/login.js',
        complited: "./src/complited.js",
        active: "./src/active.js",
        all: "./src/all.js",
        api_delete: "./src/api/delete.js",
        api_get: "./src/api/get.js",
        api_patch: "./src/api/patch.js",
        api_post: "./src/api/post.js",
        api_token : "./src/api/token.js",
        utils: './src/utils/utils.js',
    },

    output: {
      filename : '[name].[contenthash].js',
      path : path.resolve(__dirname,'dist')
    }


}