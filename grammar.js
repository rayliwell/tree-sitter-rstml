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

  conflicts: $ => [...rustGrammar.conflicts($), [$.nodes]],

  rules: {
    ...rustGrammar.rules,

    source_file: $ => $.nodes,

    _delim_nodes: $ => seq('{', $.nodes, '}'),

    nodes: $ => prec.dynamic(1, repeat1($._node)),

    _node: $ =>
      choice($.element_node, $.self_closing_element_node, $.fragment_node),

    element_node: $ =>
      seq(
        field('open_tag', $.open_tag),
        field('children', optional($.nodes)),
        field('close_tag', $.close_tag),
      ),

    fragment_node: $ => seq('<>', optional($.nodes), '</>'),

    self_closing_element_node: $ =>
      seq(
        '<',
        field('name', $.node_identifier),
        field('attributes', $.node_attributes),
        token(prec(1, '/>')),
      ),

    open_tag: $ =>
      seq(
        '<',
        field('name', $.node_identifier),
        field('attributes', optional($.node_attributes)),
        token(prec(1, '>')),
      ),

    close_tag: $ => seq('</', field('name', $.node_identifier), '>'),

    node_attributes: $ => repeat1($.node_attribute),

    node_attribute: $ =>
      seq(
        field('name', $.node_identifier),
        optional(seq('=', field('value', $._expression))),
      ),

    node_identifier: $ =>
      sepBy1($._node_identifier_separator, $._node_identifier_part),

    _node_identifier_part: _ => /[a-zA-Z][0-9a-zA-Z]*/,

    _node_identifier_separator: _ => token.immediate(choice(':', '::', '-')),
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
