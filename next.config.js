const {withContentlayer} = require("next-contentlayer")

console.log(process.env)

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
