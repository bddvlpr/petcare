{
  mkPnpmPackage,
  prisma-engines,
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

    installEnv = {
      PRISMA_SCHEMA_ENGINE_BINARY = "${prisma-engines}/bin/schema-engine";
      PRISMA_QUERY_ENGINE_BINARY = "${prisma-engines}/bin/query-engine";
      PRISMA_QUERY_ENGINE_LIBRARY = "${prisma-engines}/lib/libquery_engine.node";
      PRISMA_INTROSPECTION_ENGINE_BINARY = "${prisma-engines}/bin/introspection-engine";
      PRISMA_FMT_BINARY = "${prisma-engines}/bin/prisma-fmt";
    };

    meta = with lib; {
      description = "Routine healthcare app for animal shelters";
      homepage = "https://github.com/bddvlpr/petcare";
      license = licenses.bsd3;
      maintainers = with maintainers; [bddvlpr];
    };
  }
