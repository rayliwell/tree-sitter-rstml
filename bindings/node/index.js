const root = require('path').join(__dirname, '..', '..')

module.exports = require('node-gyp-build')(root)

try {
  module.exports.rstml.nodeTypeInfo = require('../../rstml/src/node-types.json')
  module.exports.rust_with_rstml.nodeTypeInfo = require('../../rust_with_rstml/src/node-types.json')
} catch (_) {}
