(fragment_node) @tag.delimiter

(doctype_node) @constant

(doctype_node
  [
    "<!"
    ">"
  ] @tag.delimiter)

(open_tag
  [
    "<"
    ">"
  ] @tag.delimiter)

(close_tag
  [
    "</"
    ">"
  ] @tag.delimiter)

(self_closing_element_node
  [
    "<"
    "/>"
  ] @tag.delimiter)

(node_identifier
  [
    "-"
    ":"
    "::"
  ] @punctuation.delimiter)

(open_tag
  name: (node_identifier) @tag)

(close_tag
  name: (node_identifier) @tag)

(self_closing_element_node
  name: (node_identifier) @tag)

(node_attribute
  name: (node_identifier) @tag.attribute)

(text_node) @text

(comment_node
  [
    "<!--"
    "-->"
  ] @comment)
