module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  module: {
    rules: [
      ...{
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  plugins: []
};
