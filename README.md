# App de finanças (código)

Versão 1.1.0. Este repositório tem **só o código** do app: nenhum dado financeiro.
Os dados ficam no banco do navegador de cada aparelho e entram por importação de arquivo.

- `index.html`: o app inteiro (HTML, CSS e JavaScript embutidos, sem bibliotecas externas).
- `sw.js`: permite abrir sem internet. `manifest.webmanifest` e `icone-*.png`: instalação na tela inicial.
- A política de segurança da página (CSP) bloqueia conexões externas; a única liberada é a API do Google Drive,
  usada só se você ligar a sincronização automática (os dados vão cifrados).

Publicação: GitHub Pages, a partir da raiz da branch principal (Settings › Pages).
