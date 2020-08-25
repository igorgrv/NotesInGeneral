# IgorGram

# Parte 1

O projeto IgorGram consiste na criação de uma aplicação parecida com o Instragram, onde iremos exibir os dados da  [APIRest](https://s3.amazonaws.com/caelum-online-public/865-angular/api.zip) utilizando o Angular;

## Gettings Started

Para utilizar o projeto iremos, precisar:

* Angular CLI (instalar através do prompt) -> irá nos permitir utilizar os comandos `ng`;

  ```
  npm install -g @angular/cli
  ```

* [Node.js](https://nodejs.org/en/download/);

* [Visual Code](https://code.visualstudio.com/download);



Criando o projeto pelo **VSCode**:

```
//irá criar o projeto no diretório que estiver selecionado o 'cd'
ng new igorGram

//acessar a pasta do projeto caso não esteja selecionada
cd igorGram

//Irá subir o servidor local com o node.js
ng serve --open
```

<br>

Iniciando a API (como a API não está publica, iremos instacia-la localmente):

 1.  Acessamos via terminal o diretório onde esta a API;

 2.  Executamos o `npm i`;

     1. Caso dê erro, será necessário verificar as instalações com `npm i xxxx`:

        ```
        npm i sqlite3 jsonwebtoken jimp multer cors express
        ```

<br>

No igor-gram -> Instalando dependências necessárias:

```
npm i boostrap
npm i font-awesome
```

Agora, precisamos declarar o CSS global, no `angular.json`:

```json
"styles": [
    "src/styles.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/font-awesome/css/font-awesome.css"
],
```

Deixar o `app.html`, somente com a tag `<router-outlet></router-outlet>`;

<br>

Caso não tenha sido importado automaticamente, devemos adicionar o `RouterModule` ao `app.module.ts`:

```
import { RouterModule } from '@angular/router';
```



## Componentes/Módulos

Os componentes tem que ir sendo criados conforme nossa necessidade. Vamos pensar primeiro na ideia do projeto, que será:

* Página que exibirá todas as fotos;
  * Está página terá uma lista de fotos;
    * A foto;
    * Um botão para carregar mais fotos;
    * Um `input` para fazer pesquisa baseado na descrição da foto;
* Página que terá um formulário para incluir mais fotos;
* Página de erros (caso uma URL invalida seja digitada);

<br>

Então iremos criar os componentes e módulos para encapsular cada opção! Porém, iremos começar em partes:

### Componente Fotos/foto

1. Criar o Módulo - fotos -> `ng g m fotos`;

2. Criar o Componente - Foto -> `ng g c fotos/foto`;

3. Para testarmos, iremos adicionar o seletor do `FotoComponent` no `app.html`:

   ```html
   <app-foto></app-foto>
   
   <router-outlet></router-outlet>
   ```

4. Reiniciar o servidor e verificar se em `localhost:4200` foi exibido a mensagem do componente Foto;

<br>

#### Data-binding

Toda foto da nossa aplicação irá possuir uma `URL` e uma `description` que será nossa TAG `alt`.

* Quando queremos deixar disponível um atributo de uma TAG HTML, devemos 1º deixar disponível no `.component.ts` com a anotação `@Input`

```typescript
export class FotoComponent implements OnInit {

  @Input() from: string = ''
  @Input() description: string = ''
```

* Agora precisamos definir o `template` do nosso `FotoComponent` e usar o `data-binding`:

```html
<p>
    Foto Works
</p>
<img [src]="from" [alt]="description">
```

Todo outro componente que for acessar o seletor `<ap-foto>` passará a utilizar o `from` e o `description` para fotos e não mais o `src e alt`:

* O `app.html`:

```html
<app-foto 
  from="https://lh3.googleusercontent.com/TM-g_2L7u2p99kwg4IQeB-3352WfCq0vKXP4h5cOvISUlNll6-1WHu8t2B0oZdZKjkmp"
  description="teste"
>
</app-foto>

<router-outlet></router-outlet>
```

#### Serviço e interface Foto

Primeiro, iremos mapear todo `.json` que temos, dentro de uma Interface, desta forma ficará mais fácil futuras manutenções, caso a API mude.

1. Criar interface `iFoto`:

   ```typescript
   export interface iFoto {
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

Com a Interface pronta, precisaremos criar a classe de Serviço `FotoService` que será responsável por fazer as requisições na API e retornar para nós a lista de Arrays **baseado em um usuário**:

1. Criar o Serviço `fotoService`, com `ng g s fotos/foto/foto`;

2. A classe que nos ajuda com as requisiçõs é a **HTTPClient (`'@angular/common/http'`)**, porém para utiliza-la precisamos importa-la no módulo `foto.module.ts`;

3. No `fotoService` iremos declarar o caminho da API;

   ```typescript
   const API = 'http://localhost:3000/';
   ```

4. No construtor, iremos carregar o `HttpClient`

   ```typescript
   constructor(private http: HttpClient) { 
   	this.http = http;
   }
   ```

5. Iremos criar o método que irá listar as fotos baseado em um usuário:

   1. Para isto, o HttpClient disponibiliza o método `get` que receberá a Interface

   ```typescript
   listaFotoPeloUsuario(usuario:string){
       return this.http
         .get<iFoto[]>(API + usuario + '/fotos');
     }
   ```


### Componente fotos/foto-lista

Iremos criar o módulo e componente `foto-lista`, que irá carregar a lista de fotos provenientes do `FotoService` com o componente `FotoComponente` (`<app-foto>`)

#### Criando a Rota

Para testes, foi bom utilizar o `app.html` porém, não é ideal ficarmos utilizando ele para exibir um componente, o ideal é termos **endereços/rotas** que quando acessarmos, irá exibir nosso componente!

1. Em `app-routing.module.ts` iremos adicionar os nossos `path` dentro da constante `routes`:

   1. Será adicionado uma URL dinâmica, onde o `:usuario` será modificado

   ```typescript
   const routes: Routes = [
     { path: 'usuario/:usuario', component: FotoListComponent}
   ];
   ```

2. Em `FotoList` iremos utilizar a classe `ActivatedRoute` para pegar o que vem da URL

   ```typescript
   constructor(private fotoService: FotoService, private activatedRoute:ActivatedRoute) { 
       this.fotoService = fotoService;
       this.activatedRoute = activatedRoute;
     }
   
     ngOnInit(): void {
       const usuario = this.activatedRoute.snapshot.params.usuario;
         
       this.fotoService
         .listaFotoPeloUsuario(usuario)
         .subscribe(fotos => this.fotos = fotos);
     }
   ```

   



### Componente Search

A ideia do search envolve alguns elementos, pois iremos criar um componente que irá “mexer” em outro componente e também iremos criar um Search Reativo, que irá fazer muitas requisições, então temos que nos prever disto:

1. Temos que criar o componente e adicionar as tags HTML;

   ```html
   <div class="text-center mt-3 mb-3">
       <form>
           <i aria-hidden="true" class="fa fa-search mr-2"></i>
           <input 
               type="search" 
               placeholder="Search by Description"
               class="rounded"
               autofocus
               (keyup)="debounce.next($event.target.value)"
           >
       </form>
   </div>
   ```

2. Iremos implementar a validação de tempo com a classe `Debounce` que vêm do pacote  `rxjs` e recebe um `Subject<string>`.

   1. Utilizaremos o `debounce` no `OnInit` porém iremos precisar cancelar a requisição com o `OnDetroy`.

   2. O `debounce` recebe um tipo `pipe(debounceTime(300))` que irá passar um tempo;

   3. Depois iremos fazer um subscribe, para passar os valores **e ai entra o problema**, como vamos passar para o `PhotosComponent`?

   4. Para acessarmos elementos de outro Component, utilizamos um **evento customizado**, que nosso caso, se chamará `onTyping`;

      1. Este evento, poderá passar osa valores através do método `emit`;

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
      
        ngOnDestroy(): void{
          this.debounce.unsubscribe();
        }
      
      }
      
      ```

   5. Basta adicionarmos a tag com o evento no `photo-list.html`:

      ```html
      <app-search (onTyping)="filter = $event"></app-search>
      ```

3. Porém, se não fizermos um Pipe na tag do `PhotoComponent` as fotos continuaram a mesma…

   1. Criaremos o `filterByDescryption` que será um Pipe;

      1. Todo Pipe, recebe o método `transform` que irá receber dois parâmetros, um parâmetro será, o `retorno` e o outro a própria `busca`. A busca deve sempre ser verificada se existe algo e deixar como `lower`

      ```typescript
      transform(photos:PhotoAPI[], descriptionQuery:string): unknown {
          descriptionQuery = descriptionQuery.trim().toLowerCase();
      
          if(descriptionQuery){
              return photos.filter(photo => photo.description.toLowerCase().includes(descriptionQuery));
          } else {
              return photos;
          }
      }
      ```

4. Agora, para que o usuário não fique sem saber o que aconteceu, vamos por uma mensagem em `photo.component`

   ```html
   <p class="text-center text-muted" *ngIf="!photos.length">
       Sorry, no photos
   </p>
   ```

