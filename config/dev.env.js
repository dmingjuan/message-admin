var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // proxy: "http://121.42.210.138"
  proxy: "http://10.5.3.139"
})
