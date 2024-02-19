{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    flake-parts.url = "github:hercules-ci/flake-parts";

    pnpm2nix.url = "github:nzbr/pnpm2nix-nzbr";
    pnpm2nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = {flake-parts, ...} @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = [
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-linux"
        "x86_64-darwin"
      ];
      perSystem = {
        pkgs,
        system,
        ...
      }: {
        formatter = pkgs.alejandra;

        packages = rec {
          petcare = pkgs.callPackage ./default.nix {
            inherit (inputs.pnpm2nix.packages.${system}) mkPnpmPackage;
          };
          default = petcare;
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodePackages.pnpm
          ];
        };
      };
    };
}
