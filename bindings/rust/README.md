This crate provides [rstml] (rust+html) template support for the [tree-sitter][] parsing library.

This crate exposes two functions:

1. The [language_rstml][language_rstml func] function is used to add the rstml templating language to a tree-sitter [Parser][]. You can then use that parser to parse some code:

    ```
    let code = "<div>Hello, world</div>";
    let mut parser = tree_sitter::Parser::new();
    parser.set_language(tree_sitter_rstml::language_rstml()).expect("Error loading rstml grammar");
    let tree = parser.parse(code, None).unwrap();
    ```

2. The [language_rust_with_rstml][language_rust_with_rstml func] function is used to add the rust plus the rstml templating language to a tree-sitter [Parser][]. You can then use that parser to parse some code:

    ```
    let code = r#"
        view! {
            <div>hello, world</div>
        }
    "#;
    let mut parser = tree_sitter::Parser::new();
    parser.set_language(tree_sitter_rstml::language_rust_with_rstml()).expect("Error loading rust_with_rstml grammar");
    let tree = parser.parse(code, None).unwrap();
    ```
You can read more about the reason there are two grammars in the project's [README][readme].

[readme]: https://github.com/rayliwell/tree-sitter-rstml?tab=readme-ov-file#tree-sitter-rstml
[rstml]: https://github.com/rs-tml/rstml
[Language]: https://docs.rs/tree-sitter/*/tree_sitter/struct.Language.html
[language_rstml func]: fn.language_rstml.html
[language_rust_with_rstml func]: fn.language_rust_with_rstml.html
[Parser]: https://docs.rs/tree-sitter/*/tree_sitter/struct.Parser.html
[tree-sitter]: https://tree-sitter.github.io/
