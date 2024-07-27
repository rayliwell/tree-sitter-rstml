{
  description = "Tree sitter rstml";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      rec {
        devShells = {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              nodejs
              rustc
              cargo
              gcc
              gnumake
              (tree-sitter.override { webUISupport = true; })
              python3
              emscripten
            ];
          };
        };

        packages = rec {
          tree-sitter-grammars =
            let
              buildGrammar =
                grammarName:
                pkgs.tree-sitter.buildGrammar {
                  version = "1.2.0";
                  src = ./.;
                  generate = false;
                  location = grammarName;
                  language = grammarName;
                };

            in
            {
              rstml = buildGrammar "rstml";
              rust_with_rstml = buildGrammar "rust_with_rstml";
            };

          nvim-treesitter-grammar = tree-sitter-grammars.rust_with_rstml.overrideAttrs (
            final: prev: {
              postInstall = ''
                rm -r $out/queries
                mkdir $out/queries
                cp -r ../queries/rust_with_rstml/. $out/queries/
              '';
            }
          );
        };

        nixvimModule =
          { config, ... }:
          {
            plugins = {
              treesitter = {
                grammarPackages = config.plugins.treesitter.package.passthru.allGrammars ++ [
                  packages.nvim-treesitter-grammar
                ];

                languageRegister = {
                  rust_with_rstml = [ "rust" ];
                };
              };
            };
          };

        overlays = {
          default = final: prev: {
            tree-sitter-grammars = prev.tree-sitter-grammars // packages.tree-sitter-grammars;
          };
        };
      }
    );
}
