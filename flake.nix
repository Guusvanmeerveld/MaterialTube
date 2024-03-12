{
  description = "Material tube";

  inputs = {
    systems.url = "github:nix-systems/default";
    flake-compat.url = "https://flakehub.com/f/edolstra/flake-compat/1.tar.gz";
  };

  outputs =
    { systems
    , nixpkgs
    , ...
    }:
    let
      eachSystem = f:
        nixpkgs.lib.genAttrs (import systems) (
          system:
          f nixpkgs.legacyPackages.${system}
        );
    in
    {
      devShells = eachSystem
        (pkgs: {
          default = pkgs.mkShell
            {
              buildInputs = with pkgs; [
                nodejs_20

                yarn

                nodePackages.typescript
                nodePackages.typescript-language-server
              ];
            };
        });
    };
}
