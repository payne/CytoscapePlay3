{ pkgs }: {
  deps = [
    pkgs.tig
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}