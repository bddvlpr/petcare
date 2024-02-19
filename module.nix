self: {
  config,
  lib,
  pkgs,
  ...
}: let
  cfg = config.services.petcare;
in {
  options.services.petcare = let
    inherit (lib) mkEnableOption mkPackageOption mkOption types;
    inherit (pkgs.stdenv.hostPlatform) system;
  in {
    enable = mkEnableOption "Petcare";
    package = mkPackageOption self.packages.${system} "default" {};
    nodePackage = mkPackageOption pkgs "nodejs" {};

    envFile = mkOption {
      type = types.path;
      description = "The environment file to be loaded before execution.";
    };

    user = mkOption {
      type = types.str;
      default = "petcare";
      description = "The user to run petcare under.";
    };

    group = mkOption {
      type = types.str;
      default = "petcare";
      description = "The group to run petcare under.";
    };
  };

  config = lib.mkIf cfg.enable {
    systemd.services.petcare = {
      description = "petcare";
      wantedBy = ["multi-user.target"];
      wants = ["network-online.target"];
      requires = ["postgresql.service"];
      after = ["network-online.target" "postgresql.service"];

      serviceConfig = {
        Restart = "on-failure";
        ExecStart = "${lib.getExe cfg.nodePackage} ${cfg.package}/build";
        EnvironmentFile = cfg.envFile;
        User = cfg.user;
        Group = cfg.group;
      };
    };

    users = {
      users.petcare = lib.mkIf (cfg.user == "petcare") {
        isSystemUser = true;
        group = cfg.group;
      };
      groups.petcare = lib.mkIf (cfg.group == "petcare") {};
    };
  };
}
