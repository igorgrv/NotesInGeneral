# Sumário
1. [TypeScript](#typescript)
2. [WebPack](#webpack)
3. [Angular](#angular)

# TypeScript <a name="typescript"></a>

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

​	* Caso o VSCode continue sem encontrar as extensões, será necessário reinstalar os pacotes (apagando a pasta node_modules e o arquivo package.json);

```
npm i @types/jquery@2.0.42 --save-dev
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



### Importação em Barri

E se, invés de fazermos diversos `imports` de uma mesma pasta, importássemos com uma única linha? Exemplo:

```typescript
//COMO ESTA:
import { MensagemView } from '../views/MensagemView';
import { NegociacaoView } from '../views/NegociacaoView';
import { Negociacao } from '../models/Negociacao';
import { Negociacoes } from '../models/Negociacoes';

//O QUE QUEREMOS:
import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes } from '../models/index';
```

Através de um arquivo `index.ts` podemos passar todos os arquivos daquela mesma pasta!

```
├── ts
│   ├── views
│   │   ├── MensagemView.ts
│   │   ├── NegociacaoView.ts
│   │   ├── View.ts
│   │   └── index.ts --> arquivo chave
│   │
│   ├── models
│   │   ├── Negociacao.ts
│   │   ├── Negociacoes.ts
│   │   └── index.ts --> arquivo chave
```

declaração nos arquivos `index.ts` **de cada pasta**:

```typescript
//PASTA VIEW
export * from './View';
export * from './MensagemView';
export * from './NegociacoesView';


//PASTA MODELS
export * from './Negociacao';
export * from './Negociacoes';
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

  

## StrictNullCheck

No mundo Java, quase recebemos uma variável do tipo `null`, o Java na hora reclama com um `NullPointerException`, porém no TypeScript, por padrão, variáveis do tipo boolean, arrays, permitem receber os tipos `null` e `undefined`.<br><br>

E como impedir que isto ocorra?

* No `tsconfig.json` iremos ativar a propriedade `“StrictNullCheck" = true`;

  * Com essa propriedade, somente se falarmos ao TypeScript que a variável é nula, que ele irá permitir que o atributo seja mudado.

  ```json
  {
      "compilerOptions": {
          "target": "es6",
          "outDir": "BankApp/app/js", 
          "noEmitOnError": true,
          "removeComments": true,
          "module": "System",
          "strictNullChecks": true
      },
      "include": [
          "BankApp/app/ts/**/*"
      ]
  }
  ```

  	* Se pegarmos um elemento do HTML e ele não existir, teremos que verificar agora, pq o `strickNullChecks` irá reclamar

  ```typescript
  // Antes
  const elCartao: HTMLDivElement = <HTMLDivElement> document.querySelector('#cartao_1');
  let elPaiDoPai = elCartao.parentElement.parentElement;
  
  // Depois
  const elCartao: HTMLDivElement = <HTMLDivElement> document.querySelector('#cartao_1');
  let elPaiDoPai;
  if(elCartao.parentElement) {
      elPaiDoPai = elCartao.parentElement.parentElement;
  }
  console.log(elPaiDoPai);
  ```

  * O mesmo vale para `Arrays`, pois precisaremos informar qual o tipo de Array para que não fique como `undefined`:

  ```typescript
  // Antes
   paraArray(): Negociacao[] {
       return [].concat(this._negociacoes);
   }
  
  // Depois
  paraArray(): Negociacao[] {
      return ([] as Negociacao[]).concat(this._negociacoes);
  }
  ```



## Enums

O Enum no TypeScript funciona igual no Java.

* Exemplo: Vamos bloquear que negociações sejam feitas aos Sábados e Domingos:

  ```typescript
  // NegociacaoController
  adiciona(event: Event) {
  
      event.preventDefault();
  
      let data = new Date(this._inputData.val().replace(/-/g, ','));
  
      if(data.getDay() == 0 || data.getDay() == 6) {
  
          this._mensagemView.update('Somente negociações em dias úteis, por favor!');
          return 
      }
      
       const negociacao = new Negociacao(
           data, 
           parseInt(this._inputQuantidade.val()),
           parseFloat(this._inputValor.val())
       );
      
      //DEMAIS CODIGO
  }
  ```

  Mas e se invés do `getDay() == 0` quiséssemos deixar mais nítido que se trata de um Sábado ou Domingo? **Podemos usar enums!**

  ```typescript
  enum DiaDaSemana {
      Domingo, //por padrão o Enum entende que se começa com 0
      Segunda, // 1
      Terca,
      Quarta, 
      Quinta, 
      Sexta, 
      Sabado, // 6 
  }
  
  // NegociacaoController
  adiciona(event: Event) {
  
      event.preventDefault();
  
      let data = new Date(this._inputData.val().replace(/-/g, ','));
  
      if(data.getDay() == DiaDaSemana.Sabado || data.getDay() == DiaDaSemana.Domingo) {
  
          this._mensagemView.update('Somente negociações em dias úteis, por favor!');
          return 
      }
  
      const negociacao = new Negociacao(
          data, 
          parseInt(this._inputQuantidade.val()),
          parseFloat(this._inputValor.val())
      );
      
      //DEMAIS CODIGO
  }
  ```

  Para melhorar ainda mais o código, podemos encapsular todo esse `if`, criando um método privado chamado `ehDiaUtil(Date data)`:

  ```typescript
  import { NegociacoesView, MensagemView } from '../views/index';
  import { Negociacao, Negociacoes } from '../models/index';
  
  export class NegociacaoController {
  
      private _inputData: JQuery;
      private _inputQuantidade: JQuery;
      private _inputValor: JQuery;
      private _negociacoes = new Negociacoes();
      private _negociacoesView = new NegociacoesView('#negociacoesView');
      private _mensagemView = new MensagemView('#mensagemView');
  
      constructor() {
          this._inputData = $('#data');
          this._inputQuantidade = $('#quantidade');
          this._inputValor = $('#valor');
          this._negociacoesView.update(this._negociacoes);
      }
  
      adiciona(event: Event) {
  
          event.preventDefault();
  
          let data = new Date(this._inputData.val().replace(/-/g, ','));
  
          if(!this.ehDiaUtil(data)) {
              this._mensagemView.update('Somente negociações em dias úteis, por favor!');
              return
          }
  
          const negociacao = new Negociacao(
              data,
              parseInt(this._inputQuantidade.val()),
              parseFloat(this._inputValor.val())
          );
  
          this._negociacoes.adiciona(negociacao);
  
          this._negociacoesView.update(this._negociacoes);
          this._mensagemView.update('Negociação adicionada com sucesso!');
      }
  
      private ehDiaUtil(data: Date):boolean {
          if(data.getDay() == DiaDaSemana.Domingo || data.getDay() == DiaDaSemana.Sabado){
              return false;
          } else {
              return true;
          };
      }
  }
  
  enum DiaDaSemana {
      Domingo, //por padrão o Enum entende que se começa com 0
      Segunda, // 1
      Terca,
      Quarta,
      Quinta,
      Sexta,
      Sabado, // 6
  }
  ```

  

## Decorators

Se lembra das anotações do Java? O Decorator do TypeScript funciona da mesma maneira! com o `@AlgumaCoisa` podemos falar para executar determinada função, porém teremos que criar nossas anotações.<br>

<br>

Adicione a anotação `"experimentalDecorators": true` no `tsconfig.ts`:

```json
{
    "compilerOptions": {
        "target": "es6",
        "outDir": "./app/js",
        "noEmitOnError": true,
        "removeComments": true,
        "module": "System",
        "strictNullChecks": true,
        "experimentalDecorators": true
    },
    "include": [
        "./app/ts/**/*"
    ]
}
```

A ideia seria algo parecido com:

```typescript
class NegociacaoController {

    @tempoDeExecucao()
    adiciona(event:Event) {
        //codigo
    }
}

class View {
    
    @tempoDeExecucao()
    update(){
        //Codigo
    }
}
```

<br>

Para criar o decorator:

1. Crie a pasta **helpers**;

2. Dentro da pasta, crie a classe Decorator, com o nome da anotação;

3. Como padrão, um decorator segue o código base abaixo:

   ```typescript
   export function padraoDecorator() {
   
       return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
   
           const metodoOriginal = descriptor.value;
   
           descriptor.value = function(...args: any[]) {
                   console.log('-----------------------')
                   console.log(`Parms do mét. ${propertyKey}:${JSON.stringify(args)}`);
                   const resultado = metodoOriginal.apply(this, args);
                   console.log(`Resultado do método: ${JSON.stringify(resultado)}` )
                   console.log('-----------------------')
                   return resultado;
               }
   
           return descriptor;
       }
   }
   ```

   

### Criando um Decorator para verificar Tempo De Execucao

Decorator: `tempoDeExecucao()`

```typescript
export function tempoDeExecucao() {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {
            console.log('-----------------------')
            console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
            const t1 = performance.now();
            const resultado = metodoOriginal.apply(this, args);
            console.log(`Resultado do método: ${JSON.stringify(resultado)}` )
            const t2 = performance.now();
            console.log(`${propertyKey} demorou ${t2 - t1} ms`);
            console.log('-----------------------')
            return resultado;
        }

        return descriptor;
    }
}
```

NegociacaoController:

```typescript
class NegociacaoController {
    @tempoDeExecucao()
    adiciona(event: Event) {

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this.ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return
        }
    //code
    }
}
```



## Consumindo API e Uso de Interfaces

O exemplo de API que será consumida, será [este](https://s3.amazonaws.com/caelum-online-public/typescript/api.zip). Onde iremos implementar a mesma aplicação de Negócios porém, como se fosse um sistema legado.<br><br>

Para utilizar a API, devemos deixa-la executando em um segundo terminal (executar comando `npm start`). Para acessa-la podemos utilizar a URL: `http://localhost:8080/dados`;<br><br>

O .json que irá retornar da API:

	* montante = valor;
	* vezes = quantidade;

```json
[{"montante":200.5,"vezes":2},{"montante":100.2,"vezes":5},{"montante":50.5,"vezes":1},{"montante":70.5,"vezes":2}]
```

<br>

UM meio de consumir a API, será através de um botão:

```html
<button class="btn btn-primary" type="submit">Incluir</button>
<button id="botao-importa" class="btn btn-primary" type="button">Importar</button>
```



# WebPack <a name="webpack"></a>

O WebPack trata-se de module bundler que "empacota" módulos para carregá-los na aplicação. Ele é voltado para a criação de **“Single Pages Application” (SPA -> Páginas que não recarregam)**, sendo utilizado pelo [Angular CLI](https://cli.angular.io/), [Vue CLI](https://github.com/vuejs/vue-cli) e [Create React App](https://github.com/facebookincubator/create-react-app).<br><br>

Imagine, não precisar importar na mão, bibliotecas **JavaScript, Css entre outras?** Esta ferramenta faz tudo isto para nos!

## Getting Started

1. Baixe o projeto [aqui](https://s3.amazonaws.com/caelum-online-public/webpack/stages/01-projeto-webpack.zip);
2. Entre no diretório `projeto-webpack/client` e execute o comando no terminal:
   1. `npm i`
   2. `npm run watch`;
3. Entre no diretório `projeto-webpack/server` e execute o comando no terminal `npm start`;

## SPA

O conceito de SPA é lindo, porém se não tomarmos cuidado, o primeiro acesso a página pode ser doloroso ao usuário, uma vez que a página carrega todas as bibliotecas, além do tempo que o interpretador pode levar para parsear todos os arquivos…<br><br>

Para isto, o WebPack, permite dividir a aplicação em bundles menores, carregando aquilo que somente for de fato utilizado!

## Configurando o WebPack

O WebPack dispensa a utilização de outros loaders, justamente porque ele cria loaders em tempo de desenvolvimento, ou seja, em nosso projeto, não utilizaremos a linha de comando:

1. Vamos apagar a pasta `app` (deixar somente a pasta `app/src`);
2. No arquivo `index.html`, remover a linha abaixo:

```html
<script>
    System.defaultJSExtensions = true;
    System.import('js/app.js').catch(err => console.error(err));
</script>
```

3. E adicionar a linha abaixo, deixando somente os `scripts` abaixo:

```html
<script src="node_modules/reflect-metadata/Reflect.js"></script>
<script src="dist/bundle.js"></script>
```

* WebPack, também dispensará o uso do `App.ts` bem como a importação de bibliotecas css e js. Sendo assim, precisamos configurar o nosso projeto dentro da pasta `package.json`;

4. Dentro do arquivo `package.json` - removeremos o `systemjs` e o `babel-cli` , através dos comandos:

   ```
   npm un babel-cli --save-dev
   npm un systemjs --save
   npm un babel-plugin-transform-es2015-modules-systemjs --save-dev
   
   npm i webpack@3.1.0 babel-core@6.25.0 --save-dev
   npm i babel-loader@7.1.0 --save-dev
   ```

5. Adicionaremos o comando abaixo:

   ```json
   "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "build-dev": "webpack --config webpack.config.js"
   },
   ```

6. Criaremos o arquivo `webpack.config.js`

   ![novo arquivo criado](https://s3.amazonaws.com/caelum-online-public/Webpack/1.7_1_novo+arquivo+criado.png)

6. Que terá o código abaixo:

   ```javascript
   const path = require('path');
   module.exports = {
       entry: './app-src/app.js',
       output: {
           filename: 'bundle.js',
           path: path.resolve(__dirname, 'dist')
       },
       module: {
           rules: [
               {
                   test: /\.js$/,
                   exclude: /node_modules/,
                   use: {
                       loader: 'babel-loader'
                   }
               }
           ]
       }
   }
   ```

7. Agora no terminal, iremos subir o servidor novamente, acessando a pasta `projeto-webpack/cli` e digitando o comando:

   ```
   npm run build-dev
   ```



# Angular<a name="angular"></a>

Preparando o ambiente, recursos necessários:

* Angular CLI;

  ```
  npm install -g @angular/cli
  ```

* [Node.js](https://nodejs.org/en/download/);

* [Visual Code](https://code.visualstudio.com/download);

## Sobre o Angular

O Angular é um Framework SPA, que nos permite criar componentes reutilizáveis que encapsulam sua apresentação e comportamento. O Angular utiliza o TypeScript, ou seja, tem tudo o que o JavaScript possui com outros recursos, como suporte a uma linguagem tipada!

* Considerações sobre o uso do Angular: 
  * O Angular sempre trabalha com as duas últimas versões do navegador.
  * O **Angularjs** foi a versão `1.x` enquanto a partir da versão `2.x` foi chamado somente de **Angular**, cujo o código foi totalmente reescrito.

### Plug-ins VSCode

* Auto Import;
* Atom Dark Theme;
* Angular snippets;
* Material icon theme;
* Html snippets;
* Angular 10 snippets;
* Angula extension pack;

### Debug no Angular

Com o plug-in **Debugger for Chrome** instalado, iremos na aba `Debug` do VSCode:

1. Clicaremos em **create a launch.json**;
2. Colocaremos a porta **4200**;
3. Iniciaremos o servidor com o `ng server`;
4. Colocaremos os breakpoints;
5. Daremos ‘play’ no Debug;

## Criando um projeto

Após ter realizado a instalação do Angular pelo comando `npm i -g @angular/cli`, devemos criar um projeto seguindo os comandos abaixo:

```
ng new seu-projeto
cd seu-projeto
ng serve --open
```

Caso de um erro no comando `ng serve --open` devemos reinstalar o `rxjs` com o comando:

  `npm i rxjs@6.0.0 --save` 

## Componentes

No Angular, como falado anteriormente, todo comportamento e visual é encapsulado dentro de **componentes**, ou seja, se abrirmos o `index.html`, encontraremos o código abaixo:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularPicture</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

Onde a TAG `<app-root></app-root>` demonstra ser um componente Angular! Onde todo código **CSS, .JS e HTML** esta encapsulado internamente!

* Para verificar o componente, podemos acessar a pasta `src/app/app.component.ts`:

  ```typescript
  import { Component, OnInit } from '@angular/core';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit{
    title = 'angular-picture';
  }
  ```

  Entendendo as TAGs:

  * `@Component({})` -> é um decorator que declara a classe como um componente;
    * `selector` -> é a TAG que pode ser utilizada em templates;
    * `templaetUrl` -> é onde ficará o HTML;
    * `styleUrls` -> é onde ficará o CSS;

### Bindings

- **Property binding** i.e. `[]` required to evaluate values
- **Model binding** i.e. `[()]` required nothing special
- **Interpolation binding** i.e. `{{}}` could be used with general attributes
- **Event binding** i.e. `()` worked great with functions

Assim como o Java possui a ExpressionLanguage, o Angular possui o **AngularExpression**, que utiliza como atalho o `{{ }}`.  Então, quando nosso componente declarar uma variável com o nome `title`, esta variável poderá ser acessada no HTML, utilizando `{{ title }}`;

* Exemplo:

  ```typescript
  import { Component, OnInit } from '@angular/core';
  
  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent implements OnInit{
    title = 'angular-picture';
  }
  
  ```

  ```HTML
  <!-- app.component.html -->
  testando a TAG {{ title }}
  ```

  

**PORÉM**, quando formos utilizar o **AE (AngularExpression)** em TAGs HTML, precisaremos colocar os elementos do HTML entre `[]`:

* Exemplo:

  ```typescript
  export class AppComponent implements OnInit{
    title = 'angular-picture';
    urlTeste = 'https://arquivo.devmedia.com.br/noticias/documentacao/documentacao_angular-cli-instalacao_38247.png';
    altTeste = 'foto do angular cli';
  }
  ```

  ```html
  testando a TAG {{ title }}
  <img [src]="urlTeste" [alt]="altTeste">
  ```



### Adicionando outros Componentes

Vamos supor que queremos utilizar uma AE, com o nome de `<ap-photo></ap-photo>` que irá automaticamente carregar o código HTML e CSS abaixo:

```html
<img src="minhaURL" alt="meuAlt" />
```

Para isto, iremos ter que criar um novo Componente:

1. Crie a pasta com o nome do componente, no nosso caso: `photo`;

2. Digite o comando `ng g c photo/nomeDoComponente` (no nosso caso `photo`);

3. Será criado os arquivos `.html, .css e .ts`;

4. Dentro do arquivo `photo.component.ts` iremos criar o atalho `<ap-photo>` utilizando **AE**.

   ```typescript
   import { Component, OnInit } from '@angular/core';
   
   @Component({
     selector: 'ap-photo',
     templateUrl: './photo.component.html',
     styleUrls: ['./photo.component.css']
   })
   export class PhotoComponent {
     url = 'https://arquivo.devmedia.com.br/noticias/documentacao/documentacao_angular-cli-instalacao_38247.png';
     descricao = 'teste';
   }
   ```

5. Adicionaremos no arquivo `photo.component.html` o HTML que irá ser carregado ao chamar a TAG `<ap-photo>`:

   ```html
   <p>photo works!</p>
   <img [src]="url" [alt]="description">
   ```

6. Para que funcione na URL raiz, iremos adicionar no `app.component.html` a TAG URL:

   ```html
   <ap-photo></ap-photo>
   ```

7. Em `app.module.ts` foi adicionado (se não foi, devemos adicionar) o componente:

   ```typescript
   @NgModule({
     declarations: [
       AppComponent,
       PhotoComponent
     ],
   ```

## Instalando Bootstrap e outros

Utilizando projetos com Angular, **não adicionamos URLs “na mão”**, ou seja, se queremos adicionar o bootstrap, teremos que utilizar o `npm i boostrap`  e assim será para todas as outra bibliotecas que iremos utilizar.<br><br>

Para **adicionar** ao projeto, teremos que ir até o arquivo `angular.json` e adicionar dentro das TAGS `style` se for uma biblioteca CSS ou dentro de `script` se for biblioteca JS.

* Adicionando o Bootstrap:

  * Rodamos o comando `npm i boostrap`;

  * Adicionamos dentro do arquivo `angular.json` o comando abaixo:

    ```json
     "styles": [
         "src/styles.css",
         "node_modules/bootstrap/dist/css/bootstrap.min.css"
     ],
    "scripts": []
    ```

  * Testando:

    ```html
    testando a TAG {{ title }}
    <img class="img-thumbnail" [src]="urlTeste" [alt]="altTeste">
    ```

    * Caso não funcione, devemos adicionar no `style.css` a TAG abaixo:
    
      ```css
      @import "~bootstrap/dist/css/bootstrap.css"
      ```

## Componente Dinâmico

Voltando na TAG `<ap-photo></ap-photo> ` não estamos podendo ficar mudando a URL, pq se tornou algo fixo no arquivo `photo.component.html`, mas e se fosse possível fazer:

```html
<ap-photo url="novaURL" description="Nova Descrição"></ap-photo>
```

Para que isto seja possível, temos que declarar as variáveis do `photo.component.ts` com a anotação `@input()` e deixa-las em branco:

```typescript
export class PhotoComponent {
    @Input() description='';
    @Input() url='';
}
```

```html
//photo.component.html
<p>photo works!</p>
<img [src]="url" [alt]="description">
```

Assim, no `app.component.html` podemos utilizar o que quisermos!:

```html
<ap-photo url="https://miro.medium.com/max/3200/1*7UAtB_mAAVYC8ju_cb7gcQ.png" description="teste"></ap-photo>
```

### Organizando Componentes em Modulos

Todo componente precisa de um módulo para poder funcionar. Para que o projeto não fique cheio de declarations no `app.module.ts`, podemos criar um **modulo** que será responsável por possuir os componentes relacionados a `photo`:

1. Vamos criar a pasta photos e executar o comando `ng g m photos` -> este comando irá criar o arquivo `photos.module.ts`;

2. Dentro do arquivo `photos.module.ts` teremos de declarar o componente `photo.component` (será necessário importa-lo);

   ```typescript
   import { NgModule } from '@angular/core';
   import { PhotoComponent } from './photo/photo.component';
   
   
   @NgModule({
     declarations: [ PhotoComponent ],
     exports: [ PhotoComponent ]
   })
   export class PhotosModule { }
   ```

3. Agora dentro do arquivo `app.module.ts`:

   ```typescript
   @NgModule({
     declarations: [
       AppComponent
     ],
     imports: [
       BrowserModule,
       PhotosModule
     ],
   ```



## Reproduzindo uma Lista

Para exibir no navegador, iremos criar um `Array` de Photos, de forma que seja exibida todas as fotos no navegador, porém, não queremos ficar fazendo cópia e cola, queremos passar o array e com um único `<ap-photo>` aparecer todas as fotos;

1. Vamos criar array de `Photos` na classe `app.component.ts`:

   1. Iremos passar os parâmetros que o `<ap-photo>` pede

   ```typescript
   photos = [
       {
         url:'linkImagem1',
         description:'igor'
       },
       {
         url:'linkDaImagem2',
         description:'igor2'
       }
     ]
   ```

2. No Arquivo `app.component.html`, utilizaremos a **diretiva** `*ngFor`, que espera receber os parâmetros do Array no `app.component.ts`:

   ```html
   <ap-photo
       *ngFor="let photo of photos"
       [url]="photo.url"
       [description]="photo.description">
   </ap-photo>
   ```

   

## Angular e API

A API que será utilizada, será [esta](https://s3.amazonaws.com/caelum-online-public/865-angular/api.zip), que irá retornar as fotos dos usuários baseado em um link. Para rodar a API, temos:

1. Descompactar o arquivo;

2. Acessar via terminal o diretório e executar o comando `npm install`; 

3. Depois de instalar, executar `npm start`;

   1. Caso dê erro, será necessário verificar as instalações com `npm i xxxx`:

      ```
      npm i sqlite3 jsonwebtoken jimp multer cors express
      ```

<br>

Para iniciarmos, primeiro precisaremos importar o `HTTPClientModule` dentro do nosso arquivo `app.module.ts`, desta forma, poderemos utilizar desta biblioteca para fazer as comunicações com a API!

```typescript
import { HttpClientModule } from '@angular/common/http'

import { PhotosModule } from './photos/photos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    HttpClientModule
  ],
```

Injetando dentro do `app.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(http:HttpClient){
    console.log(http);
  }
}
```



### Recebendo Lista da API

Nossa URI que será consumida por enquanto será `http://localhost:3000/flavio/photos`.

1. Dentro do `app.component.ts`, iremos utilizar o `HTTPClient` para pegar um `Observable`;

   ```typescript
   export class AppComponent implements OnInit {
   
     photos = [];
       
     constructor(http:HttpClient){
       http
         .get('ttp://localhost:3000/flavio/photos').subscribe()
     }
   
   }
   ```

2. Dentro do `subscrive` iremos receber o retorno da API, que iremos colocar dentro do array `photos[]`

   ```typescript
   .subscribe(photos => this.photos = photos);
   ```

3. Isto retornará um erro, pq o TypeScript não aceita o tipo Any[]. Sendo assim, colocar o tipo de `photos` como `Object`:

   ```typescript
   export class AppComponent implements OnInit {
   
     photos: Object[] = [];
   
     constructor(http:HttpClient){
       http
         .get<Object[]>('http://localhost:3000/flavio/photos')
         .subscribe(photos => this.photos = photos);
     }
   
   }
   ```

4. Como nossa classe `app.component.html` já está com os parâmetros igual ao da API (`url` e `description`), o navegador vai automaticamente exibir todas as imagens do link!



### Utilizando Service

Como já vimos anteriormente com o TypeScript, não é uma boa prática manter acessos a banco de dados/APIs diretamente em uma classe, o ideal é criar um `Service` que contenha este acesso, de forma que caso seja necessário alterar algo, seja alterado somente nesta classe `service`.

1. Digite o comando `ng g s photos/photo` -> será criado o arquivo `photo.service.ts`;

2. A classe Service, com o decorator `@Injectable` que vêm do pacote `@Angular/core`:

   ```typescript
   import { Injectable } from '@angular/core';
   
   const API = 'http://localhost:3000/';
   
   @Injectable({providedIn: 'root'})
   export class PhotoService {
   
   }
   ```

3. No construtor, iremos receber o `HTTPClient` e iremos criar o método `listFromUser()` que irá receber um usuário e retornar um `Observable`:

   ```typescript
   @Injectable({ providedIn: 'root' })
   export class PhotoService {
   
       constructor(private http: HttpClient) {
           this.http = http;
       }
   
       listFromUser(username: string) {
           return this.http
               .get<Object[]>(API + username + '/photos');
       }
   
   }
   ```

4. Agora precisamos alterar o arquivo `app.component.ts` para que ele utilize o `service` :

   ```typescript
   export class AppComponent implements OnInit{
   
     photos: Object[] = [];
   
     constructor(private photoService: PhotoService) {  }
     
     ngOnInit(): void {
       this.photoService
         .listFromUser('flavio')
         .subscribe(photos => this.photos = photos);
     }
   
   }
   ```

   

### Utilizando Interface

Para padronizar o retorno da API, a melhor forma é com uma Interface, que irá representar o .json da API:

1. Crie a interface `photos/photo/photo.ts`:

   ```typescript
   export interface Photo {
       id:number;
       postDate:Date;
       url:string;
       description:string;
       allowComments:boolean;
       likes:number;
       comments:number;
       userId:number;
   }
   ```

2. Altere o método `listFromUser` da classe `photo.service`, que não irá receber mais um `get<Any[]>` e sim a interface `photo[]`;

   ```typescript
   import { Photo } from './photo';
   
   const API = 'http://localhost:3000/';
   
   @Injectable({ providedIn: 'root' })
   export class PhotoService {
   
       constructor(private http: HttpClient) {
           this.http = http;
       }
   
       listFromUser(username: string) {
           console.log(API + username + '/photos');
           return this.http
               .get<Photo[]>(API + username + '/photos');
       }
   
   }
   ```



## Rotas de Acesso

### Organizando o código

Iremos retirar todo o código do `app.component.ts` e deixar em um componente específico da página que lista as fotos, desta forma, seguiremos o padrão **para cada página um componente** e também tiramos a responsabilidade do `app.component.ts` .

1. Crie através do comando `ng g c photos/photo-list` o componente de lista;
2. Mova o código do `app.component.ts` para o `photo-list.component.ts`;
3. Para que funcione o método `*ngFor` precisamos importar no `photos.module.ts` a classe `CommonMondule`;

### Acessando componentes pela URL

A ideia é de que ao acessar `localhost:3000/user/flavio` exiba a lista, e quando acessarmos `p/add` abra o formulário, mas por enquanto, não mapeamos nenhuma **rota**.

* Mapeando rotas:

  1. Abra o arquivo `app-routing.module.ts`;

  2. Dentro da `const routes[]` iremos adicionar todos os caminhos, passando a variável `path` que irá receber o caminho e a variável `component` que irá especificar qual o Componente que será aberto:

     ```typescript
     import { NgModule } from '@angular/core';
     import { Routes, RouterModule } from '@angular/router';
     import { PhotoListComponent } from './photos/photo-list/photo-list.component';
     import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
     
     
     const routes: Routes = [
       { path: 'user/flavio', component: PhotoListComponent },
       { path: 'p/add', component: PhotoFormComponent}
     ];
     
     @NgModule({
       imports: [RouterModule.forRoot(routes)],
       exports: [RouterModule]
     })
     export class AppRoutingModule { }
     ```

  3. No arquivo, `app.module.ts` é necessário estar importando o `AppRoutingModule`:

     ```typescript
     import { BrowserModule } from '@angular/platform-browser';
     import { NgModule } from '@angular/core';
     import { AppComponent } from './app.component';
     import {AppRoutingModule} from './app-routing.module';
     
     import { PhotosModule } from './photos/photos.module';
     
     @NgModule({
       declarations: [
         AppComponent
       ],
       imports: [
         BrowserModule,
         AppRoutingModule,
         PhotosModule
       ],
       providers: [],
       bootstrap: [AppComponent]
     })
     export class AppModule { }
     ```

### Retornando página de erro

Seguindo o mesmo padrão para exibir um componente baseado no roteamento de um `path`, iremos criar um `path:'**'` que caso a URL não exista, irá retornar o componente escolhido.

1. Vamos executar os comandos abaixo:

   ```
   ng g m errors
   ng g c errors/not-found
   ```

2. No conteúdo `not-found.component.html` iremos adicionar um simples exemplo de HTML:

   ```html
   <div class="text-center">
       <h2>This page is not avaliable</h2>
       <p>
           The link you have acccessed may be broken or
           the page may have ben removed.
       </p>
   </div>
   ```

3. Então, como todo módulo, temos de adicionar no `app.module.ts`, para que este se torne visível:

   ```typescript
   @NgModule({
     declarations: [
       AppComponent
     ],
     imports: [
       BrowserModule,
       AppRoutingModule,
       PhotosModule,
       ErrorsModule
     ],
   ```

4. Devemos então, adicionar no `app-routing.modules.ts` o `path` genérico:

   ```typescript
   import { NotFoundComponent } from './errors/not-found/not-found.component';
   
   const routes: Routes = [
     { path: 'user/flavio', component: PhotoListComponent },
     { path: 'p/add', component: PhotoFormComponent },
     { path: '**', component: NotFoundComponent }
   ];
   ```



### URLs dinâmicas

Não queremos deixar fixo o endereço `localhost:4200/user/flavio` queremos poder passar qualquer usuário e receber de volta a lista de fotos e para isto, temos que fazer algumas alterações em nosso roteamento!

1. Em `app-routing.modules.ts` iremos alterar o `path: ‘user/flavio’` para `path: ‘user/:userName'` pq desta forma, estamos deixando genérico o retorno;

2. Em `photo-list.component.ts` iremos utilizar um recurso do `ActivatedRoute` que pega a rota indicada naquele momento:

   ```typescript
   constructor(
       private photoService: PhotoService, 
       private activatedRoute: ActivatedRoute) { }
   ```

3. Com a classe `ActivatedRoute` iremos utilizar o método `snapshot` que irá capturar o `params.userName`:

   ```typescript
   constructor(
       private photoService: PhotoService, 
       private activatedRoute: ActivatedRoute) { }
   
     ngOnInit(): void {
   
       const userName = this.activatedRoute.snapshot.params.userName;
       this.photoService
         .listFromUser(userName)
         .subscribe(photos => this.photos = photos);
     }
   ```

   1. Como a nosso Serviço `photo.service.ts` já está recebendo o método `listFromUser` de forma dinâmica, não precisamos altera-lo.

      ```typescript
      import { Injectable } from '@angular/core';
      import { HttpClient } from '@angular/common/http';
      import { Photo } from './photo';
      
      @Injectable({ providedIn: 'root' })
      export class PhotoService {
      
          constructor(private http: HttpClient) {
              this.http = http;
          }
      
          listFromUser(userName: string) {
              console.log(API + userName + '/photos');
              return this.http
                  .get<Photo[]>(API + userName + '/photos');
          }
      
      }
      ```



## Melhorando os componentes

Até o momento, temos um componente **responsável por listar** todas as fotos, porém, vamos melhorar o layout com o bootstrap, de forma que **seja exibido 3 fotos por `row `**:

* Dentro do `photo-list.component.html` vamos colocar as fotos em uma lista ordenada:

```html
<ol class="list-unstyled row">
    <li *ngFor="let photo of photos" class="col-4">
        <ap-photo [url]="photo.url" [description]="photo.description"></ap-photo>
    </li>
</ol>
```

O problema desta abordagem, é que se olharmos o HTML, foi gerado uma única `row` com várias `columns` e isto irá “estourar” a página conforme se tenha mais fotos. **O ideal é criarmos um componente** `Photo` que irá ser chamado pela `photo-list.component.html`

### Componente exclusivo

1. Iremos criar o componente `Photo`, com `ng g c photos/photo-list/photos` que será o cara especializado em mexer na foto;

2. Então iremos tirar a responsabilidade do  `photo-list.component.html` e passar para o`photos.component.html` ;

3. Iremos criar um array do tipo `Photo` no `photos.component.ts`, de forma que o `photo-list` possa utiliza-lo posteriormente;

   ```typescript
   //photo-list.component.ts
   export class PhotoListComponent implements OnInit {
   
     @Input() photos: Photo[] = [];
   
     constructor(
       private photoService: PhotoService, 
       private activatedRoute: ActivatedRoute) { }
   
     ngOnInit(): void {
   
       const userName = this.activatedRoute.snapshot.params.userName;
       this.photoService
         .listFromUser(userName)
         .subscribe(photos => this.photos = photos);
     }
   }
   
   
   //photos.component.ts
   export class PhotosComponent implements OnInit {
   
     @Input() photosComponent: Photo[] = []
     constructor() { }
   
     ngOnInit(): void {
     }
   
   }
   ```

   ```html
   <!-- photos.component.html -->
   <ol class="list-unstyled row">
       <li *ngFor="let photo of photos" class="col-4">
           <ap-photo [url]="photo.url" [description]="photo.description"></ap-photo>
       </li>
   </ol>
   
   
   <!-- photo-list.component.html -->
   <ap-photos [photosComponent]="photosList"></ap-photos>
   ```

4. **PORÉM** até o momento isto não alterou em nada de nosso HTML, pois **só** estamos **mudando as responsabilidades**;

<br>

A questão está no **tratamento das grids** que precisa ser alterado! Invés de fazermos um `*ngFor` em cada `<ol>` teremos dois  `*ngFor`, sendo:

* um para a `<li>` que será nossa `row`;
* um para uma `<div>` que será nossa  `col`;

Para isto, teremos que criar uma função que irá preencher um novo array que representará as `rows`:

1. Vamos adicionar o array:

   ```typescript
   //photo.component.ts
   
   @Input() photosComponent: Photo[] = []
   row: any[] = [];
   ```

2. Vamos alterar o HTML, para fazermos os dois `ngFor`, iterando sobre `row` e `photosComponent`

   ```html
   <ol class="list-unstyled">
       <li *ngFor="let col of row" class="row">
           <div *ngFor="let photo of col" class="col-4">
               <ap-photo 
                         [url]="photo.url" 
                         [description]="photo.description">
               </ap-photo>
           </div>
       </li>
   </ol>
   ```

3. Será feita uma iteração de 3 em 3, então será utilizado um `for` e também alteraremos o `OnInit` para `OnChanges` para que não seja executado somente uma vez, mas toda vez que fotos forem adicionadas 

   1. O `slice` sempre recebe uma posição inicial e depois a quantidade final (não inclusiva), portanto se queremos do `index[0]` ao `index[2]` iremos fazer `slice(index, index+3)`, que irá ser o resultado de `[0,1,2]` e depois `[3,4,5]`;

   ```typescript
   export class PhotosComponent implements OnChanges {
   
     @Input() photosComponent: Photo[] = []
     row: any[] = [];
   
     constructor() { }
   
     ngOnChanges(changes: SimpleChanges) {
       if(changes.photosComponent){
         this.row = this.groupColumns(this.photosComponent);
       }
     }
   
     groupColumns(photosComponent: Photo[]) {
       const newRows = []
   
       for(let index = 0; index < photosComponent.length; index+=3){
         newRows.push(
             photosComponent.slice(index, index+3)
         );
       }
       return newRows;
     }
   
   }
   ```

   

## Eventos com Angular

### KeyUp

O `KeyUp` é um evento do JavaScript que **se ativa a cada dígito inserido**, um ótimo candidato a fazermos um **filtro responsivo**, ou seja, um filtro que conforme digitamos vai alterando algo!

* No Angular, podemos capturar um valor (parecido com o `QuerySelector`) através do comando `$event.target.value`

<br>

Iremos criar um filtro responsivo para as fotos, onde conforme digitamos irá ser filtrado as fotos baseado pela descrição da foto!

1. Iremos adicionar uma variável chamada `filter` que será um tipo `string` no `PhotoListComponent`;

2. Dentro do nosso `photo-list.component.html` iremos adicionar um botão, com o evento `keyup`;

   1. Quando estamos lindando um um evento que recebe um variável e faz uma função, utilizamos `()` invés do `[]`;

   ```html
   <div class="text-center mt-3 mb-3">
       <form>
           <input
               class="rounded"
               type="search"
               placeholder="search..."
               autofocus
               (keyup)="filter = $event.target.value">
       </form>
   </div>
   
   <!-- para testarmos, irá exibir os caracteres conforme escrevemos
   	{{ filter }}
   -->
   <ap-photos 
       [photosComponent]="photosList">
   </ap-photos>
   ```

   

### Pipes

O Pipe é uma espécie de filtro no Angular, onde podemos fazer mudanças, como por exemplo:

* Fazer um template para datas;
* Deixar sempre maísculos;
* Sempre minúsculo;

Ou seja, o `pipe` é como um tubo, onde o que saí dele é um elemento “filtrado” que passa por alguma alteração.

<br>

Exemplo, de um pipe que transforma a letra em maiúscula:

```typescript
export class PhotoListComponent implements OnInit {

  @Input() photosList: Photo[] = [];
  filter:string = 'igor';
```

```html
<div class="text-center mt-3 mb-3">
    <form>
        <input
            class="rounded"
            type="search"
            placeholder="search..."
            autofocus
            (keyup)="filter = $event.target.value">
    </form>
</div>

<!-- ao colocarmos um | informa ao angular q se trata de um Pipe e depois vêm a função -->
{{ filter | uppercase}}
```

<br>

Vamos aplicar um pipe nas fotos, que irá fazer um **filtro pela descrição** baseado em nosso `<input>`, ou seja, irá ficar algo parecido com:

```html
<ap-photos [photosComponent]="photosList | filterByDescription: filter"> </ap-photos>
```

<br>

1. Vamos criar um Pipe, dentro de `photo-list` através do comando `ng g p photos/photo-list/filterByDescription`;

   1. será criado o arquivo `filter-by-description.pipe.ts`;

   2. **Atenção ao `name: ‘filterByDescription’`** deve ser igual ao pipe dado no `[photosComponent]="photosList | filterByDescription: filter"> `

      ```typescript
      import { Pipe, PipeTransform } from '@angular/core';
      
      @Pipe({
        name: 'filterByDescription'
      })
      export class FilterByDescriptionPipe implements PipeTransform {
      
        transform(value: unknown, ...args: unknown[]): unknown {
          return null;
        }
      
      }
      ```

2. Iremos utilizar o método `transform` para implementar nossos filtros, este método:

   1. Recebe dois parâmetros, sendo o:
      1.  primeiro, o tipo de retorno que iremos trabalhar;
      2. segundo, o nosso filtro, em nosso caso a descrição do `input`;
   2. Por boa prática, devemos utilizar os métodos `trim()` e `toLowerCase()` para que não tenhamos problemas com maiúsculo e minúsculo;
   3. Por último teremos que utilizar o método `filter() e includes()` que irá verificar se contém a descrição:

   ```typescript
   transform(photos: Photo[], descriptionQuery: string) {
       descriptionQuery = descriptionQuery.trim().toLowerCase();
   
       if(descriptionQuery){
         return photos.filter(photo =>
             photo.description.toLowerCase().includes(descriptionQuery)
           );
       } else {
         return photos;
       }
     }
   ```

3. Podemos melhorar mais o filtro, pois quando filtramos algo que não existe, o usuário fica sem saber o que houve, pois fica vazio. Então, vamos implementar uma mensagem, em caso não seja encontrado nada!

   1. iremos utilizar o **`*ngIf`** que irá verificar se o elemento `photos` (array do `photos.component.ts`) tem algum elemento!

   ```html
   <!-- photos.component.html -->
   <p class="text-center text-muted" *ngIf="!photos.length">
       Sorry, no photos
   </p>
   
   <ol class="list-unstyled">
       <li *ngFor="let col of row" class="row">
           <div *ngFor="let photo of col" class="col-4">
               <ap-photo [url]="photo.url" [description]="photo.description"></ap-photo>
           </div>
       </li>
   </ol>
   ```

## Resolver (Service melhorado)

O Resolver é o cara responsável por carregar todos os dados durante a navegação para rota, para que então disponibilize a um componente.<br>

Para que será utilizado? 

* Queremos que a mensagem _“Sorry, no photos”_ não seja exibida ao carregarmos a página!
* É uma boa prática, assim como um `Service` de se utilizar o `Resolver` nos componentes que irão fazer requisições

  

1. Iremos criar dentro de `photo-list` o nosso `photo-list.resolver.ts` ;

   1. Todo `Resolve` é genérico, ou seja, precisamos passar para ele o tipo de retorno. No nosso caso, o retorno sera um `Observable<Photo>`, pois nosso método `listFromUser` retorna este tipo.

   ```typescript
   
   @Injectable({
     providedIn: 'root'
   })
   export class PhotoListResolver implements Resolve<Observable<Photo[]>> {
   
     constructor(private _service: PhotoService) { }
   }
   ```

2. Com a ajuda da IDE, iremos implementar os métodos abstratos da interface `Resolve`:

   ```typescript
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
       throw new Error('Method not implemented.');
   }
   ```

3. O intuito nosso, é retornar o método `listFromUser` que recebe um `userName`:

   ```typescript
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
       const userName = route.params.userName;
       return this._service.listFromUser(userName);
   }
   ```

4. Porém, como o `resolve` trabalha com rotas, precisamos deixar explicito no `app.routing.module.ts`:

   ```typescript
   const routes: Routes = [
     { 
       path: 'user/:userName', 
       component: PhotoListComponent,
       resolve: {
         photos: PhotoListResolver
       }
     },
   ```

5. Como estamos utilizando o `Resolver` , não precisaremos utilizar mais no `photo-list.component.ts` os métodos provenientes do `Service`, mais sim do próprio `Resolver`:

   1. O método `data` serve para pegar o parâmetro informado no `routes`

   ```typescript
   export class PhotoListComponent implements OnInit {
   
     photos: Photo[] = [];
     filter:string = '';
   
     constructor(private activatedRoute: ActivatedRoute) { }
   
     ngOnInit(): void {
       this.photos = this.activatedRoute.snapshot.data.photos;
     }
   }
   ```



## Debounce

Voltando ao **Filtro reativo**, não prestamos atenção em um possível problema que podemos ter, que é a quantidade alta de **requisições** feitas pelo evento **KeyUp**, pois acabamos mandando sempre requisições a cada clique.<br>

<br>

E se colocássemos um tempo? O **Debounce** serve para que a gente consiga colocar um tempo ao o evento, de forma que só após aquele tempo o evento será executado!

1. Iremos no `photo-list.component.ts` e vamos adicionar uma variável chamada `debounce` que será do tipo `Subject<String>`

   ```typescript
   export class PhotoListComponent implements OnInit {
   
     photos: Photo[] = [];
     filter:string = '';
     debounce: Subject<string> = new Subject<string>();
   ```

2. Iremos alterar o método do `OnInit` de forma que a gente possa mexer no `filter`.

   1. A variável `debounce` possui um método `subscribe` que recebe o nosso filtro;
   2. Iremos importar também o `debonceTime` do `rxjs/operators` que será responsável por passar o tempo que o evento irá verificar;

   ```typescript
   import { Component, OnInit, Input } from '@angular/core';
   import { PhotoService } from '../photo/photo.service'
   import { ActivatedRoute } from '@angular/router';
   import { Photo } from '../photo/photo';
   import { Subject } from 'rxjs';
   import { debounceTime } from 'rxjs/operators';
   
   @Component({
     selector: 'ap-photo-list',
     templateUrl: './photo-list.component.html',
     styleUrls: ['./photo-list.component.css']
   })
   export class PhotoListComponent implements OnInit {
   
     photos: Photo[] = [];
     filter:string = '';
     debounce: Subject<string> = new Subject<string>();
   
     constructor(private activatedRoute: ActivatedRoute) { }
   
     ngOnInit(): void {
       this.photos = this.activatedRoute.snapshot.data.photos;
       this.debounce
         .pipe(debounceTime(300))
         .subscribe(filter => this.filter = filter);
     }
       
     ngOnDestroy(): void {
       this.debounce.unsubscribe();
     }
   }
   ```

3. Agora, só precisamos informar no `Keyup` que estamos utilizando o Debounce. Então iremos alterar o `list.html`

   ```html
   <input
          class="rounded"
          type="search"
          placeholder="search..."
          autofocus
          (keyup)="debounce.next($event.target.value)">
   ```



## Paginação

A paginação é feita através do back-end, ou seja, temos uma URI: `localhost:3000/user/flavio/photos?page=1` que vai alterando a quantidade de páginas que é exibida.

* Quando se trata de requisições do back-end, vamos mexer na nossa classe `Service`!

A nossa paginação irá exibir no máximo 12 imagens por página (lógica já implementada no back-end):

1. Como utilizamos o `resolver` iremos verificar que usamos o método `listFromUser(userName)` e agora iremos com a paginação ter um novo método no `Service`:

   ```typescript
   export class PhotoListResolver implements Resolve<Observable<Photo[]>> {
   
     constructor(private _service: PhotoService) { }
     
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
       const userName = route.params.userName;
       return this._service.listFromUserPaginated(userName, 1);
     }
   }
   
   
   const API = 'http://localhost:3000/';
   @Injectable({ providedIn: 'root' })
   export class PhotoService {
   
   	//localhost:3000/flavio/photos?page=1
       listFromUserPaginated(userName: string, page:number) {
           //irá fazer um page = x
           const pageParam = new HttpParams().append('page', page.toString());
   
           // com a ',' iremos fazer um @QueryParam, parecido com o Java
           return this.http
               .get<Photo[]>(API + userName + '/photos' , { params: pageParam});
       }
       
   }
   ```



### PageButton

Por enquanto, temos que ficar alterando no método `resolve` as páginas para vermos as demais fotos, porém sabemos que isto não é ideal, queremos clicar em um botão que irá carregar as demais fotos **caso a foto exista**. Para isto, iremos criar um método `load()` que irá verificar se existem mais elementos a serem exibidos!

1. Por se tratar de um novo componente (novo botão), iremos cariar o componente `LoadButtonComponent`, através do método `ng g c load-button`

2. Adicionaremos o conteúdo HTML abaixo no `load-button.component.html`

   ```html
   <div class="text-center">
       <button class="btn btn-primary">Load more</button>
   </div>
   
   <p class="text-center text-muted">No more data to load</p>
   ```

3. Para que este componente apareça no `photo-list.html` temos que adicionar o `selector` de `load-button` :

   ```html
   <ap-photos 
       [photos]="photos | filterByDescription: filter">
   </ap-photos>
   
   <ap-load-button></ap-load-button>
   ```

4. Agora vamos criar uma variável no `load-button.ts` que irá ser responsável em saber se possuem mais fotos a serem exibidas e como esta variável será alterada conforme exista mais dados ou não, iremos por o `@Input`

   ```typescript
   export class LoadButtonComponent implements OnInit {
   
     @Input() hasmore: boolean = false;
       
     //demais codigo
   }
   ```

5. Através dessa variável, podemos fazer um `*ngIf` no nosso `load-button.html`. Também usaremos a TAG `<ng-template>` para fazermos um `else`:

   ```html
   <div class="text-center" *ngIf="hasMore; else messageTemplate">
       <button class="btn btn-primary">Load more</button>
   </div>
   
   <ng-template #messageTemplate>
       <p class="text-center text-muted">No more data to load</p>
   </ng-template>
   ```

6. Com a parte de layout pronta, precisaremos agora fazer com que a variável `hasMore` seja modificada e como vamos implementa-la no `photos-list.html` iremos ter que declara-la no `photo-list.ts` também, pois desta forma poderemos fazer um `data-binding` da variável `hasMore`

   ```typescript
   export class PhotoListComponent implements OnInit {
   
     photos: Photo[] = [];
     filter:string = '';
     debounce: Subject<string> = new Subject<string>();
     hasMore: boolean = false;
   ```

   ```html
   <ap-load-button [hasMore]="hasMore" (click)="load()"></ap-load-button>
   ```

   1. Cada vez que o botão ser apertado, irá ser verificado se o botão se manterá `true`;

7. Como iremos ter que carregar as imagens ao clique do botão, este papel é do `Service`, então iremos precisar trazer alguns valores, como o `userName e currentPage`, que será utilizado pelo método `listFromUserPaginated`

   ```typescript
   export class PhotoListComponent implements OnInit {
     photos: iPhoto[] = [];
     filter: string = '';
     hasMore: boolean = true;
     username: string = '';
     currentPage: number = 1;
   
     constructor(private _route: ActivatedRoute, private _service: PhotoService) {}
   
     ngOnInit(): void {
       this.username = this._route.snapshot.params.username;
       this.photos = this._route.snapshot.data.photos;
     }
   
     load() {
       this._service
         .listFromPage(this.username, ++this.currentPage)
         .subscribe((photos) => {
           this.filter = '';
           this.photos = this.photos.concat(photos);
           if (!photos.length) {
             this.hasMore = false;
           }
         });
     }
   }
   ```



## Submódulos

Atualmente temos a seguinte estrutura:

```
|- errors (possui módulo)
|-	|-	not-found

|- photos (possui módulo)
|-	|-	photo
|-	|-	photo-form
|-	|-	photo-list
|-	|-	|-	load-button
|-	|-	|-	photos
```

Temos apenas 2 módulos (alem do `app.module`) que encapsula todos os Componentes do projeto, porém se torna algo “feio” e mal visto, veja o `photos.module.ts` a quantidade de informações:

```typescript
@NgModule({
  declarations: [ 
    PhotoComponent, 
    PhotoListComponent,
    PhotoFormComponent, 
    PhotosComponent, 
    FilterByDescriptionPipe, LoadButtonComponent 
  ],
  exports: [ 
    PhotoComponent 
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class PhotosModule { }
```

O ideal seria fazer submódulos, de forma que fiquemos com as declarações abaixo no `photos.module`

```typescript
@NgModule({
    imports: [
        PhotoModule,
        PhotoFormModule,
        PhotoListModule
    ]
})
export class PhotosModule { }


//PhotoModule
@NgModule({
  declarations: [ PhotoComponent ],
  imports: [ 
    CommonModule,
    HttpClientModule
   ],
  exports: [ PhotoComponent ]
})
export class PhotoModule { }


//PhotoFormModule
@NgModule({
  declarations: [ PhotoFormComponent ],
  imports: [
    CommonModule
  ]
})
export class PhotoFormModule { }


//PhotoListModule
@NgModule({
  declarations: [ 
    PhotoListComponent,
    PhotosComponent,
    FilterByDescriptionPipe,
    LoadButtonComponent
   ],
  imports: [
    CommonModule,
    PhotoModule
  ]
})
export class PhotoListModule { }


//AppModule
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PhotosModule,
    AppRoutingModule,
    ErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```



## Font Awesome

A biblioteca Font Awesome, possui uma série de ícones, assim como o `glyphicons`.  

* Para utilizar o Font Awesome, temos que instalar via `npm`: `npm i font-awesome`.

* Por ser um CSS global, teremos que passar no `style` do `angular.json`:

  ```json
  "styles": [
      "src/styles.css",
      "node_modules/bootstrap/dist/css/bootstrap.min.css",
      "node_modules/font-awesome/css/font-awesome.css"
  ],
  ```

Podemos adicionar uma “lupa” ao nosso projeto, utilizando a TAG abaixo:

```html
<i aria-hidden="true" class="fa fa-search mr-2"></i>
```

Aproveitamos e também inserimos as opções de curtida e comentário!

```html
<ol class="list-unstyled">
    <li *ngFor="let col of row" class="row no-gutters">
        <div *ngFor="let photo of col" class="col-4">
            <ap-photo [url]="photo.url" [description]="photo.description"></ap-photo>
            <div class="text-center">
                <i aria-hidden="true" class="fa fa-heart-o fa-1x mr-2"></i>{{ photo.likes }}
                <i aria-hidden="true" class="fa fa-comment-o fa-1x mr-2 ml-2"></i>{{ photo.comments }}
            </div>
        </div>
    </li>
</ol>
```



## Ng-content

Uma forma “mais bonita” de exibirmos as fotos, seria colocarmos as fotos dentro de `cards` do bootstrap! O Layout padrão para um `card`:

```html
<div class="card border-light text-center">
    <h4 class="card-header">TITULO DO CARD</h4>
    <div class="card-block text-justify">
        <!-- aqui entra o conteúdo -->
    </div>
</div>
```

Como vamos inserir **um novo conteúdo**, como boa prática aprendemos que é ideal criarmos um **novo componente**, ´porém os `cards` são **compartilháveis**, então uma boa prática é **cria a pasta `shared`** e então a pasta **`components`** indicando que ali terão componentes

1. Com `ng g c shared/components/card` iremos criar o componente `card`;

2. Criaremos também o módulo: `ng g m shared/components/card` - pois iremos compartilhar nosso `card` com outros componentes;

3. No `card.component.html` iremos inserir o conteúdo do `card` com um `title`:

   ```html
   <div class="card border-light text-center">
       <h4 class="card-header">{{ title }}</h4>
       <div class="card-block text-justify">
           <ng-content></ng-content>
       </div>
   </div>
   ```

4. No `card.ts` iremos adicionar o `title` como uma variável a ser modificada:

   ```typescript
   @Component({
     selector: 'ap-card',
     templateUrl: './card.component.html',
     styleUrls: ['./card.component.css']
   })
   export class CardComponent implements OnInit {
   
     @Input() title:string = '';
   
     constructor() { }
   
     ngOnInit(): void {
     }
   
   }
   ```

5. Agora precisamos informar ao `card.module.ts` que iremos exportar o `CardComponent` e também teremos de importar no `photo-list.module` e no `app.module`;

6. Por último, iremos inserir o seletor `<ap-card [title]="photo.description">` no `photos.html`

Porém, se olharmos como ficou a tela **as fotos sumiram** com esta abordagem, mas pq? <br>

O que acontece, é que o Angular não sabe onde inserir as fotos a não ser que seja declarado o `<ng-content>` onde o conteúdo será exibido em outro componente!

```html
<div class="card border-light text-center">
    <h4 class="card-header">{{ title }}</h4>
    <div class="card-block text-justify">
        <ng-content></ng-content>
    </div>
</div>
```



## Output Property - Acessando propriedades de outros Componentes

Atualmente, nosso `photo-list.component.html` está com esta estrutura:

```html
<div class="text-center mt-3 mb-3">
    <form>
        <i aria-hidden="true" class="fa fa-search mr-2"></i>
        <input
            class="rounded"
            type="search"
            placeholder="search..."
            autofocus
            (keyup)="debounce.next($event.target.value)"
        >
    </form>
</div>

<ap-photos 
    [photos]="photos | filterByDescription: filter">
</ap-photos>

<ap-load-button [hasMore]="hasMore" (click) = "load()"></ap-load-button>
```

Podemos ver que resta movermos o filtro para um componente, de forma que a gente fique com a `photo-list.html` como:

```html
<ap-filtro></ap-filtro>
<ap-photos [photos]="photos | filterByDescription: filter"></ap-photos>
<ap-load-button [hasMore]="hasMore" (click) = "load()"></ap-load-button>
```

<br>

1. Vamos criar o componente `search.component`, com o `ng g c photos/photo-list/search`;

2. No `photoList.html` iremos remover todo elemento que pertencerá ao `search.html` e como consequência, iremos remover tudo que pertence ao `search` do `photoList.ts` e passar para o `search.ts`:

   ```html
   <!-- photo-list.component.html -->
   <ap-search></ap-search>
   
   <ap-photos 
       [photos]="photos | filterByDescription: filter">
   </ap-photos>
   
   <ap-load-button [hasMore]="hasMore" (click) = "load()"></ap-load-button>
   
   
   <!-- search.component.html -->
   <div class="text-center mt-3 mb-3">
       <form>
           <i aria-hidden="true" class="fa fa-search mr-2"></i>
           <input
               class="rounded"
               type="search"
               placeholder="search..."
               autofocus
               (keyup)="debounce.next($event.target.value)"
           >
       </form>
   </div>
   ```

   ```typescript
   //photo-list.component.ts
   export class PhotoListComponent implements OnInit {
   
     photos: Photo[] = [];
     filter:string = '';
     hasMore: boolean = true;
     currentPage: number = 1;
     userName: string = '';
   
     constructor(
       private activatedRoute: ActivatedRoute, 
       private photoService: PhotoService
       ) { }
   
     ngOnInit(): void {
       this.userName = this.activatedRoute.snapshot.params.userName;
       this.photos = this.activatedRoute.snapshot.data.photos;
     }
   
     load(){
       this.photoService
         .listFromUserPaginated(this.userName, ++this.currentPage)
         .subscribe(photos => {
           this.photos = this.photos.concat(photos);
           if(!photos.length) {
             this.hasMore = false;
           }
         })
     }
   
   }
   
   
   //search.component.ts
   export class SearchComponent implements OnInit, OnDestroy {
   
     debounce: Subject<string> = new Subject<string>();
   
     constructor() { }
   
     ngOnInit(): void {
       this.debounce
         .pipe(debounceTime(300))
         
         //Como iremos utilizar o Filtro?
         .subscribe(filter => this.filter = filter);
     }
   
     ngOnDestroy(): void {
       this.debounce.unsubscribe();
     }
   
   }
   ```

3. Porém, teremos alguns problemas, pois nosso `array` de `photos` fica dentro do `photo-list` e ao movermos nosso filtro teremos de acessa-lo…

   1. Quando queremos acessar propriedades de outros componentes, podemos utilizar um **Evento customizado!**

4. No nosso `search.ts` iremos criar um `EventEmitter` do `@Angular/core` com a propriedade `@output`;

   1. O nome da variável do evento, tem que ser o mesmo nome que iremos utilizar no seletor;
   2. O `EventEmitter` possui o método `emit` que dispara o valor;

   ```typescript
   export class SearchComponent implements OnInit, OnDestroy {
   
     @Output() onTyping = new EventEmitter<string>();
     debounce: Subject<string> = new Subject<string>();
   
     constructor() { }
   
     ngOnInit(): void {
       this.debounce
         .pipe(debounceTime(300))
         .subscribe(filter => this.onTyping.emit(filter));
     }
   
     ngOnDestroy(): void {
       this.debounce.unsubscribe();
     }
   
   }
   ```

   ```Html
   <ap-search 
       (onTyping)="filter = $event">
   </ap-search>
   
   <ap-photos 
       [photos]="photos | filterByDescription: filter">
   </ap-photos>
   
   <ap-load-button 
       [hasMore]="hasMore" 
       (click) = "load()">
   </ap-load-button>
   ```

   

Para melhorar a aplicação, podemos limpar o filtro caso o “Load more” não possua dados…

1. Vamos no `photo-list.ts` e no nosso `load()` iremos passar para o filtro uma `string` vazia, desta forma ele irá limpar o filtro:

   ```typescript
   load(){
       this.photoService
         .listFromUserPaginated(this.userName, ++this.currentPage)
         .subscribe(photos => {
           this.filter = '';
           this.photos = this.photos.concat(photos);
           if(!photos.length) {
             this.hasMore = false;
           }
         })
     }
   ```

2. Para limpar os dados do `<input>` iremos trabalhar com a propriedade `value` do `input`, sendo assim, vamos avisar no `search.ts`  que iremos mexer nesse elemento:

   ```typescript
   export class SearchComponent implements OnInit, OnDestroy {
   
     @Output() onTyping = new EventEmitter<string>();
     @Input() value = '';
   ```

3. Agora precisamos informar que o `value` será o valor do `filter`, lá no `photoList.html`:

   ```html
   <ap-search 
       (onTyping)="filter = $event"
       [value]="filter">
   </ap-search>
   ```

4. E por último, para que o `photoList.html` consiga alterar esta propriedade, precisamos habilita-la no `search.html`:

   ```html
   <input
          class="rounded"
          type="search"
          placeholder="search..."
          autofocus
          (keyup)="debounce.next($event.target.value)"
          [value]="value"
   >
   ```

   

## Autenticação

### Exibir tela de Login

A autenticação será feito através de um componente chamado `SignIn`;

1. Vamos criar o componente, que ficará em uma nova pasta chamada `Home` que também terá o seu respectivo módulo;

   ```
   ng g m home
   ng g c home/sigin
   ```

2. O Template utilizado na página HTML será:

   ```html
   <h4 class="text-center">Login</h4>
   
   <form class="form mt-4">
     <div class="form-group">
       <input class="form-control" placeholder="user name" autofocus />
     </div>
   
     <div class="form-group">
       <input type="password" class="form-control" placeholder="password" />
     </div>
   
     <button type="submit" class="btn btn-primary btn-block">login</button>
   </form>
   
   <p>Not a user?<a>Register now</a></p>
   ```
   
3. Para que nossa página seja exibida na tela inicial, teremos que alterar nosso `app.routing`:

   ```typescript
   const routes: Routes = [
       {
           path: '',
           component: SignInComponent
       },
   ```

4. Por fim, lembrar de adicionar o módulo `HomeModule` no `AppModule`;



### Pegar dados do template

Para pegarmos dados do template, iremos trabalhar com o módulo **`ReactiveFormsModule`** (que deverá ser importado no `homeModule`). 

```typescript
import {ReactiveFormsModule} from '@angular/forms';
```

Com este Modulo, teremos acesso a uma classe que nos ajudará a **vincular o form com o componente**. Esta classe é chamada de `FormGroup`;

1. No `SignInComponent` iremos atribuir uma variável para vincular ao form:

   ```typescript
   loginForm: FormGroup;
   ```

2. Com esta variável, iremos vincular nosso formulário:

   ```html
   <form [formGroup]="loginForm" class="form mt-4">
   ```

3. Para acessarmos os elementos do `<form>` iremos utilizar outra classe, chamada **`FormBuilder`**, que deverá ser injetada:

   ```typescript
   export class SigninComponent implements OnInit {
   
     loginForm:FormGroup;
   
     constructor(private formBuilder:FormBuilder) {
       this.formBuilder = formBuilder;
     }
   ```

4. Dentro do `onInit()` iremos acessar as propriedades, utilizando nosso builder:

   ```typescript
   onInit():void {
       this.loginForm = this.formBuilder.group({
       	userName: [''],
           password: ['']
   	});
   }
   ```

5. Agora para o Builder reconhecer o `<form>` vamos assinar nossos `inputs` com a TAG `formControlName`

   ```html
   <input formControlName="password" ... >
   ```
   
6. Para **teste**:

   ```typescript
   ngOnInit(): void {
       this.loginForm = this.formBuilder.group({
           userName: ['flavio'],
           password: ['123']
       });
   }
   ```

   1. os campos irão ser preenchidos automaticamente, pois estamos manipulando o HTML.

### Validação de Campos

A validação dos campos, é feito com uma classe que possui vários tipos de validadores, chamada `Validator`. No nosso caso, iremos utilizar o `.required`:

```typescript
ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],  
      password: ['', Validators.required]
    });
  }
```

Desta forma, já não é mais possível deixar os campos em branco, porém o usuário ainda não sabe disto… precisamos demonstrar que falta algo para ele, **vamos demonstrar que o botão será liberado** somente quando os dois campos forem preenchidos…<br>

Iremos mexer no elemento `disabled` do HTML e falar que irá ser `true` se tiver algo `invalid`:

```html
<button [disabled]="loginForm.invalid" ... > 
```

Mas o usuário, ainda não sabe o que fazer para liberar o botão, então vamos criar uma mensagem debaixo de cada `input`:

```html
<small class="text-danger d-block mt-2"> User name is required! </small>
<small class="text-danger d-block mt-2"> Password is required! </small>
```

Porém, queremos que a mensagem desapareça caso o usuário tenha digitado algo, para isso podemos fazer um `*ngIf=loginForm.get('elemento').erros?.required`:

* ***Safe navigation operator\***, é o método com o ‘?’, que pergunta se aquele elemento existe

```html
<small
    *ngIf="loginForm.get('userName').errors?.required"
    class="text-danger d-block mt-2"
> User name is required!
</small>
```



### Validando Autenticação

Com a validação de campos feitas, precisamos validar se aquele usuário e senha existem 

* API Possui um caminho que recebe um `userName` e um `password`, na URI `localhost:3000/user/login?username=xxx&password=xxx`;

 Para isto iremos criar um `Service` de autenticação, que irá encapsular a validação com o método `authenticate()`.

1. Crie o `Service`, na pasta `core/auth` -> `ng g s core/auth`

2. No construtor, iremos injetar o `HttpClient`, para que a gente use o método `post`;

3. Crie o método `authenticate()` -> que irá fazer o POST, para a URI;

   ```typescript
   export class AuthService {
     constructor(private http:HttpClient) { }
   
     authenticate(userName:string, password:string){
       return this.http.post(API + 'user/login' , {userName, password});
     }
   }
   ```

   1. Na classe `SignIn.ts` iremos passar nosso `Service` no construtor e também a classe `Router` para que seja feito o roteamento para outra URI. Vamos criar o método `login()`, que será responsável pela implementação do `Service`

   ```typescript
   constructor(
       private formBuilder: FormBuilder,
       private authService: AuthService,
       private router:Router
     ) {
       this.formBuilder = formBuilder;
   }
   
   login() {
       const userName = this.loginForm.get('userName').value;
       const password = this.loginForm.get('password').value;
   
       this.authService
           .authenticate(userName, password)
           .subscribe(
               ()=> this.router.navigateByUrl('user/' + userName),
               err=> {
                   console.log(err);
                   this.loginForm.reset();
                   alert('UserName or Password is invalid!');
               }
       	);
   }
   ```

5. Precisamos avisar no `form` do `SigIn.html` que o evento de `submit` irá chamar a função `login()`:

   ```html
   <form [formGroup]="loginForm" class="form mt-4" (submit)="login()">
   	<!-- código omitido -->
   </form>
   ```



#### ViewChield & ElementRef - Mexendo no DOM

No cenário acima, se quiséssemos que o `autofocus` funcionasse após o usuário ter digitado algum dado incorreto, teríamos que trabalhar com o `ElementRef`.<br>

Vamos fazer com que **ao usuário digitar um dado incorreto, seja acessado o `focus()` do `<input>`**:

1. Vamos atribuir uma variável do tipo `ElementRef`, na classe `SigIn.ts`, com o elemento `<HTMLInputElement>`;

   1. Esta variável, terá a anotação `@ViewChield('userNameInput')` que fará a comunicação com o `<input>`, também com a mesma anotação:

   ```typescript
   export class SigninComponent implements OnInit {
     loginForm: FormGroup;
     @ViewChild('userNameInput') userName: ElementRef<HTMLInputElement>;
   ```

   ```html
   <input #userNameInput
          formControlName="userName"
          class="form-control"
          placeholder="user name"
          autofocus>
   ```

2. Feito a anotação, iremos no método `login()` para que após limparmos o formulário, a gente faça o `focus()`:

   ```typescript
   this.authService.authenticate(userName, password).subscribe(
       () => this.router.navigateByUrl('user/' + userName),
       (err) => {
           this.loginForm.reset();
           this.userNameInput.nativeElement.focus();
           alert('UserName or Password is invalid!');
       }
   );
   ```


## Header  - Template

A aplicação até o momento não possui um header, portanto, como será **utilizado por toda aplicação** iremos deixar em `core/header`

```html
<header class="fixed-top">
    <nav class="navbar navbar-light bg-white">
        <a class="navbar-brand">ALURAPIC</a>
        <div>
            <em class="fa fa-user-circle"></em>
            <a>Aqui deve entrar o username</a>
        </div>
    </nav>
</header>
```

* Será necessário dar um padding-top no `index.html`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>IgorGram</title>
      <base href="/" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/x-icon" href="favicon.ico" />
      <style>
        body {
          padding-top: 60px;
        }
      </style>
    </head>
    <body>
      <app-root></app-root>
    </body>
  </html>
  ```

Como iremos **expor** o header, devemos criar um modulo para o core e exportar este componte para que seja importado pelo `app.module.ts`.

```typescript
//core.module.ts
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class CoreModule {}


//app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PhotosModule, HomeModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Token

Uma boa prática após ter feito um login é saber **qual usuário** e **se está logado**, para isto, nada melhor do que o uso de um **token**!<br>

Quando fazemos uma **requisição** para a API, recebemos uma **resposta**, onde esta resposta **contém um HEADER** e neste header conterá informações como o `x-access-token` - mas **como acessa-lo?**

### Capturando

Sabemos que só temos acesso a resposta quando fazemos um `subscribe`, porém **é responsabilidade do serviço** de pegar o Token. Então para isso, utilizaremos o **`pipe()`** e o **`tap`** (rxjs/operators).

* Pipe -> serve como um filtro antes do `subscribe` oq nosso caso será utilizado no serviço;
* Tap -> utilizado para **acessar a resposta**;

**PORÉM,** é precisamos **habilitar** o serviço a passar os dados da resposta, com o uso do `observe`

```typescript
authenticate(userName: string, password: string) {
    return this.client
      .post(API + 'user/login', { userName, password }, { observe: 'response' })
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token');
          console.log(authToken);
        })
      );
  }
```

### Gravando  LocalStorage

Como ja sabemos ‘pegar’ o Token, está na hora de armazena-lo, mas **onde e como?** <br>Os navegadores nos possibilitam salvar o token em um espaço chamado **LocalStorage** e para armazena-lo, basta que seja utilizado um `window.localStorage.setItem('titulo', token)` e como **boa prática**, iremos criar um **serviço** responsável por **verificar se existe, pegar, setar e excluir**!<br><br>`Token.service.ts`:

```typescript
const KEY = 'authToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}
```

`auth.service.ts`:

```typescript
export class AuthService {
  constructor(private client: HttpClient, private tokenService:TokenService) {
    this.client = client;
    this.tokenService = tokenService;
  }

  authenticate(userName: string, password: string) {
    return this.client
      .post(API + 'user/login', { userName, password }, { observe: 'response' })
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token');
          this.tokenService.setToken(authToken);
        })
      );
  }
}
```

### Descriptografando

Para trabalharmos com o Token, é necessário descriptografa-lo e para isto iremos utilizar o **JWT DECODE**.

```
npm i jwt-decode@2.2.0
```

e para utiliza-lo devemos fazer um `import all`

```typescript
import * as jwt_decode from 'jwt-decode'
```

o `jwt_decode` espera receber um token como entrada e um `alias` **tipado com uma interface**;

```typescript
const user = jwt_decode(token) as User;
```

### Capturando valores do token

Até o momento, estamos trabalhando com o `TokenService` dentro do serviço `AuthService`, porém quem se autentica é o **usuário**, portanto, vamos **encapsular o `TokenService`** no `UserService` (que posteriormente terá as informações do usuário).

1. Gerar o nome modelo de Serviço

```
ng g s core/user/
```

2. Criar os método `getUser()` e `setToken(token:string)` que será utilizado pelo construtor

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private tokenService:TokenService) { }

  setToken(token:string) {
    this.tokenService.setToken(token);
  }

  getUser(){}
  
}
```

3. Como não será mais utilizado no `AuthService` o `TokenService`, trocaremos para o `UserService`

```typescript
export class AuthService {
  constructor(private client: HttpClient, private userService:UserService) {
    this.client = client;
    this.userService = userService; //alterado
  }

  authenticate(userName: string, password: string) {
    return this.client
      .post(API + 'user/login', { userName, password }, { observe: 'response' })
      .pipe(
        tap((res) => {
          const authToken = res.headers.get('x-access-token');
          this.userService.setToken(authToken); //alterado
        })
      );
  }
}
```

Agora para **capturarmos o token**, precisaremos utilizar um `Subject` com uma **interface** que contenha os dados do Token

1. Criar a Interface `User`:

   ```typescript
   export interface User {
       id: number;
       name: string;
       email: string
   }
   ```

2. No `UserService` iremos criar a variavel do `Subject<User>`

   ```typescript
   export class UserService {
   
     private userSubject = new Subject<User>();
   
     constructor(private tokenService:TokenService) { }
       
       //codigo omitido
   }
   ```

Com o Subject, precisaremos utiliza-lo, para que toda vez que alguém fizer um `subscribe` receber o tipo `User` **descriptografado** e ai que entra o nosso `jwt_decode`..

1. Vamos criar o método `decodeAndNotify()` . Este método irá internamente pegar o `Token`, descriptografarr com o `jwt_decode` e então irá fazer um `next()` usando o `Subject`:

   ```typescript
   export class UserService {
     private userSubject = new Subject<User>();
   
     // metodo omitido
       
     decodeAndNotify() {
       const token = this.tokenService.getToken;
       const user = jwt_decode(token) as User;
       this.userSubject.next(user); //passa a quem chamar o setToken um usuario descriptografado
     }
   }
   ```

2. Com o método pronto, iremos **no construtor** verificar se o token existe na aplicação, caso **não haja** o `decodeAndNotify` não será chamado. Após descriptografar, iremos no `getUser()` pegar o retorno do `userSubject` como um `Observable()`

   ```typescript
   export class UserService {
     private userSubject = new Subject<User>();
   
     constructor(private tokenService: TokenService) {
       //caso o usuario saia e entre ira verificar se ja tem token cadastrado
       this.tokenService.hasToken() && this.decodeAndNotify();
     }
   
     setToken(token: string) {
       this.tokenService.setToken(token);
       this.decodeAndNotify();
     }
   
     getUser() {
       return this.userSubject.asObservable(); //retorna um observable q poderemos utilizar
     }
   
   
     decodeAndNotify() {
       const token = this.tokenService.getToken();
       const user = jwt_decode(token) as User;
       this.userSubject.next(user); //passa a quem chamar o setToken um usuario descriptografado
     }
   }
   ```

### Retornando valores  - BehaviorSubject

Como queremos que no **Header** apareça o **nome do usuário**, iremos no `Header.component.ts` pegar os valores através da classe `UserService`.<br>

O HTML não entende uma variavel do tipo `Obsevable`, portanto quando fazemos um `getUser()` precisamos fazer um `subscribe` nela, que deste modo podemos pegar os valores!

```typescript
export class HeaderComponent implements OnInit {

  user$:Observable<User>;
  user:User;

  constructor(private userService:UserService) {
    this.user$ = this.userService.getUser();
    this.user$.subscribe(user => this.user = user);
   }
}
```

Agora no HTML é possível pegar os valores através da variável `user`:

* iremos fazer uma pergunta com o `?` -> caso exista valor de `user.name` será exibido, caso não, iremos com o `*ngIf + <ng-template>` exibir outra frase

```html
<header class="fixed-top">
  <nav class="navbar navbar-light bg-white">
    <a class="navbar-brand">ALURAPIC</a>
    <div *ngIf="user; else login">
      <em class="fa fa-user-circle"></em>
      <a class="ml-2"> {{ user?.name }} </a>
    </div>

    <ng-template #login>
      <span class="navbar-text">
        <a class="ml-2"> Please, login! </a>
      </span>
    </ng-template>
  </nav>
</header>
```

**PORÉEEM**, quando utilizamos o `Subject` no nosso `UserService`, teremos um **problema**, pois o header vai ser carregado depois do serviço já ter passado a chamada, ou seja, o **header não escutou o `userSubject`**!

* O `BehaviorSubject<>()` guarda o valor **até que alguem o chame**! - É necessário passar no construtor dele um valor default;

```typescript
export class UserService {
  private userSubject = new BehaviorSubject<User>(null);
```

#### Pipe Async

E se pudessemo utilizar o `Observable` diretamente no HTML? Iriamos apagar todo trecho abaixo:

```typescript
export class HeaderComponent {
  user$: Observable<User>;
  user: User; //NÃO EXISTE

  constructor(private userService: UserService) {
    this.user$ = this.userService.getUser();
    this.user$.subscribe((user) => (this.user = user)); //NÃO EXISTE
  }

}
```

É possível utilizar um `| async ` no html e utilizar o observable!

```html
<div *ngIf="(user$ | async) as user; else login">
    <em class="fa fa-user-circle"></em>
    <a class="ml-2"> {{ user.name }} </a>
</div>

<ng-template #login>
    <span class="navbar-text">
        <a class="ml-2" href=""> Please, login! </a>
    </span>
</ng-template>
```

## Logout

Como o logout é do usuario, iremos implementa-lo no `UserService` um método `logout()`, que deverá:

* Apagar o `Token`;
* Passar um `null` para o `BehaviorSubject`

```typescript
logout(){
    this.tokenService.removeToken();
    this.userSubject.next(null);
}
```

Agora, no `Header.component` criaremos um método `logout()` que irá usar o `userService.logout()` e depois irá **direcionar a tela de login**, ou seja, precisaremos do **`Router.naviagete()`;**

​	* Como a tela de `login` é chamada quando passamos a url (‘’), iremos direcionar para o msm caminho

```typescript
export class HeaderComponent {
  user$: Observable<User>;

  constructor(private userService: UserService, private router:Router) {
    this.user$ = this.userService.getUser();
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['']);
  }

}
```

no HTML:

```html
<div *ngIf="(user$ | async) as user; else login">
    <em class="fa fa-user-circle"></em>
    <a class="mr-1"> {{ user.name }} </a>
    <a (click)="logout()">(logout)</a>
</div>
```

## Guarda de Rotas - CanActivate

Atualmente a aplicação tem um comportamento ‘errado’. Se estivermos logados, **conseguimos ir para tela de Login**, o que não faz sentido, uma vez que **ainda estamos logado**. Para que isso não ocorra, teremos que mexer no nosso arquivo `app.routing-routing` de forma que seja **instanciada uma classe** toda vez que determinada rota for chamada!

1. Vamos criar um **`.guard` responsável por bloquear/acessar** a rota, chamado de `AuthGuard`, dentro do _core/auth_;

```
ng g guard core/auth

// selecionamos o CanActivate como padrao
```

```typescript
export class AuthGuard implements CanActivate {
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
     //caso retorn true, sera informado que é permitido acessar a rota   
     return true;
  }

}
```

2. O `AuthGuard` irá receber no construtor o `UserService` que por sua vez **deverá informar se o usuario `isLogged()`**;

```typescript
export class UserService {
  	private userSubject = new BehaviorSubject<User>(null);
    // demais métodos

    isLogged(){
        return this.tokenService.hasToken();
    }
}

export class AuthGuard implements CanActivate {

  constructor(private userService:UserService, private router: Router){
    this.userService = userService;
    this.router = router;
  }
    
}
```

3. Agora no `app.routing.module.ts` iremos informar o `canActivate`

```typescript
const routes: Routes = [
	{
        path: '',
        component: SigninComponent,
        canActivate: [AuthGuard]
      },
];
```

4. No `AuthService.canActivate()` iremos utilizar o método `isLogged()` para caso seja true, ele redirecione o usuário **de volta a página de Fotos** (precisaremos instanciar o `Router`) e retorne um `false` para o `canActivate()`;

```typescript
canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.userService.isLogged()){
        this.router.navigate(['user', userName]);
        return false;
      }
    
    return true;
  }
```

5. **PORÉM,** não temos a variavel `userName`. Pediremos ao `UserService` para retornar o usuário que esta logado;
   1. o nome do usuário está no payload, portanto teremos que pega-lo depois de fazer a decodificação com jwt;

```typescript
export class UserService {
  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

    decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.userName = user.name; //pega o username
        this.userSubject.next(user); 
    }

    getUserName() {
        return this.userName;
    }
}
```

6. Agora no `AuthService` pegaremos do `UserService` o `userName`

```typescript
export class AuthGuard implements CanActivate {

  constructor(private userService:UserService, private router:Router){
    this.userService = userService;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.userService.isLogged()){
        this.router.navigate(['user', this.userService.getUserName()]);
        return false;
      }

    return true;
  }
}
```

## HREF ou RouterLink?

Seguindo o padrão da SPA, o melhor dos mundos é que a gente **não precisa** ficar **recarregando a pagina**, porém quando utilizamos o `href` na tag `<a>` o navegador entende que é uma nova requisição e **recarrega toda a página novamente**… para que isso não ocorra existe o **`routerLink`** !

1. Vamos importar o módulo `RouterModule` no `Core.module`;

```typescript
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
```

2. No `header.html` iremos fazer o redirect para a tela de Login **com o routerLink**.
   1. o `routerLink` funciona igual ao `navigate()` ou seja, precisamos colocar **dentro de um array**;

```html
<ng-template #login>
    <span class="navbar-text">
        <a class="ml-2" [routerLink]="['']"> Please, login! </a>
    </span>
</ng-template>
```

## SignUp - Mais validações

Para registrar novos usuários, utilizaremos um **POST** na API, mas antes iremos criar nosso componente em _home/signup_

* Como o SignIn ja adicionou o `FormsModule` no nosso `home.module` não será necessário inclui-lo novamente, porém todo `<form>` necessita de um `FormsModule` associado!

```
ng g c home/signup
```

```html
<h4 class="text-center"> Register to embrace a new world!</h4>

<form class="form mt-4">
    <div class="form-group">
        <input  placeholder="email" class="form-control" autofocus >
    </div>

    <div class="form-group">
        <input placeholder="full name" class="form-control">
    </div>

    <div class="form-group">
        <input placeholder="user name" class="form-control">
    </div>

    <div class="form-group">
        <input type="password" placeholder="password" class="form-control">
    </div>

    <button class="btn btn-primary btn-block">Register</button>

    <p>Already a user?<a [routerLink]="['']">Sign In!</a></p>
</form>
```

Agora precisamos mapear a Rota, para que seja acessado o SignUp

* Iremos mapear o `<a>` do `SignIn.html` para nossa rota!

```typescript
const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
```

```html
<p>Not a user?<a [routerLink]="['signup']">Register now</a></p>
```

Os validadores foram feitos anteriormentes, onde sabemos que precisamos:

1. Associar o `<form>` a um `FormGroup` (incluir no HTML e no TypeScript) -> `signUpForm:FormGroup`
2. No construtor adicionar o `FormBuilder`, que será utilizado para colocarmos os `Validators` nos inputs;
3. No `OnInit()` adicionar os validadores -> `this.signUpForm = this.builder.group({email:....})`
4. Nos `<inputs>` adicionar o mesmo nome que foi utilizado no `this.formBuilder.group`; -> `formControlName="email"`
5. Desabilitar o botão caso o `<form>` tenha algum problema -> `[disabled]="signUpForm"`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.builder = builder;
  }

  ngOnInit(): void {
    this.signupForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z0-9_\-]+$/),
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
    });
  }
}

```

```html
<h4 class="text-center">Register to embrace a new world!</h4>

<form [formGroup]="signupForm" class="form mt-4">
  <div class="form-group">
    <input
      formControlName="email"
      placeholder="email"
      class="form-control"
      autofocus
    />
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('email').errors?.required"
      >Email is required
    </small>
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('email').errors?.email"
      >Invalid email
    </small>
  </div>

  <div class="form-group">
    <input
      formControlName="fullName"
      placeholder="full name"
      class="form-control"
    />
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('fullName').errors?.required"
      >FullName is required
    </small>
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('fullName').errors?.minlength"
    >
      Minimum length is 5
    </small>
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('fullName').errors?.maxlength"
    >
      Max length is 20
    </small>
  </div>

  <div class="form-group">
    <input
      formControlName="userName"
      placeholder="user name"
      class="form-control"
    />
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('userName').errors?.required"
      >UserName is required
    </small>
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('userName').errors?.minlength"
    >
      Minimum length is 5
    </small>
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('userName').errors?.maxlength"
    >
      Max length is 20
    </small>
  </div>

  <div class="form-group">
    <input
      formControlName="password"
      type="password"
      placeholder="password"
      class="form-control"
    />
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('password').errors?.required"
      >Password is required
    </small>
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('password').errors?.minlength"
    >
      Minimum length is 5
    </small>
    <small
      class="text-danger d-block mt-2"
      *ngIf="signupForm.get('password').errors?.maxlength"
    >
      Max length is 20
    </small>
  </div>

  <button [disabled]="signupForm.invalid" class="btn btn-primary btn-block">
    Register
  </button>

  <p>Already a user?<a [routerLink]="['']"> Sign In!</a></p>
</form>

```

* Atenção ao `maxlength` -> o length é com letra minúscula!

### Validação Assíncrona - usuario ja existe na API?

A ideia é que ao digitarmos o userName seja consultado se o usuário ja existe e informar ao usuário e para isto **teremos que consultar a API**, portanto o nosso formulário irá precisar de uma **validação assincrona**!

1. Vamos criar o `SignUp.service` que irá fazer um `get` na nosso end-point;

   ```typescript
   const API = 'http://localhost:3000/';
   
   @Injectable({
     providedIn: 'root',
   })
   export class SignupService {
     constructor(private http: HttpClient) {}
   
     checkUserNameTaken(userName: string) {
       return this.http.get(API + 'user/exists/' + userName);
     }
   }
   ```

Com o Serviço gerado, ja conseguimos perguntar ao back-end se o usuario existe, portanto iremos para a validação. Nossa validação deverá ser um **Validator + Service**, chamaremos de `UserNotTakenValidatorService ` dentro do _home/signUp_;

1. Criaremos o nosso ValidatorService e iremos adicionar no construtor o `SignUpService` pois iremos precisar do `get`;

2. Criaremos uma função chamada `checkUsernameTaken()`, que terá **outra função interna** que receberá um `AbstractControl` que é utilizado para retornar a Validação…

   ```typescript
   @Injectable({
     providedIn: 'root',
   })
   export class UserNotTakenValidatorService {
     constructor(private signUpService: SignupService) {}
   
     checkUserNameTaken() {
       return (control: AbstractControl) => {
         return null; //caso devolva null é pq não houve erro
       };
     }
   }
   ```

3. Feito isto, iremos adicionar no `SignUp.component` nosso ValidatorService e iremos incluir como um parâmetro a mais do array a validação assícrona;

   ```typescript
   export class SignupComponent implements OnInit {
   
       constructor(
        	private builder: FormBuilder,
        	private userNotTakenValidatorService: UserNotTakenValidatorService
       ) {
           this.builder = builder;
           this.userNotTakenValidatorService = userNotTakenValidatorService;
       }
    
       ngOnInit(): void {
       this.signupForm = this.builder.group({
           userName: [
           '',
           [
             Validators.required,
             Validators.pattern(/^[a-z0-9_\-]+$/),
             Validators.minLength(5),
             Validators.maxLength(20),
           ],
           this.userNotTakenValidatorService.checkUserNameTaken()
         ],
   }
   ```

4. No ValidatorService, teremos uma série de métodos a serem implementados! Queremos devolver **null ou objeto**, para que isto ocorrá será necessário utilizarmos:

   1. `control.valueChanges` -> irá verificar os digitos feito pelo usuário;
   2. `debounceTime` -> como pegamos os digitos, não queremos ficar procurando a cada digito;
   3. `switchMap` -> pausa chamadas anteriores para ir no service fazer a busca;
   4. `map` -> como o `switchMap` retorna um true ou false, o `map` retorna null ou o objeto;
   5. `first` -> indica que todo o processo foi concluído;

   ```typescript
   export class UserNotTakenValidatorService {
     constructor(private signUpService: SignupService) {}
   
     checkUserNameTaken() {
       return (control: AbstractControl) => {
         return control.valueChanges
           .pipe(debounceTime(300))
           .pipe(
             switchMap((userName) =>
               this.signUpService.checkUserNameTaken(userName)
             )
           )
           .pipe(map((isTaken) => (isTaken ? { userNameTaken: true } : null))) //userNameTaken sera o validator
           .pipe(first());
       };
     }
   }
   ```

5. So resta adicionarmos a nova validação ao HTML

   1. Atenção a variavel `userNameTaken` utilizada no ValidatorService

   ```html
   <small
          class="text-danger d-block mt-2"
          *ngIf="signupForm.get('userName').errors?.userNameTaken"
   >	Username already taken
   </small>
   <small 
       *ngIf="signupForm.get('userName').valid" class="text-success"
   >   User available
   </small>
   ```

## POST na API

Agora que temos o formulário preenchido e validado, precisamos fazer o método POST em nossa API, mas como iremos pegar os campos?

* Podemos pegar os campos 1 a 1:

  ```typescript
  this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
  });
  ```

* Podemos pegar **todos elementos** com o `getRawValue()` e através de uma **interface dos inputs** facilitará nosas vida:

  ```typescript
  signup() {
      const newUser = this.signupForm.getRawValue() as NewUser;
  }
  ```

Vamos atribuir ao form um `(submit)="signup()"` que irá executar a função que fará efetivamente o POST!

1. Vamos alterar o `<form>`

   ```html
   <form [formGroup]="signupForm" (submit)="signup()" class="form mt-4">
   ```

2. Criaremos a Interface que representa os `inputs`:

   ```typescript
   export interface NewUser {
     userName: string;
     email: string;
     fullName: string;
     password: string;
   }
   ```

3. Adicionaremos no `SignUpService` o método POST, chamado `signup()`

   ```typescript
   signup(newUser:NewUser){
       return this.http.post(API + 'user/signup', newUser);
   }
   ```

4. No `SignUp.component` iremos agora adicionar no construtor o `SignUpService` e tbm o `Router` pq iremos redirecionar o usuario apos fazer o cadastro para o Login!

   ```typescript
   export class SignupComponent implements OnInit {
     signupForm: FormGroup;
   
     constructor(
       private builder: FormBuilder,
       private userNotTakenValidatorService: UserNotTakenValidatorService,
       private service:SignupService,
       private router:Router
     ) {
       this.builder = builder;
       this.userNotTakenValidatorService = userNotTakenValidatorService;
       this.service = service;
       this.router = router;
     }
   
   signup(){
       const newUser = this.signupForm.getRawValue() as NewUser;
       this.service
         .signup(newUser)
         .subscribe(
           () => this.router.navigate(['']),
           err => console.log(err)
         );
     }
       
   }
   ```

## Rotas Filhas - Children

Vamos imaginar o cenário que queremos que **determinada imagem apareça em toda página**, como aplicar? Bom, **se é em TODA PÁGINA** podemos incluir dentro do `app.component.html`, assim como fizemos com o `Header`.<br>

Mas e se quisermos **uma imagem na página de sigin e signup**? Como podemos pensar em **copiar** a imagem **e colar** nas duas páginas, o que é sinal de `smell code`.<br>

Quando temos um cenário como este, o ideal é **utilizar Rotas Filhas**!

* Implemente a imagem abaixo no canto esquerdo das telas de Signin e Signup;

  <img src="https://s3.amazonaws.com/caelum-online-public/901-angular-parte2/img/home.jpg" width=500>

Como iremos atuar com dois componentes que estão dentro de `home` iremos criar o componente `home.component.ts e html` e as páginas `SignIn` e `SinUp` irão aparece a partir da TAG **`<router-outlet>`**:

```
ng g c home/
```

```html
<div class="container">
    <div class="row">
        <div class="col-md-6 mb-2">
            <img class="img-fluid d-none d-sm-block"
                src="/assets/img/home.jpg" alt="Welcome">
        </div>
        <div class="col-md-6">
            <router-outlet></router-outlet>
        </div>
    </div>
</div>
```

Agora vem a **rota filha** que deve ser mapeado no `app.routing.ts`, como ela funciona? Dentro da parâmetro `children` ficaram as rotas filhas

* Caso tenha validação do tipo `CanActivate` , este deve ir para a rota pai

```json
{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
        {
            path: 'signup',
            component: SignupComponent,
        },
        {
            path: '',
            component: SigninComponent,
        },
    ],
},
```

No sentindo de organização, iremos utilizar da técnica do `pathMatch` e `redirectTo` para que nossa URL fique `home/` `home/signup`

```typescript
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: '',
        component: SigninComponent,
      },
    ],
  },
```

**PORÉM,** podemos ver que o nosso `focus()` não está funcionando no SignUp e no SignIn não funciona ao voltarmos para ele (uma vez que a página não é mais recarregada).<br>

No `SignIn.ts` iremos colocar para fazer um `focus()` assim que o elemento for iniciado!

```typescript
export class SigninComponent implements OnInit {

  @ViewChild('userNameInput') userNameInput:ElementRef<HTMLInputElement>;
    
  ngOnInit(): void {
      this.loginForm = this.builder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
      });
      this.userNameInput.nativeElement.focus();
  }
}
```

No `SignUp.ts` não temos um elemento `@ViewChild`, portanto, iremos adicionar ao `email`:

```typescript
@ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

 ngOnInit(): void {
  	//Validators
	this.emailInput.nativeElement.focus();
 }
```

No `signup.html`:

```html
<input
       #emailInput
       formControlName="email"
       placeholder="email"
       class="form-control"
       autofocus
/>
```

## Build do Projeto

Para fazer o build do projeto é simples, basta rodarmos um `ng build --prod` e o Angular vai se responsabilizar por fazer todas as otimizações necessárias!<br>

**PORÉM,** temos um problema com as URLs, **caso o back-end** não esteja preparado para **devolver o `index.js`**. Quando o back-end não faz o planejado, devemos tratar dentro de `app.routing.ts` para que para toda URL **seja devolvido um ‘’#‘’**, ficando `http://localhost:4200/#/` ou `http://localhost:4200/#/user/flavio`.

* Se faz necessário habilitar o `useHash`

```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

## Lazy Loading

Dentro do SPA, sabemos que o conceito principal é de que **toda página seja carregada** no momento do acesso, porém, pense em um cenário que determinada página é **raramente acessada**, teria a necessidade de carregarmos ela toda vez? E se pudessemos **faziar o que será carregado**, como por exemplo a tela de **Login e SignUp**?<br>

O lazy loading serve para que a gente **divida a SPA**, de modo que quando fizermos o build, deixaremos nosso arquivo `main` mais ‘leve’.<br>

### Implementando Lazy Loading

Temos que ter em mente é de que **“cada modulo que queremos em lazy loading precisa do próprio `routing.module.ts`!”**

1. Vamos criar o `home-routing.module.ts` fazendo uma copia do arquivo raiz e deixando somente as rotas ja mapeadas do routes;

2. Como o `home-routing` se trata de uma rota filha da raiz, devemos trocar o `forRoot` por `forChild`

   ```typescript
   const routes: Routes = [
     {
       path: '',
       component: HomeComponent,
       canActivate: [AuthGuard],
       children: [
         {
           path: '',
           component: SigninComponent,
         },
         {
           path: 'signup',
           component: SignupComponent,
         },
       ],
     },
   ];
   
   @NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule],
   })
   export class HomeRoutingModule {}
   
   ```

3. E no `app-routing.module` iremos retirar aquilo q se refere ao `Home` e infomar onde se encontrará nosso modulo com a rota filha com o `loadChildren`

   ```typescript
   const routes: Routes = [
     {
       path: 'user/:username',
       component: PhotoListComponent,
       resolve: { photos: PhotoListResolver },
     },
     {
       path: '',
       pathMatch: 'full',
       redirectTo: 'home',
     },
     {
       path: 'home',
       loadChildren: './home/home.module#HomeModule',
     },
   ];
   
   @NgModule({
     imports: [RouterModule.forRoot(routes, {useHash: true })],
     exports: [RouterModule],
   })
   export class AppRoutingModule {}
   ```

4. Devemos retirar também do `app.module` a importação do `HomeModule` e o `HomeModule` precisa importar o `HomeRoutingModule`!

   ```typescript
   //app.module
   @NgModule({
     declarations: [AppComponent],
     imports: [
       BrowserModule,
       PhotosModule,
       CoreModule,
       VMessageModule,
       AppRoutingModule,
     ],
     providers: [],
     bootstrap: [AppComponent],
   })
   export class AppModule {}
   
   //home.module
   @NgModule({
     declarations: [SigninComponent, SignupComponent, HomeComponent],
     imports: [
       CommonModule,
       ReactiveFormsModule,
       RouterModule,
       FormsModule,
       ReactiveFormsModule,
       VMessageModule,
       HomeRoutingModule
     ],
   })
   export class HomeModule {}
   ```

   

## Admin vs Visitor - Interceptor

Vamos imaginar o cenário onde queremos que distinguir **o usuário ‘admin’** ou aquele que está apenas visitando. Na nossa aplicação, seria **precisamos verificar se o `Username` do token** é igual ao usuario da página (`user/flavio`).

* Para isto, iremos precisar mandar a cada requisição feita ao back-end o token no header!

Vamos **implementar um interceptador** que irá ver se existe um token e **caso exista** irá fazer um `clone()` do token para as próximas requisições.

1. Em `Auth` iremos criar o Interceptador

```typescript
ng g interceptor auth/
```

2. Dentro do interceptador, iremos colocar nosso `TokenService` no construtor

```typescript
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if(this.tokenService.hasToken()){
            const token = this.tokenService.getToken();
            request = request.clone({
                setHeaders:{
                    'x-access-token':token
                }
            });
        }
        return next.handle(request);
    }
}
```

3. Até o momento, o handle irá receber nossa `req` modificada, porém precisamos avisar nosso `core.module` que temos um interceptador

```typescript
providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RequestInterceptor,
        multi: true
    }
]
```



## i18n

```
ng xi18n --output-path src/locale
```

```typescript
<p bradTitle="pagina" i18n="opções pré-aprovadas | São as opções pré-aprovadas para o cliente">
    Confira as opções pré-aprovadas que temos pra você
