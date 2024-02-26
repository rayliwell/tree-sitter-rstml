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
  },
})
