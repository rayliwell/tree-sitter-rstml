try {
  module.exports = require('../../build/Release/tree_sitter_rstml_binding')
} catch (error1) {
  if (error1.code !== 'MODULE_NOT_FOUND') {
    throw error1
  }
  try {
    module.exports = require('../../build/Debug/tree_sitter_rstml_binding')
  } catch (error2) {
    if (error2.code !== 'MODULE_NOT_FOUND') {
      throw error2
    }
    throw error1
  }
}

try {
  module.exports.rstml.nodeTypeInfo = require('../../rstml/src/node-types.json')
  module.exports.rustWithRstml.nodeTypeInfo = require('../../rust_with_rstml/src/node-types.json')
} catch (_) {}
