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
      {
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
      }
    );
}
