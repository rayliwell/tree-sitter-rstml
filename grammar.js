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

    open_tag: $ =>
      seq('<', optional(field('tag_name', $.tag_indentifier)), '>'),

    close_tag: $ =>
      seq('</', optional(field('tag_name', $.tag_indentifier)), '>'),

    tag_indentifier: $ =>
      sepBy1($._tag_identifier_punctuation, $._tag_identifier_part),

    _tag_identifier_part: _ => /[a-zA-Z][0-9a-zA-Z]*/,

    _tag_identifier_punctuation: _ => token.immediate(choice(':', '::', '-')),
  },
})

/**
 * Creates a rule to match one or more of the rules separated by the separator.
 *
 * @param {RuleOrLiteral} sep - The separator to use.
 * @param {RuleOrLiteral} rule
 *
 * @return {SeqRule}
 */
function sepBy1(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)))
}
