# tree-sitter-rstml

[![GitHub License](https://img.shields.io/github/license/rayliwell/tree-sitter-rstml?color=purple)](https://github.com/rayliwell/tree-sitter-rstml/blob/main/LICENSE)
[![GitHub last commit (branch)](https://img.shields.io/github/last-commit/rayliwell/tree-sitter-rstml/main)](https://github.com/rayliwell/tree-sitter-rstml/commits/main/)
[![GitHub Tag](https://img.shields.io/github/v/tag/rayliwell/tree-sitter-rstml?label=version)](https://github.com/rayliwell/tree-sitter-rstml/tags)
[![NPM Version](https://img.shields.io/npm/v/tree-sitter-rstml?style=flat&logo=npm&color=blue)](https://www.npmjs.com/package/tree-sitter-rstml)
[![Crates.io Version](https://img.shields.io/crates/v/tree-sitter-rstml?logo=rust&color=blue)](https://crates.io/crates/tree-sitter-rstml)
[![docs.rs](https://img.shields.io/docsrs/tree-sitter-rust)](https://docs.rs/tree-sitter-rstml/latest/tree_sitter_rstml/)

Rust + html grammar for the [tree-sitter](https://github.com/tree-sitter/tree-sitter) parser library.

Rust web frameworks, like [Leptos](https://github.com/leptos-rs/leptos), rely on JSX-style templates embedded inside Rust code using the [rstml](https://github.com/rs-tml/rstml) library. This project enables the parsing of those templates for various purposes, such as syntax highlighting in text editors.

## Usage

Since rstml isn't a supposed to be a standalone language, there are two grammars defined for convenience:

<table>
    <tr>
       <th></th>
       <th><code>rstml</code></th>
       <th><code>rust_with_rstml</code></th>
    </tr>
    <tr>
        <td>Language</td>
        <td>This grammar only parses the rstml template without requiring it to be wrapped in a <code>view!</code> macro invocation.</td>
        <td>This grammar parses an entire rust source file as normal but will parse any <code>view!</code> macro invocations as a rstml template.</td>
    </tr>
    <tr>
        <td>Intended use</td>
        <td>This is intended to be <a href="https://tree-sitter.github.io/tree-sitter/syntax-highlighting#language-injection">injected</a> into the <a href="https://github.com/tree-sitter/tree-sitter-rust">tree-sitter-rust</a> grammar. This approach provides the most flexibility by allowing the user to configure what should be interpreted as an rstml macro.</td>
        <td>In cases where tree-sitter injection is unsupported, this grammar is the best option. The macro invocation behaviour cannot be configured by the user.</td>
    </tr>
    <tr>
        <td>Example valid code</td>
        <td>
            <pre lang="html">
&lt;div&gt;Hello, world&lt;/div&gt;</pre>
        </td>
        <td>
            <pre lang="rust">
view! {
    &lt;div&gt;Hello, world&lt;/div&gt;
}</pre>
        </td>
    </tr>
    <tr>
        <td>Parser location</td>
        <td><code>rstml/src</code></td>
        <td><code>rust_with_rstml/src</code></td>
    </tr>
    <tr>
        <td>Rust binding usage</td>
        <td>
<details><summary>Show code</summary>
<pre lang="rust">
let code = &quot;&lt;div&gt;Hello, world&lt;/div&gt;&quot;;
let mut parser = tree_sitter::Parser::new();
parser.set_language(tree_sitter_rstml::language_rstml()).expect(&quot;Error loading rstml grammar&quot;);
let tree = parser.parse(code, None).unwrap();
</pre>
</details>
        </td>
        <td>
<details><summary>Show code</summary>
<pre lang="rust">
let code = r#&quot;
    view! {
        &lt;div&gt;hello, world&lt;/div&gt;
    }
&quot;#;
let mut parser = tree_sitter::Parser::new();
parser.set_language(tree_sitter_rstml::language_rust_with_rstml()).expect(&quot;Error loading rust_with_rstml grammar&quot;);
let tree = parser.parse(code, None).unwrap();
</pre>
</details>
       </td>
    </tr>
    <tr>
        <td>JavaScript binding usage</td>
        <td>
<details><summary>Show code</summary>
<pre lang="js">
const Parser = require('tree-sitter')
const code = '&lt;div&gt;Hello, world&lt;/div&gt;'
const parser = new Parser()
parser.setLanguage(require('tree-sitter-rstml').rstml)
const tree = parser.parse(code)
</pre>
</details>
        </td>
        <td>
<details><summary>Show code</summary>
<pre lang="js">
const Parser = require('tree-sitter')
const code = `
    view! {
        &lt;div&gt;Hello, world&lt;/div&gt;
    }
`
const parser = new Parser()
parser.setLanguage(require('tree-sitter-rstml').rust_with_rstml)
const tree = parser.parse(code)
</pre>
</details>
       </td>
    </tr>
</table>

## Editor support

### Neovim

Neovim's [tree-sitter integration](https://neovim.io/doc/user/treesitter.html) supports syntax highlighting, indentation, and code folding.

| Without `rstml` highlighting                      | With `rstml` highlighting                       |
|---------------------------------------------------|-------------------------------------------------|
| ![before](/assets/neovim_before_highlighting.png) | ![after](/assets/neovim_after_highlighting.png) |

To use the Neovim support with [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter), you should:

- Ensure `"nvim-treesitter/nvim-treesitter"` is installed and configured correctly.
- Install the `"rayliwell/tree-sitter-rstml"` plugin in your preferred package manager.
- Ensure `require("tree-sitter-rstml").setup()` is ran after every time `nvim-treesitter` is loaded.


> [!NOTE]
> You may have to call `:TSInstall rust_with_rstml` the first time you open a Rust buffer for syntax highlighting to work correctly.

Here's an example config using [lazy.nvim](https://github.com/folke/lazy.nvim):

```lua
require("lazy").setup({
    {
        "nvim-treesitter/nvim-treesitter",
        build = ":TSUpdate",
        config = function ()
            local configs = require("nvim-treesitter.configs")

            configs.setup({
                ensure_installed = { "c", "lua", "vim", "vimdoc", "query", "rust" },
                sync_install = false,
                highlight = { enable = true },
                indent = { enable = true },
            })
        end
    },
    {
        "rayliwell/tree-sitter-rstml",
        dependencies = { "nvim-treesitter" },
        build = ":TSUpdate",
        config = function ()
            require("tree-sitter-rstml").setup()
        end
    },
    -- Automatic tag closing and renaming (optional but highly recommended)
    {
        "windwp/nvim-ts-autotag",
        config = function()
            require("nvim-ts-autotag").setup()
        end,
    },
})
```

> [!NOTE]
> Neovim support is intended to work on the latest Neovim release and version of `nvim-treesitter`.  If you are using a Neovim distribution, like LunarVim, support is not guarenteed.

### NixVim (Advanced)

To use the [NixVim](https://github.com/nix-community/nixvim) integration with flakes, you should:

- Add `github:rayliwell/tree-sitter-rstml` as a flake input.
- Import `inputs.tree-sitter-rstml.nixvimModule` inside of your NixVim configuration.

For example:
```nix
{
  description = "NixVim configuration with tree-sitter-rstml.";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    nixvim.url = "github:nix-community/nixvim";
    tree-sitter-rstml.url = "github:rayliwell/tree-sitter-rstml/flake";
  };

  outputs =
    {
      system,
      nixpkgs,
      nixvim,
      tree-sitter-rstml,
      ...
    }:
    let
      forAllSystems =
        function:
        nixpkgs.lib.genAttrs [
          "aarch64-darwin"
          "aarch64-linux"
          "x86_64-darwin"
          "x86_64-linux"
        ] (system: function nixpkgs.legacyPackages.${system});
    in
    {
      packages = forAllSystems (pkgs: {
        default = nixvim.legacyPackages.${system}.makeNixvimWithModule {
          inherit pkgs;
          module = {
            imports = [ tree-sitter-rstml.nixvimModule ];
          };
        };
      });
    };
}
```

### Emacs

Emacs' (29.1+) [tree-sitter integration](https://www.masteringemacs.org/article/how-to-get-started-tree-sitter) supports syntax highlighting and indentation.

| **Before (`rust-ts-mode`)**                      | **After (`rstml-ts-mode`)**                    |
|--------------------------------------------------|------------------------------------------------|
| ![before](/assets/emacs_before_highlighting.png) | ![after](/assets/emacs_after_highlighting.png) |

Emacs support is provided by the `rstml-ts-mode` package.

**You can read more on the project's [GitHub](https://github.com/rayliwell/rstml-ts-mode).**

## Acknowledgements

This project extends and heavily relies upon the [tree-sitter-rust](https://github.com/tree-sitter/tree-sitter-rust) grammar. It would not be possible without its [contributors](https://github.com/tree-sitter/tree-sitter-rust/graphs/contributors), as well as those who have [contributed](https://github.com/tree-sitter/tree-sitter/graphs/contributors) to the wider tree-sitter ecosystem.

Additionally, this project is based on the work of the [rstml](https://github.com/rs-tml/rstml) library. Originating as a fork of [syn-rsx](https://github.com/stoically/syn-rsx), whose creator, unfortunately, has [passed away](https://github.com/stoically/temporary-containers/issues/618).

## License

Licensed under the [MIT License](https://mit-license.org/).

Copyright © 2024 Ryan Halliwell
