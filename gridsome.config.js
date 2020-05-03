// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path')

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/sass/main.scss')
      ],
    })
}

module.exports = {
  siteName: 'A Vélo contre la Muco',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/stages/**/*.md',
        typeName: 'Stage',
        route: ':path'
      }
    },
    {
      use: 'gridsome-plugin-typescript'
    }
  ],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  }
}