</p>
```



## JSON-SERVER

```bash
npx json-server --watch parcelas.json texts.json
```

## Footer - Template

<img src="https://caelum-online-public.s3.amazonaws.com/940-angular-parte3/01/1_1_1_footer.png" alt="footer" style="zoom: 67%;" />

Faremos uso do **pipe async** para que somente quando o Observable for carregado, q seja exibido as informações (isto evita a necessidade de fazer `subscribe` e de carregar o código com outras coisas!);

```html
<footer class="mt-5" *ngIf="user$ | async as user">
    <div class="fixed-bottom bg-white p-1">
        <div class="container">
            <div class="row text-center">
                <div class="col-6">
                    <a [routerLink]="['']">
                        <em class="fa fa-home fa-2x"></em>
                    </a>
                </div>
                <div class="col-6">
                    <a [routerLink]="['p', 'add']">
                        <em class="fa fa-plus-circle fa-2x"></em>
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>
```

```typescript
export class FooterComponent implements OnInit {

    user$: Observable<User>;

    constructor(private userService:UserService) { }

    ngOnInit(): void {
        this.user$ = this.userService.getUser();
    }

}
```

1. Adicionar nos modulos;

2. Adicionar no  `app.componente.html`

   ```html
   <app-header></app-header>
   <router-outlet></router-outlet>
   <app-footer></app-footer>
   ```

## Upload imagens

![upload](https://caelum-online-public.s3.amazonaws.com/940-angular-parte3/01/1_2_1_upload.png)

### Template

```html
<div class="container">
    <form class="row">
        <div class="col-md-6 text-center">
            <input type="file" accept="image/*">
        </div>

        <div class="col-md-6">
            <div class="form-group">
                <textarea 
                          class="form-control form-control-sm" 
                          placeholder="photo description"></textarea>
            </div>

            <div class="form-group">
                <label class="text-muted">
                    Allow comments
                    <input type="checkbox">
                </label>
            </div>

            <button type="submit" class="btn btn-primary btn-block">
                Upload
            </button>

            <a class="btn btn-secondary btn-block">Cancel</a>
        </div>
    </form>
