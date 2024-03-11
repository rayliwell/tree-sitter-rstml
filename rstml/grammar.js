const baseGrammar = require('../base.grammar.js')

module.exports = grammar({
  ...baseGrammar,

  name: 'rstml',

  rules: {
    ...baseGrammar.rules,

    source_file: $ =>
      choice($.delim_nodes, alias(repeat1($._node_except_block), $.nodes)),

    delim_nodes: $ => seq('{', $.nodes, '}'),
  },
})
