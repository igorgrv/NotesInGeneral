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

Dependências para API

```
npm i sqlite3 jsonwebtoken jimp multer cors express
```

Demais dependências:

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

* Página que exibirá todas as photos;
  * Está página terá uma lista de photos;
    * A photo;
    * Um botão para carregar mais photos;
    * Um `input` para fazer pesquisa baseado na descrição da photo;
* Página que terá um formulário para incluir mais photos;
* Página de erros (caso uma URL invalida seja digitada);

<br>

Então iremos criar os componentes e módulos para encapsular cada opção! Porém, iremos começar em partes:

### Componente Photos/photo

1. Criar o Módulo - photos -> `ng g m photos`;

2. Criar o Componente - photo -> `ng g c photos/photo`;

3. Para testarmos, iremos adicionar o seletor do `photoComponent` no `app.html`:

   ```html
   <app-photo></app-photo>
   
   <router-outlet></router-outlet>
   ```

4. Reiniciar o servidor e verificar se em `localhost:4200` foi exibido a mensagem do componente photo;

<br>

#### Data-binding

Toda photo da nossa aplicação irá possuir uma `URL` e uma `description` que será nossa TAG `alt`.

* Quando queremos deixar disponível um atributo de uma TAG HTML, devemos 1º deixar disponível no `.component.ts` com a anotação `@Input`

```typescript
export class photoComponent implements OnInit {

  @Input() from: string = ''
  @Input() description: string = ''
```

* Agora precisamos definir o `template` do nosso `photoComponent` e usar o `data-binding`:

```html
<img [src]="from" [alt]="description">
```

Todo outro componente que for acessar o seletor `<ap-photo>` passará a utilizar o `from` e o `description` para photos e não mais o `src e alt`:

* O `app.html`:

```html
<app-photo 
  from="https://lh3.googleusercontent.com/TM-g_2L7u2p99kwg4IQeB-3352WfCq0vKXP4h5cOvISUlNll6-1WHu8t2B0oZdZKjkmp"
  description="teste"
>
</app-photo>

<router-outlet></router-outlet>
```

#### Service e interface iPhoto

Primeiro, iremos mapear todo `.json` que temos, dentro de uma Interface, desta forma ficará mais fácil futuras manutenções, caso a API mude.

1. Criar interface `iphoto`:

   ```typescript
   export interface iphoto {
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

Com a Interface pronta, precisaremos criar a classe de Serviço `photoservice` que será responsável por fazer as requisições na API e retornar para nós a lista de Arrays **baseado em um usuário**:

1. Criar o Serviço `photoservice`, com `ng g s photos/photo/photo`;

2. A classe que nos ajuda com as requisiçõs é a **HTTPClient (`'@angular/common/http'`)**, porém para utiliza-la precisamos importa-la no módulo `photo.module.ts`;

3. No `photoservice` iremos declarar o caminho da API;

   ```typescript
   const API = 'http://localhost:3000/';
   ```

4. No construtor, iremos carregar o `HttpClient`

   ```typescript
   constructor(private http: HttpClient) { 
   	this.http = http;
   }
   ```

5. Iremos criar o método que irá listar as photos baseado em um usuário:

   1. Para isto, o HttpClient disponibiliza o método `get` que receberá a Interface

   ```typescript
   listaphotoPeloUsuario(usuario:string){
       return this.http
         .get<iphoto[]>(API + usuario + '/photos');
     }
   ```

### Componente photos/photo-list/photos

Este componente irá encapsular o componente `PhotoComponent` e aplicar **regra de aparecer 3 photos por linha**;

```html
<ol class="list-unstyled">
  <li *ngFor="let col of row" class="row">
    <div *ngFor="let photo of col" class="col-4">
      <app-photo [url]="photo.url" [description]="photo.description"> </app-photo>
    </div>
  </li>
