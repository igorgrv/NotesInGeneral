# Vue

O `Vue.js` assim como o Angular e React, **é um framework** para criação de **componentes reutilizáveis** e também para criação de **SPAs**. Uma das vantagens desse framework é ter um **_core minimalista de 17kb_**.<br>

Uma das **diferenças em relação ao Angular**, será em como o código é distribuido dentro de cada componente! No Angular, o CSS, HTML e Typescript ficam em arquivos separados, no Vue.js, **todo conteúdo fica em um único file `.vue`** !

## Getting Started

Assim como no Angular, o Vue.js necessita do [Node.js](https://nodejs.org/en/) instalado e do [VSCode](https://code.visualstudio.com/download)!

1. Em um terminal, execute → `npm i -g vue-cli`;
   1. Este comando fará com que seja possível utilizar o Vue.js de **forma global**;
2. Cheque com → `vue --version`;

Com o **Vue-cli** instalado, para criar um projeto:

```bash
 vue init webpack-simple nomeDoProjeto
```

Para rodar o projeto:

```bash
cd igorgram
npm install
npm run dev
```

* O comando `npm run dev` basicamente executa o que esta no `package.json`:

  ```json
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  ```

Será aberto automaticamente o navegador em `http://localhost:8080/` !

<br>

