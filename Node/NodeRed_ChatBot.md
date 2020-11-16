# NODE-RED ChatBot

Este projeto irá conter:

* Aplicação na IBM Cloud;
* Criar uma página Web e uma API REST;
* IBM Watson (Translate text, analyxe tone, add audio, enviar tweets);
* Criar um Facebook Messenger bot;

## ChatBot

O Chatbot consiste em um programa que responde diversas questões, como um assistente FAQ.

## Getting started

Para instalar o Node-red, precisamos executar:

```bash
npm i -g node-red --unsafe-perm

node-red
```

Após rodar o comando `node-red` será iniciado na porta 1880 o serviço do node-red;<br>

1. Abra o **[IBM Cloud Node-red](https://cloud.ibm.com/developer/appservice/create-app?starterKit=59c9d5bd-4d31-3611-897a-f94eea80dc9f&defaultLanguage=undefined)** e inicie uma aplicação, dando um nome e aguarde a aplicação iniciar;
2. Agora vamos conectar os serviços do Watson (Language translado e Watson Assistant) com nossa aplicação;
   1. Acessaremos o catálogo e criaremos os dois serviços;
3. Para vincular os serviços com o Node-red, basta irmos para o [**IBM Cloud Dashboard**](https://cloud.ibm.com) -> Serviços -> Selecionar o NODE-RED -> Clicar em connections;
4. Em connections iremos criar uma coleção

