/**
 * Rust tree-sitter grammar extractor.
 *
 * Warning, this file is evil.
 *
 * @author Ryan Halliwell <git@rayliwell.com>
 * @license MIT
 */

const fs = require('node:fs')

/**
 * Tree-sitter grammar specification extractor. This function modifies
 * module.exports in the global scope.
 *
 * @param {string} code Valid JavaScript code containing a call to a function
 * called grammar.
 */
function extract(code) {
  'use strict'

  /**
   * This function leaks into the eval context and returns the object
   * that was used to specify the tree-sitter grammar.
   */
  const grammar = x => x

  eval(code)
}

const path = require.resolve('tree-sitter-rust/grammar')
const file = fs.readFileSync(path, {
  encoding: 'utf-8',
  flag: 'r',
})

extract(file)
// The module.exports object has already been mutated in the eval context.