</ol>
```

```typescript
export class PhotosComponent implements OnChanges {
    @Input() photos: iPhoto[] = [];
    row: any[] = [];

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.photos) {
            this.row = this.groupColumns(this.photos);
        }
    }

    groupColumns(photos:iPhoto[]){
        const newRows = [];

        for (let index = 0; index < photos.length; index += 3) {
            newRows.push(photos.slice(index, index + 3));
        }
        return newRows;
    }
}
```

### Componente photos/photo-list

Iremos criar o módulo e componente `photo-lista`, que irá carregar a lista de photos provenientes do `photoservice` e também a rota!

```
ng g m photos/photo-list
ng g c photos/photo-list
```

#### Criando a Rota

Para testes, foi bom utilizar o `app.html` porém, não é ideal ficarmos utilizando ele para exibir um componente, o ideal é termos **endereços/rotas** que quando acessarmos, irá exibir nosso componente!

1. Em `app-routing.module.ts` iremos adicionar os nossos `path` dentro da constante `routes`:

   1. Será adicionado uma URL dinâmica, onde o `:usuario` será modificado

   ```typescript
   const routes: Routes = [
     { path: 'usuario/:usuario', component: photoListComponent}
   ];
   ```

2. Em `photoList` iremos utilizar a classe `ActivatedRoute` para pegar o que vem da URL

   ```typescript
   constructor(private photoservice: photoservice, private activatedRoute:ActivatedRoute) { 
       this.photoservice = photoservice;
       this.activatedRoute = activatedRoute;
     }
   
     ngOnInit(): void {
       const usuario = this.activatedRoute.snapshot.params.usuario;
         
       this.photoservice
         .listaphotoPeloUsuario(usuario)
         .subscribe(photos => this.photos = photos);
     }
   ```

   

#### Componente Search

A ideia do search envolve alguns elementos, pois iremos criar um componente que irá “mexer” em outro componente e também iremos criar um Search Reativo, que irá fazer muitas requisições, então temos que nos prever disto:

1. Temos que criar o componente e adicionar as tags HTML;

   1. O `$event.target.value` é responsável por capturar cada valor que esta sendo passado quando a tecla for **“up”**;
      1. Será chamado o método `onInit()` a cada digito;
   2. O `debounce.next` é utilizado para que não seja enviada requisições a cada palavra digitada;

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

<br>

Para que o HTML funcione, configuraremos o arquivo `search.ts`;

1. Utilizaremos o `debounce` no `OnInit` e o `OnDestroy` para cancelar a requisição.

   1. O `debounce` é do tipo `Subject` e irá receber uma `string` neste caso;

2. O `debounce` recebe um tipo `pipe(debounceTime(300))` que irá passar um tempo;

   1. Este tempo esta atrelado a pausa que é feita a cada digito - para implementa-lo é necessário **importar do `rx/operators`**

   ```javascript
   export class SearchComponent implements OnInit, OnDestroy {
       debounce: Subject<string> = new Subject<string>();
   
   	ngOnInit () {
           this.debounce
           	.pipe(debounceTime(300));
       }
       
      ngOnDestroy(): {
       	this.debounce.unsubscribe();
      }
   }
   ```

   

3. Depois iremos fazer um `subscribe` no `debounce`, para passar os valores, mas como vamos passar para o `PhotosListComponent`?

   1. O `@Output() onTyping` é utilizado para acessarmos elementos de outro Componente (que no nosso caso será utilizado para se comunicar com o `photo-list.ts`);
   2. Este evento, poderá passar os valores através do método `emit`;

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

No `photo-list.html` iremos chamar o `app-search` passando o `Output` e atrelando a uma variável, que neste caso será `filter`;

```html
<app-search (onTyping)="filter = $event"></app-search>
```

No `photo-list.ts` devemos declarar esta variável:

```typescript
export class PhotoListComponent implements OnInit {
	photos: iPhoto[] = [];
    filter:string = '';
    // demais código....
}
```

<br>

#### Criação do Pipe

Até o momento não foi feito nenhum ‘filtro’ das photos baseado na descrição, só estamos capturando os valores do `input`de forma **reativa**. Para que seja exibida as photos baseada nos valores digitados, será necessário **implementar um  `Pipe`**!

<br>

Criaremos o `filterByDescryption` que será um Pipe -> `ng g pipe photos/photo-list/filterByDescription`

1. Todo Pipe, recebe o método `transform` que irá receber dois parâmetros:
   1. parâmetro será, o `retorno`, neste caso devolvemos um **array de `photos`**;
      1. É em `photos` que iremos verificar se existe a `description`, através do método `filter`;
      2. Caso exista a palavra/letra digitada, iremos incluir dentro do array, com o `includes`;
   2. parâmetro será a própria `busca`, neste caso é o que esta vindo do `input`. 
      1. Deve se sempre tratar os valores que vem do `input`, como por exemplo:
         1. Fazer um `trim()` e depois um `toLowerCase` para evitar diferença entre maiúscula/minúsculo e retirar espaços;

```typescript
transform(photos: iPhoto[], filterValue: string): unknown {
    filterValue = filterValue.trim().toLowerCase();
    
    if (filterValue) {
      return photos.filter((photo) =>
        photo.description.toLowerCase().includes(filterValue)
      );
    }
    return photos;
  }
