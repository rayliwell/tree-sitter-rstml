const baseGrammar = require('../base.grammar.js')

module.exports = grammar({
  ...baseGrammar,

  name: 'rust_with_rstml',

  rules: {
    ...baseGrammar.rules,

    macro_invocation: $ =>
      choice($._non_rstml_macro_invocation, $._rstml_macro_invocation),

    _non_rstml_macro_invocation: $ =>
      seq(
        field(
          'macro',
          choice($.scoped_identifier, $.identifier, $._reserved_identifier),
        ),
        '!',
        alias($.delim_token_tree, $.token_tree),
      ),

    _rstml_macro_invocation: $ =>
      seq(
        field('macro', alias($.rstml_macro_identifier, $.identifier)),
        '!',
        alias($._delim_nodes, $.nodes),
      ),

    rstml_macro_identifier: _ => choice('view'),

    _delim_nodes: $ => seq('{', optional(alias($.nodes, $._nodes)), '}'),
  },
})
