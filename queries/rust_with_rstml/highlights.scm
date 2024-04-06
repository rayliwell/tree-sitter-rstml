; inherits: rust

(doctype_node) @constant

(doctype_node
  [
    "<!"
    ">"
  ] @tag.delimiter
  (#set! "priority" 101))

(open_tag
  [
    "<"
    ">"
  ] @tag.delimiter
  (#set! "priority" 101))

(close_tag
  [
    "</"
    ">"
  ] @tag.delimiter
  (#set! "priority" 101))

(self_closing_element_node
  [
    "<"
    "/>"
  ] @tag.delimiter
  (#set! "priority" 101))

(node_identifier
  [
    "-"
    ":"
    "::"
  ] @punctuation.delimiter
  (#set! "priority" 101))

(open_tag
  name: (node_identifier) @tag)

(close_tag
  name: (node_identifier) @tag)

(self_closing_element_node
  name: (node_identifier) @tag)

(node_attribute
  name: (node_identifier) @tag.attribute)

(generic_identifier
  [
    [
      "<"
      ">"
    ] @punctuation.delimiter
    (node_identifier) @tag
  ]
  (#set! "priority" 101))

((text_node) @variable
  (#set! "priority" 101))

(comment_node
  [
    "<!--"
    "-->"
  ] @comment)