```

Com o Pipe criado, precisamos utiliza-lo no `photo-list.html`, passando os **2 parâmetros** (o Array, `photos`, e os valores do input ,`filter`);

```html
<app-search (onTyping)="filter = $event"></app-search>
<app-photo [photos]="photos | filterByDescription: filter"></app-photo>
```

Agora, para que o usuário não fique sem saber o que aconteceu, vamos por uma mensagem em `photos.ts`

```html
<p class="text-center text-muted" *ngIf="!photos.length">
    Sorry, no photos
</p>
```

#### Resolver

Em tese, toda camada que consumir um `Service` deve implementar o `Resolver`, pois através dele acontece internamente uma consulta ao end-point, para que então a ação seguinte ocorra!

* Por exemplo, quando a página é carregada, é exibida a mensagem de que “No photos were found” e depois as fotos são carregadas, o que é errado!

Para resolver este problema, iremos:

1. Criar o `Resolver`, que se parece muito com o `Service`, porém **implementa o `Resolve<>`**, portanto podemos rodar o comando `ng g s photos/photolist`;

   1. Todo `Resolve` é genérico, portanto precisamos passar para ele o que iremos retornar, que no caso é um `Observable<iPhoto[]>`

   ```typescript
   @Injectable({
     providedIn: 'root'
   })
   export class PhotoListResolver implements Resolve<Observable<Photo[]>> {
   
     constructor() { }
   }
   ```

   Implementando o método, temos:
   ```typescript
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<iPhoto[]> {
       throw new Error('Method not implemented.');
   }
   ```

   Como o intuito é consumir o `PhotoService`, iremos então no construtor fazer a chamada, para que então seja utilizado no método `resolve`;
   1. o método `listFromUser()` espera receber uma string contendo o usuário, para isto iremos utilizar o `route`;
   ```typescript
   @Injectable({
       providedIn: 'root'
   })
   export class PhotoListResolver implements Resolve<Observable<Photo[]>> {
   
       constructor(private service: PhotoService) { }
   
       resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<iPhoto[]> {
           const username = route.params.user;
           return this.service.listFromUser(username);
       }	
   }
   ```

   Agora só precisamos deixar disponível o `Resolve` para quem quiser ter a todos os dados, portanto em `app-routing` iremos criar um objeto e atribuir o campo `photoResolve`/
   ```typescript
   const routes: Routes = [
       {
           path: ':user/photos',
           component: PhotoListComponent,
           resolve: { photoResolve: PhotoListResolver },
       },
   ];
   ```

   Agora no método `ngOnInit()` iremos falar que o `this.photos` irá receber do `route.snapshot.data.photos` ( o `data.photos` irá procurar dentro do `resolve`);
   ```typescript
   ngOnInit(): void {
       /*const username = this.route.snapshot.params.user;
       this.photoService
         .listFromUser(username)
         .subscribe((photos) => (this.photos = photos));
        */
   	this.photos = this.route.snapshot.data.photoResolve;
   }
   ```

### Paginação

A idéia do componente LoadButton é de carregar mais fotos, portanto teremos que **paginar** as photos que aparecem e para isto, existe a API possui uma rota `localhost:3000/user/flavio/photos?page=1`, portanto, conforme é alterado o parâmetro, é alterada as fotos!

1. Criando um novo método no `PhotoService` -> `listFromUserPaginated(username:string, page:number)`

   1. Para adicionar um **queryParam** em uma URL, o método `get`  possui um 2º parâmetro que espera receber um objeto contendo o `params`;
   2. Para que seja feito o `?page=x` será utilizado o método `append` do `HttpParams()`;

   ```typescript
   listFromUserPaginated(username:string, page:number){
       // será criado a estrutura 'page=x'
       const pageParam = new HttpParams().append('page', page.toString());
   
       // será adicionado o '?' + pageParam
       return this.client.get<iPhoto[]>(API + username + '/photos', {params: pageParam});
   
   }
   ```

2. O `Resolver` não irá mais utilizar o `listFromUser` e sim o `listFromUserPaginated` que por padrão, irá sempre exibir a  **1º página**:

   ```typescript
   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<iPhoto[]>{
       const username = route.params.user;
       return this.service.listFromUserPaginated(username, 1);
   }
   ```

#### Componente LoadButton

Mas e se quisermos carregar mais fotos porém mantendo as antigas?

1. Iremos criar o componente `LoadButton` -> `ng g c photos/photo-list/load-button`;

2. Que terá o layout HTML:

   1. Iremos fazer uma verificação para saber se tem mais photos a serem carregadas com o `hasMore` e caso não tenha, seja exibida uma mensagem

   ```html
   <div class="text-center" *ngIf="hasMore;else hasntMore">
     <button class="btn btn-primary">Load more</button>
   </div>
   
   <ng-template #hasntMore>
     <p class="text-center text-muted">No more data to load</p>
   </ng-template>
   ```

   ```typescript
   export class LoadButtonComponent implements OnInit {
       @Input() hasMore: boolean = false;
   }
   ```

3. O `photo-list.html` irá importa-lo:

   ```html
   <app-search (onTyping)="filter = $event"></app-search>
   <app-photos [photos]="photos | filterByDescription:filter"></app-photos>
   <app-load-button></app-load-button>
   ```

4. Agora iremos ter q fazer a variável `hasMore` do `LoadButton` ser alterada e para isto, iremos vincula-la ao `hasMore` do `PhotoList` e como vamos utilizar a paginação, iremos criar uma variável que representará a página atual (que no nosso caso se inicia com um)

   ```typescript
   export class PhotoListComponent implements OnInit {
       photos: iPhoto[] = [];
       filter = '';
       hasMore: boolean = true; //para que inicie o botão aparecendo
       currentPage = 1;
   } 
   ```

5. A idéia agora é fazer com que quando o **botão for clicado** seja chamada a função `load()` que irá chamar o `PhotoService` e fazer um `concat` da lista de photos ja existente!

   ```typescript
   export class PhotoListComponent implements OnInit {
       photos: iPhoto[] = [];
       filter = '';
       hasMore: boolean = true;
       currentPage = 1;
   
       constructor(
       private photoService: PhotoService,
        private route: ActivatedRoute
       ) {
           this.photoService = photoService;
           this.route = route;
       }
   
       ngOnInit(): void {
           this.photos = this.route.snapshot.data.photoResolve;
       }
   
       load() {
           const username = this.route.snapshot.params.user;
           this.photoService
               .listFromUserPaginated(username, ++this.currentPage)
               .subscribe((photos) => {
               this.filter = '';
               this.photos = this.photos.concat(photos);
               if(!photos.length){
                   this.hasMore = false;
               }
           });
       }
   }
   ```

   ```html
   <app-search (onTyping)="filter = $event"></app-search>
   <app-photos [photos]="photos | filterByDescription:filter"></app-photos>
   <app-load-button (click)="load()" [hasMore]="hasMore"></app-load-button>
   ```

   

