# tree-sitter-rstml

Rust + html grammar for the [tree-sitter](https://github.com/tree-sitter/tree-sitter) parser library.

Rust web frameworks, like [Leptos](https://github.com/leptos-rs/leptos), rely on JSX-style templates embedded inside Rust code using the [rstml](https://github.com/rs-tml/rstml) library. This project enables the parsing of those templates for various purposes, such as syntax highlighting in text editors.

## Usage

Since rstml isn't a supposed to be a standalone language, this project defines two grammars for convenience:

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
