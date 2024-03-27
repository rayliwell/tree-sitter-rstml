const baseGrammar = require('../base.grammar.js')

module.exports = grammar({
  ...baseGrammar,

  name: 'rstml',

  rules: {
    ...baseGrammar.rules,

    source_file: $ => choice($.delim_nodes, repeat1($._node_except_block)),

    delim_nodes: $ => seq('{', repeat($._node), '}'),
  },
})
