/**
 * Tree-sitter grammar definition for rstml.
 *
 * @author Ryan Halliwell <git@rayliwell.com>
 * @license MIT
 */

const rustGrammar = require('./rust.grammar.js')

module.exports = {
  ...rustGrammar,

  conflicts: $ => [...rustGrammar.conflicts($)],

  rules: {
    ...rustGrammar.rules,

    _node: $ => choice($._node_except_block, $.block),

    _node_except_block: $ =>
      choice(
        $.element_node,
        $.self_closing_element_node,
        $.doctype_node,
        $.comment_node,
        $.raw_string_literal,
        $.string_literal,
        $.text_node,
      ),

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
        choice(
          field('name', choice($.node_identifier, $.generic_identifier)),
          $.block,
        ),
        repeat(field('attribute', $._node_attribute)),
        token(prec(1, '/>')),
      ),

    element_node: $ =>
      seq(
        field('open_tag', $.open_tag),
        repeat($._node),
        field('close_tag', $.close_tag),
      ),

    open_tag: $ =>
      seq(
        '<',
        optional(
          seq(
            field('name', $.node_identifier),
            repeat(field('attribute', $._node_attribute)),
          ),
        ),
        token(prec(1, '>')),
      ),

    close_tag: $ => seq('</', optional(field('name', $.node_identifier)), '>'),

    _node_attribute: $ => choice($.node_identifier, $.node_attribute, $.block),

    node_attribute: $ =>
      seq(
        field('name', $.node_identifier),
        '=',
        field('value', alias($._expression, $.rust_expression)),
      ),

    node_identifier: $ =>
      sepBy1(
        choice(':', '::', '-'),
        alias($._node_identifier_part, $.identifier),
      ),

    generic_identifier: $ => seq($.node_identifier, seq('<', $._type, '>')),

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
