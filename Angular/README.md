
# ANGULAR

# Sumário
1. [TypeScript](#typescript)

# TypeScript

O TypeScript é uma linguagem criada pela Microsoft que vem como uma aprimoração ao próprio JavaScript, de forma que podemos “verificar o código” antes do tempo de execução, ou seja, no tempo de compilação, assim como outras linguagens como Java e C#. <br><br>

O TypeScript faz uma **mágica** que nada mais do que, **escrever em TypeScript** e **traduzir o código para JavaScript** em Runtime!<br><br>

Para utilizar o TypeScript, se faz necessário a instalação do:

*  [Node.js](https://nodejs.org/en/download/);
* [Visual Code](https://code.visualstudio.com/download);

## Getting Started

Como exemplo, estaremos criando a aplicação de um Banco. O projeto segue a estrutura abaixo:

* Atenção aos comandos que devem ser criados posteriormente.

```
├── node_modules
├── package.json
├── tsconfig.json
├── app
│   ├── css
│   │   ├── bootstrap-theme.css
│   │   └── bootstrap.css
│   ├── index.html
│   ├── js
│       ├── controllers
│       ├── helpers
│       ├── models
│       └── views
│   ├── lib
│   │   ├── jquery.min.js
│   │   ├── jquery.min.map
│   │   ├── system-polyfills.js
│   │   ├── system-polyfills.js.map
│   │   ├── system.js
│   │   └── system.js.map
```

## JavaScript vs TypeScript

Como representado anteriormente, a grande diferença entre o JavaScript e o TypeScript está na compilação/verificação do código.

* JavaScript verifica somente o código em **Runtime**;

* TypeScript verifica o código em tempo de **Compilação**;

  <br>

Essa diferença se torna uma GRANDE DIFERENÇA! Vejamos o exemplo abaixo:

* Criar uma classe em JavaScript que tenha os parâmetros: **data,  valor e quantidade**;

  * Regras:
    * Quando instanciado este objeto, será obrigatório ter todos os parâmetros;
    * Só será possível acessar os parâmetros através de métodos Get;
    * Só será possível alterar os parâmetros através de métodos Set;

  ```javascript
  class Negociacao {
  
      constructor(data, quantidade, valor) {
          this._data = data;
          this._quantidade = quantidade;
          this._valor = valor;
      }
  
      get data() {
          return this._data;
      }
  
      get quantidade() {
          return this._quantidade;
      }
  
      get valor() {
          return this._valor;
      }
  
      get volume() {
          return this._quantidade * this._valor;
      }
  
  }
  ```

  Para testar se esta funcionando, iremos criar um `App.js`

  ```javascript
  const negociacao = new Negociacao(new Date(), 1, 100);
  console.log(negociacao);
  ```

  Consultando o Console do Chrome, podemos ver que foi corretamente passado via construtor os parâmetros! **PORÉM**, se formos ver bem, o que acontece se **não passassemos mais os parâmetros?** Iria compilar?

  ```javascript
  const negociacao = new Negociacao();
  console.log(negociacao);
  
  //Teriamos um retorno como variávels UNDEFINED, mas ainda sim iria funcionar!
  
  const negociacao = new Negociacao(new Date(), 1, 100);
  negociacao._quantidade = 3
  console.log(negociacao.quantidade);
  
  //Conseguimos modificar o parâmetro diretamente pela variável! Isto infringe nosso Set!
  ```

Este é um comum problema em JavaScript, não conseguimos **validar** o código **até que executemos.**

## Configurando o TypeScript

Para utilizar o TypeScript, precisamos instalar em nosso projeto o **Compilador**. Para fazer isto:

1. Vamos no terminal, dentro da pasta do projeto;

2. Digite `npm init` _(proveniente do Node.js);_

3. Enter toda vida para criar o arquivo **_package.json_**;

4. Digite `npm i typescript --save-dev` (se atentar a versão do projeto!);
   
1. Será criado a pasta `node_module` e será adicionado ao arquivo `package.json` o TypeScript;
   
5. Altere a pasta “js” para “ts”, bem como todos arquivos `.js` para `.ts`;

7. Crie o arquivo `tsconfig.json` e cole o comando abaixo:

   1. `"outDir": "BankApp/app/js",` -> Aqui será informado onde será criada a pasta JS, proveniente do TS;
   2. `"noEmitOnError": true` -> Não irá gerar o JS enquanto tiver erro;
   3. `"include": [ "BankApp/app/ts/**/*" ] ` -> Diretório dos arquivos TypeScript;
   4. ` "noImplicitAny": true` -> Não permite que o tipo de uma variável seja `Any`;
   5. `"removeComments": true` -> Os comentários não irão para o .js;

   ```json
   {
       "compilerOptions": {
           "target": "es6",
           "outDir": "BankApp/app/js", 
           "noEmitOnError": true,
           "noImplicitAny": true,
           "removeComments": true
       },
       "include": [
           "BankApp/app/ts/**/*"
       ]
   }
   ```

7. Adicione a linha `compile` e `start` no arquivo `package.json`:

   1.  `"compile": "tsc"`-> TSC é o arquivo de compilação do TypeScript;
   2.  `"start": "tsc -w"` -> irá automaticamente compilar o arquivo;

   ```json
   {
     "name": "alurabank",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "compile": "tsc",
       "start": "tsc -w"
     },
     "author": "",
     "license": "ISC",
     "devDependencies": {
       "typescript": "^2.3.2"
     }
   }
   ```

8. Feche o VSCode e Abra novamente;

9. Abra o terminal e digite `npm run compile` 

   1. caso esteja utilizando o `“start" : “tsc -w"` poderá digitar `npm start`;
   2. Irá **APARECER ERROS**, ou seja agora, conseguimos verificar em tempo de **compilação!** não mais em **Runtime** como era no JavaScript;

## Criando o Model

Com o TypeScript configurado, iremos perceber diversos erros no nosso arquivo `Negociacao.ts`, pq agora podemos **enxergar erros**. Então vamos corrigir os erros antigos:

```typescript
class Negociacao {
    private _data: Date;
    private _quantidade: number;
    private _valor: number;

    constructor(data: Date, quantidade: number, valor: number) {
        this._data = data;
        this._quantidade = quantidade;
        this._valor = valor;
    }

    /* Outro modo seria
    constructor(private _data: Date, private _quantidade: number, private _valor: number){} */

    get data(): Date {
        return this._data;
    }

    get quantidade(): number {
        return this._quantidade;
    }

    get valor(): number {
        return this._valor;
    }

    get volume(): number {
        return this._quantidade * this._valor;
    }

}

//-----------------------------------------------------------------
//App.ts
const negociacao = new Negociacao(new Date(), 1, 100);

/* Não irá permitir alterações na propriedade privada*/
negociacao._quantidade = 3

console.log(negociacao.quantidade);
```

## Criando o Controller

Lembrando que sempre iremos alterar/criar os arquivos `.ts`.

* Crie um controlador responsável por ler as requisições da página HTML, dado o form abaixo:

  ```html
  <form class="form">
  
      <div class="form-group">
          <label for="data">Data</label>
          <input type="date" id="data" class="form-control" required autofocus/>
      </div>
  
      <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <input type="number" min="1" step="1" id="quantidade" class="form-control" value="1" required/>
      </div>
  
      <div class="form-group">
          <label for="valor">Valor</label>
          <input id="valor" type="number" class="form-control" min="0.01" step="0.01" value="0.0" required />
      </div>
  
      <button class="btn btn-primary" type="submit">Incluir</button>
  </form>
  ```

Uma vez que temos o `Negociacao.ts` criado, sabemos que para criar um objeto será necessário passar os valores de **data, quantidade e valor**, que neste caso serão provenientes dos IDs do HTML. Quando clicarmos em submit, o formulário terá que adicionar este objeto!

* NegociacaoController

  * Como estamos “pegando” um elemento do HTML, precisamos utilizar a classe `HTMLInputElement` e também será necessário **fazer casting** dos elementos no construtor;
  * Para o tipo:
    * Date: será necessário fazer um `replace` dos caracteres ‘-’ para ‘,’ pois é o formato que o tipo Date entende;
    * Quantidade: `parseInt` para converter para Inteiro;
    * Valor: `parseFlaot` para converter para Float;

  ```typescript
  //NegocicaoController.ts
  	private _inputValor: HTMLInputElement;
      private _inputQuantidade: HTMLInputElement;
      private _inutData: HTMLInputElement;
  
      constructor(){
          this._inutData = <HTMLInputElement> document.querySelector('#data');
          this._inputQuantidade = <HTMLInputElement> document.querySelector('#quantidade');
          this._inputValor = <HTMLInputElement> document.querySelector('#valor');
      }
  
      // a ação ocorrera como um evento, por isso devemos atribuit o 'event'
      add(event: Event): void{
  
          //O preventDefault serve para não recarregar a página
          event.preventDefault();
  
          //Ao executarmos a função add, iremos criar o objeto negociacao
          const negociacao = new Negociacao(
              new Date(this._inutData.value.replace(/-/g, ',')),
              parseInt(this._inputQuantidade.value),
              parseFloat(this._inputValor.value)
          );
          console.log(negociacao);
      }
  }
  
  
  
  //App.ts
  const controller = new NegociacaoController();
  
  // addEventListener irá ficar verificando quando gerar o submit executar a funcao add do controller.
  // o .bind é necessário para que JS entenda que se trata do this.controller
  document
      .querySelector('form')
  	.addEventListener('submit', controller.add.bind(controller));
  ```

  

### Criando a View

Agora que temos a camada de Controller e Model, precisamos encapsular o método para retornar a **Lista de Negociações**;

```typescript
class Negociacoes {

    private _negociacaoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao): void {
        this._negociacaoes.push(negociacao)
    }

    findAll(): Negociacao[] {
        return this._negociacaoes;
    }

}


class NegociacaoController {
    
	private _inputValor: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inutData: HTMLInputElement;
    private _negociacoes: Negociacoes = new Negociacoes;

    constructor(){
        this._inutData = <HTMLInputElement> document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement>  document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement> document.querySelector('#valor');
    }
    
    add(event: Event): void{

        event.preventDefault();

        const negociacao = new Negociacao(
            new Date(this._inutData.value.replace(/-/g, ',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
        
        //negociacao é um objeto composto pelos elementos do HTML
        this._negociacoes.adiciona(negociacao);
        
        //Para testar o retorno da Lista
        this._negociacoes.findAll().forEach(negociacao => {
            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
        })
    }
}
```

Agora que sabemos que estamos conseguindo retornar os elementos do HTML, precisamos **criar o HTML** utilizando o TypeScript!

1. Vamos criar a classe `NegociacoesView`;
2. Esta classe terá **2 métodos**:
   1. `update()` -> irá utilizar do `innerHTML`para adicionar os dados e chamar o método `template()`;
      1. Mas quais dados? O update precisa receber a classe `Negociacoes` que irá conter a lista de `Negociacao`
   2. `template(): String` -> irá retornar o HTML em si utilizando **Template String** do javascript;
3. Após criar o `NegociacoesView` teremos que passar ao Construtor esta classe, para toda vez que o construtor for criado, já seja chamado o método `update()` que então chamará o método `template()`;
4. Como não será utilizado o `<table>` da página `index.html`, precisamos remove-lo e adicionar a referência para a classe `negociacoesView`;

```typescript
class NegociacoesView {
    
    private _seletor: Element;
    
    constructor(seletor: string) {
	     //irá receber a div do index.html
        this._seletor = document.querySelector(seletor);
    }
    
    update(negociacoes: Negociacoes) {
        this._elemento.innerHTML = this.template(negociacoes);
    }

    template(negociacoes: Negociacoes): string {

        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>

                <tbody>

                ${negociacoes
            		.findAll()
            		.map(negociacao => 
                    `
                        <tr>
                          	<td>${negociacao.data.getDate()}
                                /
                                ${negociacao.data.getMonth() + 1}
                                /
                                ${negociacao.data.getFullYear()}
                        	</td>
                        </tr>                        
                    `)
            		.join('')}            
                </tbody>

                <tfoot>
                </tfoot>
            </table>               
        `
    }
}
```



### Passando uma mensagem após inserir

Seguindo o mesmo modelo da View de listagem, podemos criar uma `MensagemView` para que seja encapsulado a mensagem no construtor!

```typescript
class NegociacaoController {
    //demais atributos
    private _mensagemView: MensagemView = new MensagemView('#mensagemView');
    
    constructor(){
        //demais atributos
        
        //Não iremos passar o parâmetro no construtor pq não queremos que apareça
        //a mensagem quando for aberta a página
    }
    
    add(event: Event): void{

       //demais métodos
        this._negociacaoView.update(this._negociacoes);
        
        //iremos solicitar que a mensagem seja enviada logo após ela ser inserida
        this._mensagemView.update('Negociacao inserida com sucesso!');
    }
}


class MensagemView{
    
    private _element: Element;
    
    constructor(seletor:string){
        this._element = document.querySelector(seletor);
    }
    
    update(mensagem:string):void {
        this._element.innerHTML = this.template(mensagem);
    }
    
    template(mensagem:string):string{
        return `<p class="alert alert-info">${mensagem}</p>`
    }
}
```



## Herança e Polimorfismo

A Herança conhecemos muito bem pelo Java, mas funciona com o TypeScript?<br><br>

As duas classes `MensagemView` e `NegociacaoView` possuem métodos e construtor parecidos certo? Já temos um grande sinal de herança e polimorfismo nestes dois!

* Vamos criar a classe `View` que irá receber o construtor e parâmetro:

  ``` typescript
  class View {
  
      protected _elemento: Element;
  
      constructor(seletor:string){
          //querySelector pega o elemento, sendo ID ou class, normalmente sendo uma string
          this._elemento = document.querySelector(seletor);
      }
  }
  
  
  class MensagemView extends View {
      
      update(mensagem:string):void{
          //codigo
      }
      
      template(mensagem:string):string{
          //codigo
      }
  }
  
  class NegociacaoView extends View {
      
      update(mensagem:Negociacoes):void{
          //codigo
      }
      
      template(mensagem:Negociacoes):string{
          //codigo
      }
  }
  ```

  

Analisando as classes `MensagemView` e `NegociacaoView` podemos perceber que os métodos `update() template()` são bem bem parecidos… isso é sinal de **polimorfismo**:

* Será necessário deixar a classe `View` como genérica `View<T>` e como não queremos que ninguém a instancie, iremos deixa-la como `abstract`:
  * Como o método `update()` são iguais, não será necessário repeti-lo nas classes `MensagemView` e `MensagemView`;

```typescript
abstract class View<T> {

    private _elemento: Element;

    constructor(seletor:string){
        //querySelector pega o elemento, sendo ID ou class, normalmente sendo uma string
        this._elemento = document.querySelector(seletor);
    }

    update(mensagem:T):void{
        this._elemento.innerHTML = this.template(mensagem);
    }

    abstract template(mensagem:T): string;
}


class MensagemView extends View<string> {

    template(mensagem: string): string {
        return `<p class="alert alert-info">${mensagem}</p>`
    }
}

class NegociacaoView extends View<Negociacoes>{

    template(negociacoes: Negociacoes): string {
        return `
        <table class="table table-hover table-bordered">
            //abreviado
        </table>               
        `
    }
}
```

* Obs.: Poderíamos indicar mais de um tipo genérico, para o retorno e para o atributo por exemplo:

  ```typescript
  class GenericDAO<T, K> {
  
      adiciona(objeto: T): K {
  
          /* implementação do método omitida */
      }
  
      apaga(objeto: T): void {
  
          /* implementação do método omitida */
      }
  }
  ```

  

## jQuery & TypeScript

Como sabemos, o jQuery é a biblioteca mais utilizada do JavaScript, que nos facilita escrever muito menos, como por exemplo:

* `document.querySelector()` = `$();`

  * `<HTMLInputElement> document.querySelector` = `$()`;

    ```typescript
    document
        .querySelector('.form')
        .addEventListener('submit', controller.add.bind(controller))
    
    //jQuery
    $('.form').submit(controller.add.bind(controller));
    ```

* `.innerHTML()` = `.html()`;

* `.value()` = `val()`;

Para instalar o jQuery será necessário rodar o comando e **reiniciar o VSCode**:

```
npm install @types/jquery@2.0.42 --save-dev
```

Com jQuery:

```typescript
class View<T> {

    private _elemento: jQuery;

    constructor(seletor:string){
        this._elemento = $(seletor);
    }

    update(mensagem:T):void{
        this._elemento.html(this.template(mensagem));
    }

    template(mensagem: T): string {
       throw new Error('Necessário implementar o método template');
    }
}
```



## NameSpace

O `namespace` é um atributo do TypeScript para que nossas classes **saiam do ambiente global**, ou seja, quando damos um namespace a uma classe, teremos de usa-lo.

* Exemplo: Deixando a classe `View` no `namespace View {}`:

  * Obs.: necessário atribuir a nomenclatura `export`

  ```typescript
  namespace Views {
      export abstract class View<T> {
          //CODIGO
      }
  }
      
  namespace Views {
      export class MensagemView extends View<string> {
          //CODIGO
      }
  }  
      
  namespace Views {
      export class NegociacaoView extends View<Negociacoes>{
          //CODIGO
      }
  }    
  ```

Agora quando as classes forem instancia-das no Controller, será necessário informarmos o namespace antes!

```typescript
class NegociacaoController {
   
    private _negociacaoView: Views.NegociacaoView = new Views.NegociacaoView('#negociacoesView');
    private _mensagemView: Views.MensagemView = new Views.MensagemView('#mensagemView');
    
}
```

**O namespace ainda nos faz importar no index.html todos os arquivos .js!**

## Module & Import/Export - Não importa a ordem dos scripts

Diferente do Namespace que nos faz fazer todas as tags `<script>` no `index.html` os módulos, que utilizam o `import` e `export` vão nos possibilitar esse benefícios de não precisar ficar pensando na ordem dos `<scripts>`!

* Aplicando o `import` e `export`:

  ```typescript
  import { MensagemView } from '../views/MensagemView';
  import { NegociacaoView } from '../views/NegociacaoView';
  import { Negociacao } from '../models/Negociacao';
  import { Negociacoes } from '../models/Negociacoes';
  
  export class NegociacaoController {}
  
  
  
  import { Negociacao } from '../models/Negociacao';
  export class Negociacoes {}
  
  
  export class Negociacao {}
  
  
  import { View } from './View';
  import { Negociacoes } from '../models/Negociacoes';
  export class NegociacaoView extends View<Negociacoes>{}
  
  
  import { View } from './View';
  export class MensagemView extends View<string> {}
  ```

Agora que temos os `imports` e `exports` podemos utilizar nosso **loader**, que será proveniente da biblioteca **system.js**:

```html
<script src="lib/jquery.min.js"></script>
<script src="lib/system.js"></script>

<!-- Devemos no import, indicar o primeiro script a ser invocado -->
<script>
    System.defaultJSExtensions = true;
    System.import('js/app.js').catch(err => console.error(err));
</script>
<!-- demais bibliotecas excluidas, pois o import/export fará o processo -->
```

adicionar o comando `“module”: “System”` ao arquivo tsconfig.json:

```json
{
    "compilerOptions": {
        "target": "es6",
        "outDir": "BankApp/app/js", /* Aqui será informado onde será criada a pasta JS, proveniente do TS */
        "noEmitOnError": true,
        "removeComments": true,
        "module": "System"
    },
    "include": [
        "BankApp/app/ts/**/*" /* Diretorio dos arquivos TypeScript */
    ]
}
```

**PORÉM** para que o System funcione, é exigido um servidor! Que no nosso caso será um servidor **lite do Node.js**.

* Vamos instalar o servidor no projeto:

  ```
  npm i lite-server --save-dev
  
  npm i concurrently --save-dev 
  ```

* Vamos alterar o arquivo **_package.json_**:

  * Adicionando o comando abaixo (será necessário trocar o start por watch);

    ```json
    "watch": "tsc -w",
    "server": "lite-server --baseDir=app",
    "start": "concurrently \"npm run watch\" \"npm run server\""
    ```

  ```JSON
  {
      "name": "bankapp",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "compile": "tsc",
          "watch": "tsc -w",
          "server": "lite-server --baseDir=app",
          "start": "concurrently \"npm run watch\" \"npm run server\""
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
          "@types/jquery": "^2.0.42",
          "typescript": "^2.3.2"
      },
      "dependencies": {},
      "description": ""
  }
  ```

  