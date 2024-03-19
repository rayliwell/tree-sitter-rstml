const test = require('node:test')
const assert = require('node:assert')

const Parser = require('tree-sitter')
const { rstml, rust_with_rstml } = require('.')

test('rstml binding loads', () => {
  const code = '<div>Hello, world</div>'
  const parser = new Parser()
  parser.setLanguage(rstml)
  const tree = parser.parse(code)

  assert.ok(tree instanceof Parser.Tree)
  assert.equal(tree.language.name, 'rstml')
})

test('rust_with_rstml binding loads', () => {
  const code = `
      view! {
          <div>Hello, world</div>
      }
  `
  const parser = new Parser()
  parser.setLanguage(rust_with_rstml)
  const tree = parser.parse(code)

  assert.ok(tree instanceof Parser.Tree)
  assert.equal(tree.language.name, 'rust_with_rstml')
})