</div>
```

* Uma vez que **se trata de formulário** se faz necessário o uso do `ReactiveFormsModule, FormsModule`, portanto **deve ser importado no `photos.module.ts`**!

* Para auxiliar nas validações, usaremos o `Vmessage`, portanto:

  ```typescript
  @NgModule({
      declarations: [PhotoFormComponent],
      imports: [CommonModule, ReactiveFormsModule, FormsModule, VMessageModule],
  })
  export class PhotoFormModule {}
  ```

### Validações

Para fazer validações, usaremos do **`FormGroup` e `FormBuilder`**, para fazer as validações;

```typescript
export class PhotoFormComponent implements OnInit {

    photoFormGroup: FormGroup;
    constructor(private photoFormBuilder:FormBuilder) { }

    ngOnInit(): void {
        this.photoFormGroup = this.photoFormBuilder.group({
            file:['', Validators.required],
            description:['', Validators.maxLength(300)],
            allowComments:[true]
        })
    }

}
```

Para vincular as validações com o `html`, usaremos as tags `[formGroup]` e `formControlName`, passando o `vmessage` em caso de erros

```html
<div class="container">
  <form [formGroup]="photoFormGroup" class="row">
    <div class="col-md-6 text-center">
      <input formControlName="file" type="file" accept="image/*" />
      <ap-vmessage
        text="Please, select a photo"
        *ngIf="photoFormGroup.get('file').errors?.required"
      ></ap-vmessage>
    </div>

    <div class="col-md-6">
      <div class="form-group">
        <textarea
          formControlName="description"
          class="form-control form-control-sm"
          placeholder="photo description"
        ></textarea>
        <ap-vmessage
          text="Maximun size allowed is 300"
          *ngIf="photoFormGroup.get('description').errors?.maxlength"
        ></ap-vmessage>
      </div>

      <div class="form-group">
        <label class="text-muted">
          Allow comments
          <input formControlName="allowComments" type="checkbox" />
        </label>
      </div>

      <button [disabled]="photoFormGroup.invalid" type="submit" class="btn btn-primary btn-block">Upload</button>

      <a class="btn btn-secondary btn-block">Cancel</a>
    </div>
  </form>
