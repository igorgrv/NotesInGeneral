# IntelliJ Community

## Shortcuts

[KeyMaps.pdf](https://resources.jetbrains.com/storage/products/intellij-idea/docs/IntelliJIDEA_ReferenceCard.pdf)

| Shortcuts                     | What does the shortcut do?                                   |
| ----------------------------- | ------------------------------------------------------------ |
| `ctrl + alt + shift + I`      | Este atalho irá permitir **selecionar e inspecionar** o arquivo. |
| `alt + enter`                 | Atalho para o **breakpoint**                                 |
| `alt + 1`                     | Abre/fecha a **aba do projeto** (aba que ficam os arquivos do projeto) |
| `ctrl + space`                | Ira abrir o **autocomplete**                                 |
| `alt + insert`                | Irá abrir a opção de **adicionar arquivo** (digitando é possível add outros arquivos) + <br />Dentro do arquivo irá **dar sugestões de ações** (getter ans setters, constructor) |
| `alt + shift + F10`           | **Run** para a primeira vez                                  |
| `shift + F10`                 | **Run** no mesmo arquivo executado pela ultima vez           |
| `sout`                        | `System.out.println()`                                       |
| `ctrl + y`                    | **Deleta a linha**;                                          |
| `alt + enter`                 | **Cria métodos/classes** (diferente do autocomplete)         |
| `ctrl + shift + arrow`        | **Move linhas** para cima ou para baixo                      |
| `alt + shift + insert`        | Abre a **seleção** de **multiplas linhas**                   |
| `alt + arrow (left || right)` | **Navega** entre **abas**                                    |
| `ctrl + shift + F12`          | **Expande** a aba                                            |
| `ctrl + n`                    | **Find** dos arquivos do projeto                             |
| `ctrl + F14`                  | **Fecha** a aba                                              |
| `ctrl + d`                    | **Duplica** a linha                                          |
| `ctrl + shift + a`            | Abre **tudo** que o intellij fornece                         |
| `ctrl + b`                    | Abre a **classe selecionada**                                |
| `alt + shift + x`             | **Fecha** todas as abas                                      |
| `ctrl + alt + L`              | **Identa** o código                                          |
| `F5`                          | **Copia** a classe selecionada                               |
| `shift + F6`                  | **Refatora** o valor selecionado                             |
| `ctrl + alt + M`              | **Extrai** valor selecioando para um novo **método**         |
| `shift shift`                 | **Busca** geral                                              |
| `ctrl + shift + F`            | **Busca** em texto/palavra                                   |
| `ctrl + F12`                  | **Mostra** os métodos da classe                              |
| `alt + F7`                    | **Mostra** onde o método/classe está sendo utilizado         |
| `ctrl + shift + alt + T`      | **Refactors** (irá ter diversas formas de gerar uma classe para o método, gerar uma interface entre outras implementações!) |
| `ctrl + shift + alt + S`      | **Abre** o build path                                        |
| `ctrl + w` (2x)               | **Seleciona**  todo o método                                 |



# VSCode

[VSCode Java Developer](https://aka.ms/vscode-java-installer-win) -> Kit para instalação e configuração de projetos Java;

## Tomcat + Maven

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/vscodetomcat.png?raw=true" alt="vscodejava" style="zoom:67%;" />

## Shortcuts

[Shortcuts keybord.pdf](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

| Shortcuts                                | What does the shortcut do?                                   |
| ---------------------------------------- | ------------------------------------------------------------ |
| `ctrl + shift + t`                       | **Abre** todos shortcuts                                     |
| `ctrl + shift + p`                       | **Abre** pesquisa de configurações e classes<br />Ex.: `>java:` -> irá abrir várias opções de serviços no Java |
| `ctrl + shift + k ` | `comd + shift + k` | **Deleta** a linha                                           |
| `shift + alt + f`                        | **Identa** o código                                          |
| `ctrl + e`                               | **Abre** arquivo                                             |
| `ctrl + .`                               | **QuickFix**                                                 |
| `F5`                                     | **Run**                                                      |
| `ctrl + shift + e`                       | **Painel** explorer (onde ficam os códigos)                  |
| `ctrl + shift + g`                       | **Painel** git                                               |
| `ctrl + shift + f`                       | **Painel** pesquisa                                          |
| `ctrl + '`                               | **Painel** terminal                                          |
| `shift + alt + o`                        | Organiza **Imports**                                         |
| `command + b`                            | **toggle** painel                                            |

## settings.json

```json
{
    "javascript.preferences.quoteStyle": "single",
    "typescript.preferences.quoteStyle": "single",
    "typescript.updateImportsOnFileMove.enabled": "always",

    "window.zoomLevel": 0,
    "editor.autoIndent": "full",
    "editor.codeLens": false,
    "editor.cursorBlinking": "solid",
    "editor.cursorSmoothCaretAnimation": true,
    "editor.cursorStyle": "line",
    "editor.fontLigatures": true,
    "editor.formatOnPaste": true,
    "editor.formatOnType": false,
    "editor.minimap.enabled": false,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "on",
    "editor.tabSize": 2,
    "editor.wordWrap": "on",

    "workbench.colorTheme": "Atom One Dark",
    "prettier.printWidth": 120,
    "prettier.bracketSpacing": true,
    "prettier.singleQuote": true,
}
```

## extensions.json

```json
{
    "recommendations": [
        "mikael.angular-beastcode",
        "johnpapa.angular-essentials",
        "akamud.vscode-theme-onedark",
        "steoates.autoimport",
        "ms-azuretools.vscode-docker",
        "eamodio.gitlens",
        "vscjava.vscode-java-pack",
        "gabrielbb.vscode-lombok",
        "pkief.material-icon-theme",
        "pivotal.vscode-boot-dev-pack",
        "adashen.vscode-tomcat",
    ],
    "unwantedRecommendations": []
}
```

## jsconfig.json

Utiilzado para informar o projeto o autocomplete para javascript!

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules"]
}
```



### Plugins

* Angular Essentials;
* Docker;
* [Tomcat For Java (0.11.2)](https://marketplace.visualstudio.com/items?itemName=adashen.vscode-tomcat);
* Spring Boot Extension Pack;
* Lombok Annotation;
* Snippets (HTML, Angular, css, javascript);
* Typescript Hero;
* Tslint;
* Path Intellisense;
* Typescript importer;
* Prettier;

## JavaScript Check

Adicionando `//@ts-check` no inicio dos arquivos `.js` será feita uma validação do código (sem ser em tempo de execução!);

```javascript
//@ts-check
const express = requie('express'); //irá reclamar pq é 'require'
```

