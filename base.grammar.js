/**
 * Tree-sitter grammar definition for rstml.
 *
 * @author Ryan Halliwell <git@rayliwell.com>
 * @license MIT
 */

const rustGrammar = require('./rust.grammar.js')

module.exports = {
  ...rustGrammar,

  conflicts: $ => [...rustGrammar.conflicts($), [$.nodes]],

  rules: {
    ...rustGrammar.rules,

    nodes: $ => prec.dynamic(1, repeat1($._node)),

    _node: $ => choice($._node_except_block, alias($.block, $.rust_block)),

    _node_except_block: $ =>
      choice(
        $.element_node,
        $.self_closing_element_node,
        $.fragment_node,
        $.doctype_node,
        $.comment_node,
        $.raw_string_literal,
        $.string_literal,
        $.text_node,
      ),

    fragment_node: $ => seq('<>', optional($.nodes), '</>'),

    doctype_node: $ =>
      seq(
        '<!',
        /[Dd][Oo][Cc][Tt][Yy][Pp][Ee]/,
        repeat(/./),
        token(prec(1, '>')),
      ),

    comment_node: $ =>
      seq(
        '<!--',
        choice($.raw_string_literal, $.string_literal),
        token(prec(1, '-->')),
      ),

    self_closing_element_node: $ =>
      seq(
        '<',
        choice(field('name', $.node_identifier), $.block),
        field('attributes', optional($.node_attributes)),
        token(prec(1, '/>')),
      ),

    element_node: $ =>
      seq(
        field('open_tag', $.open_tag),
        optional($.nodes),
        field('close_tag', $.close_tag),
      ),

    open_tag: $ =>
      seq(
        '<',
        field('name', $.node_identifier),
        field('attributes', optional($.node_attributes)),
        token(prec(1, '>')),
      ),

    close_tag: $ => seq('</', field('name', $.node_identifier), '>'),

    node_attributes: $ => repeat1(choice($.node_attribute, $.block)),

    node_attribute: $ =>
      seq(
        field('name', $.node_identifier),
        optional(
          seq('=', field('value', alias($._expression, $.rust_expression))),
        ),
      ),

    node_identifier: $ =>
      sepBy1(choice(':', '::', '-'), $._node_identifier_part),

    _node_identifier_part: _ => /[\p{XID_Start}_][\p{XID_Continue}_]*/,

    text_node: $ => /[^{}<>"\s]([^{}<>\n"]*[^{}<>"\s])?/,
  },
}

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