</div>
```

### Upload File

Para realizar o `upload`/ `submit` poderiamos simplesmente utilizar do `getRawValue()` que iria pegar toda informação do `PhotoFormGroup`:

```html
<form [formGroup]="photoFormGroup" class="row" (submit)="upload()">
```

```typescript
upload() {
    const dados = this.photoFormGroup.getRawValue();
    console.log(dados);
}
```

```json
file: "C:\fakepath\angular.png"
description: "teste"
allowComments: true
```

**PORÉM,** para a API, não serve o valor `file: "C:\fakepath\angular.png"`, a API **espera receber o BINÁRIO** da foto e para isto iremos utilizar o tipo `File`;

```typescript
export class PhotoFormComponent implements OnInit {
    photoFormGroup: FormGroup;
    file: File;
```

Mas como pegar o valor binário? utilizaremos do evento **`(change)`** que irá pegar o valor do arquivo, com `$event.target.files[0]`, onde iremos pegar um único arquivo com o `[0]`;

```html
<form [formGroup]="photoFormGroup" class="row" (submit)="upload()">
    <div class="col-md-6 text-center">
        <input
               formControlName="file"
               type="file"
               accept="image/*"
               (change)=" file = $event.target.files[0]"
               />
```

```typescript
upload() {
    const description = this.photoFormGroup.get('description');
    const allowComments = this.photoFormGroup.get('allowComments');
    console.log(this.file);
}
```

Desta forma teremos, do arquivo:

```json
name: "angular.png"
lastModified: 1601989321166
lastModifiedDate: Tue Oct 06 2020 10:02:01 GMT-0300 (Brasilia Standard Time) {}
webkitRelativePath: ""
size: 2385
type: "image/png"
```

### Post - upload

Para realizar o upload em si, iremos fazer um `post` na API, que espera receber:

* Description:string;
* allowComments:string -> necessário converter o boolean para string;
* file:File;

Mas e como passar esses valores? Utilizaremos o `FormData`, que possui o método `append`, cuja função é adicionar os parâmetros da requisição e seus valores

```typescript
upload(description: string, allowComments: boolean, file: File) {

    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.client.post(API + 'photos/upload', formData);
}
```

Agora basta executar o `subscribe` e retornar para a rota que estão as imagens, usando o `Router` (necessário importar o `RouterModule`);

```typescript
constructor(
    private photoFormBuilder: FormBuilder,
    private photoService: PhotoService,
    private route: Router
) {}

upload() {
    const description = this.photoFormGroup.get('description').value;
    const allowComments = this.photoFormGroup.get('allowComments').value;

    this.photoService
        .upload(description, allowComments, this.file)
        .subscribe(() => this.route.navigate(['']));
}
```

<img src="https://caelum-online-public.s3.amazonaws.com/940-angular-parte3/01/1_5_1_foto+erro.png" alt="uploadincorreto" style="zoom:80%;" />

**PORÉM,** obtivemos um erro na exibição da imagem, porquê?

* Até o momento, o componente `photos.ts` espera receber da API, um valor **serializado**, chamado de **`data uri`** (como se fosse uma string gigantesca) e estamos passando um **caminho físico**, ou seja, estamos passando **onde está a foto**, porém nosso componente não sabe lidar com os dois caminhos.

  ```html
  <img class="img-thumbnail" [src]="url" [alt]="description">
  ```

### @Input() Setter

Para que seja possível receber **valores distintos** em **uma inbound property**, iremos utilizar de um **`set`**, conhecido como **setter**, onde a lógica vai ser:

* É um `data uri`? ou seja, a URL, começa com `data`? Se sim, iremos devolver a url;
* É um caminho físico? então iremos devolver o `localhost:3000/imgs/` + `url`;

```typescript
const API = 'http://localhost:3000/imgs/'

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.css'],
})
export class PhotoComponent implements OnInit {
    private _url: string = '';
    @Input() description: string;
    @Input() set url(url: string) {
        if (!url.startsWith('data')) {
            this._url = API + url;
        } else {
            this._url = url;
        }
    }

