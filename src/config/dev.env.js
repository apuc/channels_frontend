const merge = require('merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: 'development',
  DEBUG_MODE: true
});