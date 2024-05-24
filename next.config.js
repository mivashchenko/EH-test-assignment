const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./app/global-styles/variables.module.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.cloud.executivehomes.com',
      },
    ],
  },
}