    get url() {
        return this._url;
    }
```



## Preview Imagem

### Input hidden - Estilizando botão

O projeto atual, está com um botão simples HTML e queremos muda-lo:

![botaosimples](https://caelum-online-public.s3.amazonaws.com/940-angular-parte3/01/1_2_1_upload.png)

**PORÉM,** o HTML já interpreta para nós que este botão `type=file` irá fazer a função de selecionar um arquivo e **não queremos perder isso**! Para que um novo botão faça a mesma função, iremos utilizar do **tagueamento em angular**;

1. Adicione o atributo `hidden` no botão `file`;

2. Insira o botão estilizado:

   ```html
   <button type="button" class="btn btn-primary">
       <em class="fa fa-image fa-4x align-middle"></em>
   </button>
   <input
          hidden
          formControlName="file"
          type="file"
          accept="image/*"
          (change)="file = $event.target.files[0]"
          />
   ```

3. Para que ao clicar no botão estilizado, seja executado o botão `hidden`, iremos utilizar do **_event binding_** `(click)` passando uma tag `(click)="fileInput.click()"`, e iremos atribuir o `#fileInput` dentro do `<input hidden>`:

   ```html
   <button type="button" (click)="fileInput.click()" class="btn btn-primary">
       <em class="fa fa-image fa-4x align-middle"></em>
   </button>
   <input
          #fileInput
          hidden
          formControlName="file"
          type="file"
          accept="image/*"
          (change)="file = $event.target.files[0]"
          />
   ```

![botaoNovo](https://caelum-online-public.s3.amazonaws.com/940-angular-parte3/02/2_1_1_botao+novo.png)

### Preview

Até o momento, o usuário não enxerga aquilo que ele escolheu, o que é ruim, mas como fazer?<br>

O segredo para mostrar a foto que foi selecionada, é converte-la para `data:uri` (não temos como utiliza-la como caminho físico, pq ela não foi adicionada ainda) e **para converter** utilizaremos do **`FileReader`**!

1. Precisamos manipular o evento do `input file`, para isto, iremos alterar o `(change)="file = $event.target.files[0]"`, onde iremos chamar uma função, que receberá o `file`:

   ```html
   <input
          #fileInput
          hidden
          formControlName="file"
          type="file"
          accept="image/*"
          (change)="handleFile($event.target.files[0])"
          />
   ```

2. No `handleFile`, iremos esperar receber um tipo `File`, que iremos converter para `data uri`:

   ```typescript
   handleFile(file:File){
       this.file = file;
   }
   ```

3. A conversão será feita por um `fileReader`, que iremos atribuir a variável `reader`.

4. O `fileReader`, possui o método `readAsDataURL()`, que passeremos o `file`:

   ```typescript
   handleFile(file:File){
       this.file = file;
       const reader = new FileReader();
       reader.readAsDataURL(file);
   }
   ```

Como esta operação é assíncrona (`readAsDataURL`), precisaremos esperar que a foto seja carregada, com o método `onload`, que possui uma função de callback, que poderemos atribuir ao nosso `preview`, desta forma, assim que for concluído o carregameto, iremos mostrar esse parâmetro `preview:string`;

1. Crie a variável `preview`;

2. Chame o método `onload`, e com a função de callback, guarde o resultado em `preview`:

   ```typescript
   preview:string;
   
   handleFile(file: File) {
       this.file = file;
       const reader = new FileReader();
       reader.onload = (event: any) => (this.preview = event.target.result);
       reader.readAsDataURL(file);
   }
   ```

3. No HTML, iremos criar uma `<div>` com `*ngIf`, que irá verificar se possui alguma string no `preview`, caso possua irá exibir a foto:

   ```html
   <div class="form-group" *ngIf="!preview; else previewImage">
       <button
               type="button"
               (click)="fileInput.click()"
               class="btn btn-primary"
               >
   ```

4. Caso possua algo no `preview`, iremos chamar o `photo.component` (necessário importar o `PhotoModule`)

   ```html
   <ng-template #previewImage>
       <div class="text-center">
           <app-photo [url]="preview" title="Preview"></app-photo>
       </div>
   </ng-template>
   ```

## Directive 

As diretivas servem para que através do `selector` da diretiva algo ocorra.<br>

Por exemplo:

* Quero que quando for clicado no botão **+** (correspondente a abertura do form para adicionar Foto), seja automaticamente aberto a selação de arquivos!

Se analisarmos, o que precisamos é efetuar um `click()` no `button`, assim que a rota `p/add` for chamada e para isto faremos o uso de uma diretiva!

### Criando Diretiva

As diretivas, geralmente são utilizadas por mais de um componente, portanto **ficam no shared** da aplicação;

1. Crie o módulo, pois iremos exportar, `ng g m shared/directive/immediate-click`;

2. Execute `ng g directive shared/directive/immediate-click`;

3. Abra o arquivo `ImmediateClickDirective` e nele, iremos alterar o `selector` para `[immediateClick]`;

4. No construtor, iremos utilizar do `ElementRef` para executar o `click()`;

5. Implementaremos o `onInit`, para que quando for chamada a classe, seja efetuado o click!

   ```typescript
   @Directive({
       selector: '[immediateClick]'
   })
   export class ImmediateClickDirective implements OnInit{
   
       constructor(private elementref: ElementRef) { }
   
       ngOnInit(): void {
           this.elementref.nativeElement.click();
       }
   
   }
   ```

6. Exporte a diretiva, pelo `ImmediateClickModule` e importe o módulo no `PhotoFormModule`;

7. Dentro do `PhotoForm.html` iremos chamar o selector `immediateClick`:

   ```html
   <button
           immediateClick
           type="button"
           (click)="fileInput.click()"
           class="btn btn-primary"
           >
   ```

   

