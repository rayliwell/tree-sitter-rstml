(macro_invocation
  macro: (_) @_macro_name
  (token_tree) @injection.content
  (#not-match? @_macro_name "slint|view$")
  (#set! injection.language "rust_with_rstml")
  (#set! injection.include-children))

(macro_invocation
  macro: (_) @_macro_name
  (token_tree) @injection.content
  (#match? @_macro_name "slint$")
  (#offset! @injection.content 0 1 0 -1)
  (#set! injection.language "slint")
  (#set! injection.include-children))

(macro_definition
  (macro_rule
    left: (token_tree_pattern) @injection.content
    (#set! injection.language "rust_with_rstml")))

(macro_definition
  (macro_rule
    right: (token_tree) @injection.content
    (#set! injection.language "rust_with_rstml")))

([
  (line_comment)
  (block_comment)
] @injection.content
  (#set! injection.language "comment"))

((macro_invocation
  macro: (identifier) @injection.language
  (token_tree) @injection.content)
  (#any-of? @injection.language "html" "json"))

(call_expression
  function: (scoped_identifier
    path: (identifier) @_regex
    (#any-of? @_regex "Regex" "ByteRegexBuilder")
    name: (identifier) @_new
    (#eq? @_new "new"))
  arguments: (arguments
    (raw_string_literal) @injection.content)
  (#set! injection.language "regex"))

(call_expression
  function: (scoped_identifier
    path: (scoped_identifier
      (identifier) @_regex
      (#any-of? @_regex "Regex" "ByteRegexBuilder") .)
    name: (identifier) @_new
    (#eq? @_new "new"))
  arguments: (arguments
    (raw_string_literal) @injection.content)
  (#set! injection.language "regex"))

(call_expression
  function: (scoped_identifier
    path: (identifier) @_regex
    (#any-of? @_regex "RegexSet" "RegexSetBuilder")
    name: (identifier) @_new
    (#eq? @_new "new"))
  arguments: (arguments
    (array_expression
      (raw_string_literal) @injection.content))
  (#set! injection.language "regex"))

(call_expression
  function: (scoped_identifier
    path: (scoped_identifier
      (identifier) @_regex
      (#any-of? @_regex "RegexSet" "RegexSetBuilder") .)
    name: (identifier) @_new
    (#eq? @_new "new"))
  arguments: (arguments
    (array_expression
      (raw_string_literal) @injection.content))
  (#set! injection.language "regex"))

((block_comment) @injection.content
  (#match? @injection.content "/\\*!([a-zA-Z]+:)?re2c")
  (#set! injection.language "re2c"))
