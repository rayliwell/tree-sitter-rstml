{
  "targets": [
    {
      "target_name": "tree_sitter_rstml_binding",
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "rstml/src"
      ],
      "sources": [
        "bindings/node/binding.cc",
        "rstml/src/parser.c",
        "rstml/src/scanner.c",
        "rust_with_rstml/src/parser.c",
        "rust_with_rstml/src/scanner.c"
      ],
      "cflags_c": [
        "-std=c99",
      ]
    }
  ]
}
