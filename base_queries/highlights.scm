((doctype_node) @constant
  (#set! "priority" 150))

(doctype_node
  [
    "<!"
    ">"
  ] @tag.delimiter
  (#set! "priority" 150))

(open_tag
  [
    "<"
    ">"
  ] @tag.delimiter
  (#set! "priority" 150))

(close_tag
  [
    "</"
    ">"
  ] @tag.delimiter
  (#set! "priority" 150))

(self_closing_element_node
  [
    "<"
    "/>"
  ] @tag.delimiter
  (#set! "priority" 150))

(node_identifier
  [
    "-"
    ":"
    "::"
  ] @punctuation.delimiter
  (#set! "priority" 152))

(open_tag
  name: (node_identifier) @tag
  (#set! "priority" 151))

(close_tag
  name: (node_identifier) @tag
  (#set! "priority" 151))

(self_closing_element_node
  name: (node_identifier) @tag
  (#set! "priority" 151))

((node_identifier) @tag.attribute
  (#set! "priority" 150))

(node_attribute
  name: (node_identifier) @tag.attribute
  (#set! "priority" 150))

(generic_identifier
  [
    [
      "<"
      ">"
    ] @punctuation.delimiter
    (node_identifier) @tag
  ]
  (#set! "priority" 150))

((text_node) @variable
  (#set! "priority" 150))

(comment_node
  [
    "<!--"
    "-->"
  ] @comment
  (#set! "priority" 150))
