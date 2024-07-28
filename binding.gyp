{
  "targets": [
    {
      "target_name": "tree_sitter_rstml_binding",
      "dependencies": [
        "<!(node -p \"require('node-addon-api').targets\"):node_addon_api_except",
      ],
      "include_dirs": [
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
        "-std=c11",
        "-Wno-unused-value",
      ]
    }
  ]
}
