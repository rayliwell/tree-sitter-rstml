{
  description = "Rust + html grammar for the tree-sitter parser library.";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { nixpkgs, ... }:
    let
      forAllSystems =
        function:
        nixpkgs.lib.genAttrs [
          "aarch64-darwin"
          "aarch64-linux"
          "i686-linux"
          "x86_64-darwin"
          "x86_64-linux"
        ] (system: function nixpkgs.legacyPackages.${system});
    in
    rec {
      packages = forAllSystems (pkgs: rec {
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
      });

      nixvimModule =
        { config, pkgs, ... }:
        {
          plugins = {
            treesitter = {
              grammarPackages = config.plugins.treesitter.package.passthru.allGrammars ++ [
                packages.${pkgs.system}.nvim-treesitter-grammar
              ];

              languageRegister = {
                rust_with_rstml = [ "rust" ];
              };
            };
          };
        };

      devShells = forAllSystems (pkgs: {
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
      });

      overlays = {
        default = final: prev: {
          tree-sitter-grammars = prev.tree-sitter-grammars // packages.tree-sitter-grammars;
        };
      };
    };
}
