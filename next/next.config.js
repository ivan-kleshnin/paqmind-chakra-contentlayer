const {withContentlayer} = require("next-contentlayer")

console.log("MONGO_URL:", process.env.MONGO_URL)

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
