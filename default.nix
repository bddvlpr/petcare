{
  mkPnpmPackage,
  lib,
}: let
  packageData = builtins.fromJSON (builtins.readFile ./package.json);
in
  mkPnpmPackage {
    pname = "petcare";
    version = packageData.version;

    src = ./.;

    installInPlace = true;

    installPhase = ''
      mkdir -p $out/build
      cp -r build $out
      cp package.json $out/build/
    '';

    meta = with lib; {
      description = "Routine healthcare app for animal shelters";
      homepage = "https://github.com/bddvlpr/petcare";
      license = licenses.bsd3;
      maintainers = with maintainers; [bddvlpr];
    };
  }
