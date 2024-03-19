#![doc = include_str!("./README.md")]
use tree_sitter::Language;

extern "C" {
    fn tree_sitter_rstml() -> Language;
    fn tree_sitter_rust_with_rstml() -> Language;
}

/// The tree-sitter [Language][] for the rstml grammar.
///
/// [Language]: https://docs.rs/tree-sitter/*/tree_sitter/struct.Language.html
pub fn language_rstml() -> Language {
    unsafe { tree_sitter_rstml() }
}

/// The tree-sitter [Language][] for the rust_with_rstml grammar.
///
/// [Language]: https://docs.rs/tree-sitter/*/tree_sitter/struct.Language.html
pub fn language_rust_with_rstml() -> Language {
    unsafe { tree_sitter_rust_with_rstml() }
}

/// The content of the [`node-types.json`][] file for the rstml grammar.
///
/// [`node-types.json`]: https://tree-sitter.github.io/tree-sitter/using-parsers#static-node-types
pub const RSTML_NODE_TYPES: &'static str = include_str!("../../rstml/src/node-types.json");

/// The content of the [`node-types.json`][] file for the rust_with_rstml grammar.
///
/// [`node-types.json`]: https://tree-sitter.github.io/tree-sitter/using-parsers#static-node-types
pub const RUST_WITH_RSTML_NODE_TYPES: &'static str =
    include_str!("../../rust_with_rstml/src/node-types.json");

pub const HIGHLIGHTS_QUERY: &'static str = include_str!("../../queries/highlights.scm");
pub const INJECTIONS_QUERY: &'static str = include_str!("../../queries/injections.scm");

#[cfg(test)]
mod tests {
    #[test]
    fn test_can_load_grammar() {
        let mut parser = tree_sitter::Parser::new();
        parser
            .set_language(super::language_rstml())
            .expect("Error loading rstml language");
    }
}
