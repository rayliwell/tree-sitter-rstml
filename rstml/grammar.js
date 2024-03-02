const baseGrammar = require('../base.grammar.js')

module.exports = grammar({
  ...baseGrammar,

  name: 'rstml',

  rules: {
    ...baseGrammar.rules,

    source_file: $ => $.nodes,
  },
})
