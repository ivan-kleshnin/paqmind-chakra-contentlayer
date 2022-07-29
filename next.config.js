const {withContentlayer} = require("next-contentlayer")

module.exports = withContentlayer({
  reactStrictMode: false,
  eslint: {
    dirs: [
      "components",
      "layout",
      "lib",
      "pages",
    ],
  },
})
