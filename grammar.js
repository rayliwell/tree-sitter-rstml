/**
 * Tree-sitter grammar definition for rstml.
 *
 * @author Ryan Halliwell <git@rayliwell.com>
 * @license MIT
 */

const rustGrammar = require('./rust.grammar')

module.exports = grammar({
  ...rustGrammar,

  name: 'rstml',

  rules: {
    ...rustGrammar.rules,

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
        $._delim_nodes,
      ),

    // TODO: Add rstml identifiers or better way of deciding macros.
    rstml_macro_identifier: _ => choice('view'),

    _delim_nodes: $ => seq('{', $.nodes, '}'),

    nodes: $ => repeat1($.element_node),

    element_node: $ => seq($.open_tag, $.close_tag),

    open_tag: _ => seq('<', '>'),

    close_tag: _ => seq('<', '/>'),
  },
})
