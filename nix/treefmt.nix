{
  projectRootFile = "flake.nix";

  programs.nixfmt.enable = true;
  programs.biome = {
    enable = true;
    includes = [
      "*.ts"
      "*.tsx"
      "*.js"
      "*.jsx"
      "*.json"
    ];
    excludes = [
      "**/node_modules/**"
    ];
    settings = {
      formatter = {
        indentStyle = "space";
        indentWidth = 2;
      };
      javascript = {
        formatter = {
          quoteStyle = "double";
          semicolons = "asNeeded";
        };
      };
      linter = {
        enabled = false;
      };
    };
  };
}
