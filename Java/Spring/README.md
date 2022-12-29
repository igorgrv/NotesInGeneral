
# Spring
# Reactive Microservices

Pacotes comuns Spring Init:

* Spring Reactive Web
* Spring Data JPA
* Lombok
* h2 Database (depende do BD)

Packages comuns:

* Controller
* Service
* Repository
* Entity
* Dto
  * Request
  * Response
* Utils
* Client



Series:

* [**Part-2: Reactive Microservices with Spring WebFlux**](https://www.udemy.com/course/spring-webflux/?referralCode=E5376C4D4303C02AD3AB) - *CURRENT CLASS*
* [**Part-3: Spring RSocket**](https://www.udemy.com/course/spring-rsocket/?referralCode=A72EC8A45FE10100B46E) 
* [**Part-4: Redis with Spring WebFlux**](https://www.udemy.com/course/spring-webflux-redis/?referralCode=DE8B9FBDA7097BF08E6A) 
* [**Part-5: Design Patterns With WebFlux**](https://www.udemy.com/course/spring-webflux-patterns/?referralCode=42E47B81CC8B4926BD28) 

Code Reference: https://github.com/vinsguru/spring-webflux-course

<img src="./webFlux/resources/springWebvsFlux.png" alt="Screenshot 2022-11-22 at 10.17.15" style="zoom:67%;" />

WebClient foi criado para propor a programação reativa, ou seja, threads rodando em paralelo, invés de uma a uma.

* Benefícios:
  * Maior número de respostas no mesmo tempo
  * Maior performance
  * Menos tempo aguardando



Por default, a JDK irá expor 200 threads, ou seja, até 200 requests simultaneos NÃO haverá diferença entre **Spring Web e WebFlux** , **PORÉM**, quando passamos de 200 requests, o WebFlux se mostra muito mais eficiente!

<img src="./webFlux/resources/webvswebFlux.png" alt="Screenshot 2022-11-22 at 10.20.25" style="zoom:67%;" />



* Responsive - Timely manner 
* Resilient - Continuar responsivo mesmo em caso de falhas
* Elastic - Continuar responsivo mesmo com um grande número de requests (Escalar máquinas)
* Message Driven - Async & Non-blocking



## WebFlux

WebFlux começou a ser suportado a partir do **Spring 5+**.

Para criar um projeto com WebFlux, é necessário utilizar as dependencias:

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>

<!-- optional -->
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <optional>true</optional>
</dependency>
```



## Flux & Mono

Utilizamos:

* Mono, quando temos somente 1 retorno
  * Um Objeto
  * Uma String
  * Um número
* Flux, mais de um retorno
  * Arrays
  * List



### Mono

* `just()` - Utilize para quando quer retornar diretamente um valor (que não envolve nenhuma lógica)

  * ```java
    public static Mono<String> simpleMono (String yourStr) {
      return Mono.just("simple return");
    }
    ```

* `subscribe()` -> para acessar o objeto do Mono (nesse exemplo uma String)

  * ```java
    public static void main(String[] args) {
        simpleMono().subscribe(System.out::println);
    }
    ```

* `fromSupplier()` - utilize para quando acontecer qualquer tipo de processamento/lógica

* `map()` -> utilizado quando queremos **manipular/transformar o valor** 

  * ```java
    public Mono<MyObj> getSquare (int input) {
      return Mono.fromSupplier(() -> input * input)
        				.map(i -> new MyObj(i)); // iremos retornar o tipo MyObj como Mono
    }
    ```

### Flux

* `range()` -> Assim como o `Stream` tem o `range` o Flux prove o mesmo método

* `fromIterabloe()` -> Assim como range, o Iterable recebe um List

  * ```java
    public static Flux<String> nameFlux() {
      return Flux.fromIterable(Arrays.asList("Igor", "Romero"));
    }
    ```

* `subscribe()` -> para acessar o objeto do Flux

  * ```java
    public static void main(String[] args) {
        nameFlux().subscribe(System.out::println);
    }
    ```

* `doOnNext()` -> muito utilizado para ir manipulando os valores

* `delayElements()` -> adiciona um Sleep

* `map()` -> Funciona também como `Stream` , irá manipular o Flux para Objeto T, ficando `Flux<T>`

  * Utilize para chamadas síncronas, ou seja, ele irá fazer 1 a 1 elemento

  * Para chamadas async, utilize o `flatMap`

  * ```java
    public Flux<MyObj> getSquare (int input) {
      return Flux.range(1, 10)
        .delayElements(Duration.ofSeconds(1)) // adiciona um delay de 1sec
        .map(i -> new MyObj(i * input)); // irá criar como se fosse uma Lista de MyObj
      	.doOnNext(i -> System.out.println(i)) // irá printar o MyObj
    }
    ```

  * What if? Adicionarmos a Lista dentro do Flux

    * ```java
      public Flux<MyObj> getSquare (int input) {
        List<Response> list = IntStream.rangeClosed(0, 10)
                  .peek(i -> new SleepUtil(1))
                  .mapToObj(i -> new Response(i * input))
                  .collect(Collectors.toList());
        return Flux.fromIterable(list);
      }
      ```

    * NÃO IRÁ FUNCIONAR - Temos que fazer todo processo dentro do Flux!


* `filter()` -> dado a lógica, o dado é filtrado:

  * ```java
    public static Flux<String> filterName(int stringLenght) {
      return nameFluxUpper().filter(value -> value.length() > stringLenght);
    }
    
    public static void main(String[] args) {
      filterName(4).subscribe(System.out::println);
    }
    ```

* `flatMap()` -> transforma o elemento em um Flux de 1 ou mais elementos (Returns a `Flux<Type>` )

  * Utilize quando:

    * A transformação retornar um Flux ou Mono
    * For utilizar chamadas async
    * REST APIs call (se sua chamada chama outra API, use o flatMap)

  * Quando 

  * ```java
    public static Flux<String> splitName(String name) {
        String[] nameArray = name.split("");
        System.out.println(nameArray);
        return Flux.fromArray(nameArray);
    }
    
    //transformar IGOR em I, G, O ,R
    public static void main(String[] args) {
         filterName(4)
            .flatMap(FluxAndMonoGeneratorService::splitName)
           .subscribe(System.out::println);
    }
    ```



#### Flux & Mono - practice

Dado 3 entidades:

```java
// Movie
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    private MovieInfo movieInfo;
    private List<Review> reviewList;
    private Revenue revenue;

    public Movie(MovieInfo movieInfo, List<Review> reviewList) {
        this.movieInfo = movieInfo;
        this.reviewList = reviewList;
    }

}

// MovieInfo
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieInfo {
    private Long movieInfoId;
    private String name;
    private Integer year;
    private List<String> cast;
    private LocalDate release_date;
}

// Review
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    private Long reviewId;
    private Long movieInfoId;
    private String comment;
    private Double rating;
}
```



Criando Services:

```java
// MovieInfoService
public class MovieInfoService {

	public Flux<MovieInfo> retrieveMoviesFlux() {

		var movieInfoList = List.of(
				new MovieInfo(100l, "Batman Begins", 2005, List.of("Christian Bale", "Michael Cane"),
						LocalDate.parse("2005-06-15")),
				new MovieInfo(101L, "The Dark Knight", 2008, List.of("Christian Bale", "HeathLedger"),
						LocalDate.parse("2008-07-18")),
				new MovieInfo(102L, "Dark Knight Rises", 2008, List.of("Christian Bale", "Tom Hardy"),
						LocalDate.parse("2012-07-20")));

		return Flux.fromIterable(movieInfoList);
	}

	public Mono<MovieInfo> retrieveMovieInfoMonoUsingId(long movieId) {

		var movie = new MovieInfo(movieId, "Batman Begins", 2005, List.of("Christian Bale", "Michael Cane"),
				LocalDate.parse("2005-06-15"));

		return Mono.just(movie);
	}

}


// ReviewService
public class ReviewService {

	public Flux<Review> retrieveReviewsFlux(long movieInfoId) {
		var reviewsList = List.of(new Review(1L, movieInfoId, "Awesome Movie", 8.9),
				new Review(2L, movieInfoId, "Excellent Movie", 9.0));
		return Flux.fromIterable(reviewsList);
	}

}
```



##### Get All Moviews - FlatMap

Para montar um `Movie`, precisamos do `MovieInfo` e `List<Reviews` ou seja, precisaremos chamar 2 APIs para pegar essas informações:

* `MovieInfoService.retrieveMoviesFlux()`
* `ReviewService.retrieveReviewsFlux(movieInfoId)`

E quando falamos em chamar API precisamos utilizar do `flatMap`:

```java
public class MovieService {
  
  private MovieInfoService movieInfoService;
	private ReviewService reviewService;

	public MovieService(MovieInfoService movieInfoService, ReviewService reviewService) {
		this.movieInfoService = movieInfoService;
		this.reviewService = reviewService;
	}
  
  // iremos fazer non-block com Flux já q teremos +1 retorno
  public Flux<Movie> getAllMovies() {
		return movieInfoService.retrieveMoviesFlux()
				.flatMap(movieInfo -> {
					return reviewService.retrieveReviewsFlux(movieInfo.getMovieInfoId())
							.collectList()
							.map(reviewList -> new Movie(movieInfo, reviewList));
				});
	}
}
```



##### Get Movie Given Id - zipWith

Para pegar um Movie dado um Id, temos que utilizar os services:

* `MovieInfoService.retrieveMovieInfoMonoUsingId(movieInfoId)`
* `ReviewService.retrieveReviewsFlux(movieInfoId)`

Exemplo **SEM** `zipWith`:

```java
public Mono<Movie> getMovieById(long movieId) {
  return movieInfoService.retrieveMovieInfoMonoUsingId(movieId)
    .flatMap(movieInfo -> {
      return reviewService.retrieveReviewsFlux(movieInfo.getMovieInfoId())
        .collectList()
        .map(reviewList -> new Movie(movieInfo, reviewList));
    });
}
```

Exemplo **COM** `zipWith`:

```java
public Mono<Movie> getMovieByIdWithZip(long movieId) {
  Mono<MovieInfo> movieInfoMono = movieInfoService.retrieveMovieInfoMonoUsingId(movieId);
  Mono<List<Review>> reviewsMono = reviewService.retrieveReviewsFlux(movieId).collectList();

  return movieInfoMono.zipWith(reviewsMono, (movieInfo, reviews) -> new Movie(movieInfo, reviews));
}
```

* zipWith pode ser feito a partir de um `Mono` com a junção de outro `Mono`.
* `firstMono.zipWith(secondMono, (first, second) -> System.out.println(first + second))`

### doOn* - Good for logs

Flux & Mono seguem um padrão sequencia:

* OnSubscribe
* OnNext
* OnComplete
* OnFinally
* OnError

E para cada um deles vamos ter um `doOn*`, exemplo: `doOnSubscribe` ;

Esses eventos **NÃO** modificam valores, apenas exibem os dados, por isso são **bons para logs ou debugs!**

```java
public Mono<Movie> getMovieById(long movieId) {
  return movieInfoService.retrieveMovieInfoMonoUsingId(movieId)
    .flatMap(movieInfo -> {
      return reviewService.retrieveReviewsFlux(movieInfo.getMovieInfoId())
        .collectList()
        .map(reviewList -> new Movie(movieInfo, reviewList));
    })
    .doOnNext(movie -> log.info("MOVIE INFO:", movie.getMovieInfo().getName()))
    .log();
}

// A CADA MOVIE, SERÁ PRINTADO O MOVIE.NAME + LOGS
```





### GET - MONO - Exposing API

Mono deve retornar 1 objeto:

* Exemplo, retorne a raiz de um número:

  * ```java
    // DTO
    @Data
    @ToString
    @NoArgsConstructor
    public class Response {
      
    	private Date date = new Date();
      private int output;
      
      // construtor que irá receber a saída para o response
      public Response (int output) {
        this.output = output;
      }
    }
    
    
    // SERVICE
    @Service
    public class MathService {
      
      public Mono<Response> getSquare(int input) {
        return Mono.fromSupplier(() -> input * input)
          	.map(i -> new Response(i))
          //.map(Response::new) -> tbm funciona
      }
    }
    
    
    // Controller
    @RestController
    @RequestMapping("/math")
    public class MathController {
      
      @Autowired
      private MathService mathService;
      
      @GetMapping("/square/{input}")
    	public Mono<Response> getSquare(@PathVariable int input) {
        return mathService.getSquare(input)
      }
    }
    ```



### GET - FLEX

* Exemplo, retorne a raiz de um número:

  * ```java
    // DTO
    @Data
    @ToString
    @NoArgsConstructor
    public class Response {
      
    	private Date date = new Date();
      private int output;
      
      // construtor que irá receber a saída para o response
      public Response (int output) {
        this.output = output;
      }
    }
    
    
    // SERVICE
    @Service
    public class MathService {
      
      public Flex<Response> getMultiplicationList(int input) {
        return Flex.range(1, 10) //para gerar 10 iterações
          				.delayElements(Duration.ofSeconds(1))
          				.map(i -> new Response(i * input));
      }
    }
    
    
    // CONTROLLER
    @RestController
    @RequestMapping("/math")
    public class MathController {
      
      @Autowired
      private MathService mathService;
      
      @GetMapping("/multiplication-list/{input}")
    	public Mono<Response> getMultiplicationList(@PathVariable int input) {
        return mathService.getMultiplicationList(input)
      }
    }
    ```



### POST - MONO

* Exemplo, retorne a multiplicação de 2 números:

  * ```java
    // DTO RESPONSE
    @Data
    @ToString
    @NoArgsConstructor
    public class Response {
      
    	private Date date = new Date();
      private int output;
      
      // construtor que irá receber a saída para o response
      public Response (int output) {
        this.output = output;
      }
    }
    
    //DTO REQUEST
    @Data
    @ToString
    public class MultiplicatorDtoRequest {
      private int firstValue;
      private int secondValue;
    }
    
    
    // SERVICE
    @Service
    public class MathService {
      
      public Mono<Response> getMultiplicator(Mono<MultiplicatorDtoRequest> multiplicatorDto) {
        return multiplicatorDto
          	.map(dto -> new Response(dto.getFirstValue() * dto.getSecondValue()));
      }
    }
    
    
    // CONTROLLER
    @RestController
    @RequestMapping("/math")
    public class MathController {
      
      @Autowired
      private MathService mathService;
      
      @PostMapping("/reactive/multiply")
      public Mono<Response> multiplyValues(@RequestBody Mono<MultiplicatorDtoRequest> multiplicatorDto) {
        return mathService.getMultiplicator(multiplicatorDto);
      }
    }
    ```





### Streaming API

Com o uso do `Flux` é possível criarmos uma **Streaming API** - que segue o conceito de **Publisher/Subscriber**.

* Exemplo: O endpoint abaixo do tipo Flux, irá retornar uma resposta quando todas as interações conclurem

  * ```java
    @GetMapping("/reactive/multiplication-table/{input}")
    public Flux<Response> getMultiplicationTablReactive(@PathVariable int input) {
      return reactiveMathService.multiplicationTable(input); //Depois de 10 segundos retorna
    }
    ```

  * ```java
    // ReactiveMathService.multiplicationTable:
    public Flux<Response> multiplicationTable(int input) {
      return Flux.range(1, 10)
        .doOnNext(i -> new SleepUtil(1)) // wait 1 sec
        .map(i -> new Response(i * input))
        .doOnNext(i -> System.out.println("math-service processing: " + i));
    }
    ```



Porém a **Streaming API** nos permite ir retornando para o usuário cada interação (não havendo necessidade de fazer o user esperar os 10 sec).

* Exemplo: 

  * Add o parâmetro `produces` para o `GetMapping`

  * Add o `MediaType = TEXT_EVENT_STREAM_VALUE`

  * ```java
    @GetMapping(value = "/reactive/multiplication-table/{input}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Response> getMultiplicationTablReactive(@PathVariable int input) {
      return reactivMathService.multiplicationTable(input);
    }
    ```


A chamada no endpoint acima, NÃO irá esperar cada resposta, irá exibir uma a uma



### Handling Exceptions

Toda exception lançada dentro de um Flux/Mono, **IRÁ TERMINAR O PROCESSO REACTIVE STREAM**, mas existe meios de tratar a exception.

Exemplo lançando exceptions com `Flux.error()`:

```java
public static Flux<String> throwException() {
  return Flux.just("Igor", "Romero")
    .concatWith(Flux.error(new RuntimeException("Testing an exception with Flux")))
    .concatWith(Flux.just("Vilela"))
    .log();
}

public static void main(String[] args) {
  throwException().subscribe(System.out::println);
}
```



#### onError*

* Recover from exception:

  * `onErrorReturn()` -> Catch the exception e retorna 1 valor default como fallback (Não um Flux)

    * <img src="./webflux/resources/onerrorreturn.png" alt="Screenshot 2022-11-25 at 17.10.01" style="zoom:33%;" />

    * ```java
      public static Flux<String> throwException() {
        return Flux.just("Igor", "Romero")
          .concatWith(Flux.error(new RuntimeException("Testing an exception with Flux")))
          .onErrorReturn("Vilela")
          .log();
      }
      
      public static void main(String[] args) {
        throwException().subscribe(System.out::println);
        // Igor Romero Vilela
      }
      ```

  * `onErrorResume()` -> Permite condicionamente verificar o erro e tomar uma ação ou outra + retorna fallback stream (Flux)

    * ```java
      public static Flux<String> throwException_onErrorResume() {
        return Flux.just("Igor", "Romero")
          .concatWith(Flux.error(new RuntimeException("Not Valid State")))
          .onErrorResume(ex -> {
            if (ex instanceof IllegalStateException) // Quando n for X exception faça Y
              return Flux.just("Vilela");
            return Flux.error(ex);
          })
          .log();
      }
      ```

  * `onErrorContinue()` -> Como nome diz, esse handler nos permite continuar mesmo com o erro - **somente após um `map`**

    * ![Screenshot 2022-11-25 at 18.13.16](./webflux/resources/onErrorContinue.png)

    * ```java
      public static Flux<String> throwException_onErrorContinue() {
        return Flux.just("Igor", "Gomes", "Romero", "Vilela")
          .map(value -> {
            if (value.equals("Gomes"))
              throw new IllegalStateException("Invalid lastName");
            return value;
          })
          .onErrorContinue((ex, value) -> {
            log.error("Exception is: {}", ex.getMessage());
            log.info("Value skipped: {}", value);
          })
          .log();
      }
      ```

* Take an action and throw exception:

  * `onErrorMap()` -> Transformar uma exception lançada em uma exception "conhecida" (Custom exception criada)

    * <img src="./webflux/resources/onErrorMap.png" alt="Screenshot 2022-11-25 at 18.21.35" style="zoom:67%;" />

    * ```java
      public static Flux<String> throwException_onErrorMap() {
        return Flux.just("Igor", "Gomes", "Romero")
          .map(value -> {
            if (value.equals("Gomes"))
              throw new IllegalStateException("Invalid lastName");
            return value;
          })
          .onErrorMap(ex -> {
            return new ReactorException(ex, ex.getMessage()); //changing ex type
          })
          .log();
      }
      ```

    * 

  * `doOnError()`



### Retry

Existem alguns tipos de mecanismo de Retry quando acontece um erro:

* `retry()` -> tenta executar o método novamente infinitas vezes

* `retry(x)` -> tenta x vezes

  * ```java
    public static Flux<String> throwException_onErrorMap() {
      return Flux.just("Igor", "Gomes", "Romero")
        .map(value -> {
          if (value.equals("Gomes"))
            throw new IllegalStateException("Invalid lastName");
          return value;
        })
        .onErrorMap(ex -> {
          return new ReactorException(ex, ex.getMessage());
        })
        .retry(3) // IRÁ TENTAR 3 X O PROCESSO INTEIRO
        .log();
    }
    ```

    ```bash
    18:53:21.578 [main] INFO reactor.Flux.Retry.1 - onSubscribe(FluxRetry.RetrySubscriber)
    18:53:21.579 [main] INFO reactor.Flux.Retry.1 - request(unbounded)
    18:53:21.580 [main] INFO reactor.Flux.Retry.1 - onNext(Igor)
    Igor
    18:53:21.597 [main] INFO reactor.Flux.Retry.1 - onNext(Igor)
    Igor
    18:53:21.597 [main] INFO reactor.Flux.Retry.1 - onNext(Igor)
    Igor
    18:53:21.598 [main] INFO reactor.Flux.Retry.1 - onNext(Igor)
    Igor
    18:53:21.598 [main] ERROR reactor.Flux.Retry.1 - onError(com.learnreactiveprogramming.exception.ReactorException)
    18:53:21.599 [main] ERROR reactor.Flux.Retry.1 - 
    com.learnreactiveprogramming.exception.ReactorException: null
    ```

* `retryWhen(Retry)` -> Permite realizar retries mais avançados. Tente novamente X coisas quando a exception for Y, ou tente novamente depois de X segundos...

  * retryWhen espera o tipo `Retry` como parâmetro.

  * ```java
    public static Flux<String> throwException_onErrorMap() {
    
      RetryBackoffSpec retryWhen = Retry.backoff(5, Duration.ofSeconds(5));
    
      return Flux.just("Igor", "Gomes", "Romero")
        .map(value -> {
          if (value.equals("Gomes"))
            throw new IllegalStateException("Invalid lastName");
          return value;
        })
        .onErrorMap(ex -> {
          return new ReactorException(ex, ex.getMessage());
        })
        .retryWhen(retryWhen)
        .log();
    }
    ```



### Repeat

* `repeat(n)` -> repete uma determinada sequencia, invoked depois do `onCompletion()` - ele irá parar se houver **uma exception**

```java
public static Flux<String> repeateFlux() {
  return Flux.fromIterable(Arrays.asList("Igor", "Romero"))
    .repeat(2);
}
```

* `repeatWhen()`



### Blocking calls - Scheduler

Schedulers é uma factory class feita para controlar as threads em reactive pipelines

* `Schedulers.boundElastic()` -> ideal para fazer blocking calls (chamadas que possam haver delay);



Em conjunto com `subscribeOn` irá influenciar a thread que está atuando

![Screenshot 2022-11-25 at 21.53.02](./webflux/resources/subscribeOn.png)

## WebClient - Calling APIs

O `WebClient` é utilizado para chamar API's e é amplamente usado com `Mono` & `Flux`.

* `retrieve()` -> é o que vai basicamente fazer a chamada
* `bodyToMono` -> é o que converte o valor recebido
* `get()` - `post()` - `delete()` -> métodos HTTP

### GET - MONO

```java
public Mono<String> responseExample () {
  return WebClient
    .builder()
    .baseUrl("http://baseUrl.com")
    .build()
    .get()
    .uri("/activity?param={input}", input)
    .retrieve()
    .bodyToMono(String.class);
}
```

* `bodyToMono(String.class)` é para quando não queremos fazer o parse da chamada

### ClientConfig

Muitas vezes a URL base será a mesma, então para encapsular o método abaixo, criamos um `@Bean`:

```java
package com.igorromero.webfluxdemo.config;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl("http://localhost:8080")
                .build();
    }
}
```

Quando for utilizado, basta passar a chamada diretamente:

```java
@Service
public class ClientMathService {
    
    @Autowired
    private WebClient webClient;

    public Mono<String> getSquare(int input) {
        return webClient
          .get()
          .uri("/activity?param={input}", input)
          .retrieve()
          .bodyToMono(String.class);
    }
}


//CONTROLLER
@RestController
@RequestMapping("/client")
public class ClientMathController {
    
    @Autowired
    private ClientMathService clientMathService;

    @GetMapping("/square/{input}")
    public Mono<Response> getSquareClient(@PathVariable int input) {
        return clientMathService.getSquare(input);
   }
}
```



### GET - FLUX

Basta utilizarmos o `bodyToFlux`:

```java
@Service
public class ClientMathService {
    
    @Autowired
    private WebClient webClient;

    public Flux<Response> getMultiplicationTable(int input) {
        return webClient
          			.get()
          			.uri("math/reactive/multiplication-table/{input}", input)
                .retrieve()
                .bodyToFlux(Response.class)
                .doOnNext(i -> System.out.println(i));
    }
}


//CONTROLLER
@RestController
@RequestMapping("/client")
public class ClientMathController {
    
    @Autowired
    private ClientMathService clientMathService;

   @GetMapping("/multiplication-table/{input}")
    public Flux<Response> getMultiplicationTable(@PathVariable int input) {
        return clientMathService.getMultiplicationTable(input);
   }
}
```



### POST - MONO

```java
@Service
public class ClientMathService {
  
  @Autowired
  private WebClient webClient;
  
  public Mono<Response> getMultiplicator(int first, int second) {
        return webClient
                .post()
                .uri("math/reactive/multiply")
                .bodyValue(new MultiplicatorDto(first, second))
                .retrieve()
                .bodyToMono(Response.class); 
  }
}


//CONTROLLER
@RestController
@RequestMapping("/client")
public class ClientMathController {
  
  @GetMapping("/multiplicator")
  public Mono<Response> getMultiplicator(@RequestParam(required = true) int first,
                                         @RequestParam(required = true) int second) {

    return clientMathService.getMultiplicator(first, second);
  } 
}
```



### Headers

Para setar o header, basta utilizar do `headers`:

```java
.headers(h -> h.set("Authorization", authorization)) //setar o header
```

Exemplo:

```java
// DTO
@Data
@ToString
public class SlackChatRequestDto {
    
    private boolean asUser;
    private String channel;
    private String text;
}

// SERVICE
@Service
public class SlackService {

    public Mono<String> getChannelList(SlackChatRequestDto slackChatDto, String authorization) {
        return webClient()
                .post()
                .uri("/chat.postMessage")
                .bodyValue(slackChatDto)
                .headers(h -> h.set("Authorization", authorization)) //setar o header
                .retrieve()
                .bodyToMono(String.class);
    }

    public WebClient webClient() {
        return WebClient.builder().baseUrl("https://slack.com/api").build();
    }

}

// CONTROLLER
@RestController
@RequestMapping("/slack")
public class SlackController {

    @Autowired
    private SlackService slackService;

    @PostMapping("/chat")
    public Mono<String> postSlackMessage(@RequestHeader(required = true) String authorization,
            @RequestBody SlackChatRequestDto slackChatDto) {
        return slackService.getChannelList(slackChatDto, authorization);
    }
}
```

#### Basic Auth

BasicAuth pode ser emitido dentro do headers também:
```java
.headers(h -> h.setBasicAuth("userName", "password"))
```



### Retrieve vs Exchange

Exchange = Retrieve + Informações do response (status, body)

* Retrieve:

  * ```java
    public Mono<String> callingRetrieve(YourClass yourClassDto) {
      return webClient
                    .post()
                    .uri("myUrl")
                    .bodyValue(yourClassDto)
                    .retrieve()
                    .bodyToMono(String.class);
    }
    ```

* Exchange:

  * ```java
    public Mono<Object> getChannelList(SlackChatRequestDto slackChatDto, String authorization) {
            return webClient()
                    .post()
                    .uri("/chat.postMessage")
                    .bodyValue(slackChatDto)
                    .headers(h -> h.set("Authorization", authorization))
                    .exchangeToMono(this::exchange);
    }
    
    private Mono<Object> exchange(ClientResponse cr) {
      if (cr.rawStatusCode() != 200) {
        System.out.println("Error HTTP: " + cr.rawStatusCode());
        return cr.bodyToMono(InputValidationFailedResponse.class);
      }
      return cr.bodyToMono(String.class);
    }



#### Handling body - FlatMap (exchange)

```java
    public Mono<IsspTreeNode> get(ObjRequest objRequest) {

        return webClient.post().uri(mrtTreeEndpoint)
            .body(BodyInserters.fromObject(objRequest))
            .header(AuthConstants.BLUE_API_IBM_CLIENT_ID, ibmClientId)
            .exchange().
            flatMap(clientResponse -> {
            	HttpStatus status = clientResponse.statusCode();
                log.debug("Http status: {}", status.toString());
            	if ((status == HttpStatus.UNAUTHORIZED || status.is5xxServerError()){
                  log.error("Server is down: {}", status.toString());
                  try {
                      return Mono.just(methodHandleErrors);
                  } catch (RuntimeException e) {
                    log.error(e.getMessage(), e);
                    return Mono.error(e);
                  }
              } else if (status.is2xxSuccessful()){
                Mono<Object> objResponse = clientResponse.bodyToMono(ObjectResponse.class)
                    .map(value -> value.stream().map(getAnotherValue()) );
                return objResponse;
              } else {
                  log.error("Server Error {}", status, clientResponse.body(BodyExtractors.toDataBuffers()));
                  return Mono.error(new RuntimeException("Server error: " + status + clientResponse));
              }
            })
            .doOnSuccess(resp -> cacheService.putValue(cacheKey, resp))
            .doOnError(error -> log.error("MRT Tree retrieval error: {}", error.getMessage()));
    }
```



#### Handling Body - Method (retrieve + JsonNode)

```java
  @Override
  public Mono<YourClass> getW3UserInfoByUserId(String userId) {
    return webClient.get()
        .uri("yourURI")
        .header(SecurityFilter.HEADER_SECRET, environment.getProperty(SecurityFilter.SECRET_KEY))
        .accept(MediaType.APPLICATION_JSON)
        .retrieve()
        .bodyToMono(JsonNode.class)
        .map(this::parseFunctionalUser).onErrorMap(
            WebClientResponseException.class, error -> new YourException(
                "Error trying to get XYZ",
                error.getStatusCode()));
  }

  private YourClass parseFunctionalUser(JsonNode node) {
    if (node.has("results") && node.get("results").isArray()
        && node.get("results").size() == 1) {
      return new YourClass(node.get("results").get(0));
    }
    throw new RuntimeException("Error trying to get user info");
  }
```





### Query Params

Para chamar rotas, como: `https://yourUrl.com/endpoint?firstParam=123,secondParam=123` será necessário `UriComponentBuilder`

*Com `UriComponentsBuilder` é necessário pasasr o fullPath

```java
URI uri = UriComponentsBuilder
  	.fromUriString("https://yourUrl.com/conversations.info?token={token}&channel={channel}")
    .build(token, channel);

return webClient().get().uri(uri).retrieve().bodyToMono(String.class);
```

Para manter o `baseUrl` do `WebClient` é possível através de `query`:

```java
this.webClient
  .get()
  .uri(b -> b.path("/conversations.info")
       .query("token={token}&channel={channel}")
       .build(token, channel)
      )
   .retrieve()
   .bodyToMono(SlackChatResponseDto.class);
```



### Increase Memory Size

WebClient por default não aceita um response acima de X bytes. Para aumentar, podemos utilizar de `exchangeStrategies`

```java
public YourClient(String url) {
  final int size = 16 * 1024 * 1024;
  final ExchangeStrategies strategies = ExchangeStrategies.builder()
    .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
    .build();

  this.webClient = WebClient.builder()
    .exchangeStrategies(strategies).baseUrl(url).build();
}
```



### Sync calls - block

Para utilizar o novo pattern do Spring de chamadas sincronas, podemos utilizar o `block` - que irá segurar a thread até que a chamada seja concluída! (ou seja, irá remover todo o beneficio do Mono e Flux)

Exemplo:

```java
public SlackChannelBotResponse requestChannelsGivenBot(String token) {
  return this.webClient
    .post()
    .uri(u -> u.path("/conversations.list").query("token={token}")
         .build(token))
    .retrieve()
    .bodyToMono(SlackChannelBotResponse.class)
    .block(); //aqui iremos pausar todo processamento
}
```



### Delays

Determinadas APIs exigem um tempo de processamento antes de realizar as chamadas, isso é possível com `delaySubscription`

Exemplo:

```java
public Mono<SlackChannelBotResponse> requestChannelsGivenBot(String token) {
  return this.webClient
    .post()
    .uri(u -> u.path("/conversations.list").query("token={token}")
         .build(token))
    .retrieve()
    .bodyToMono(SlackChannelBotResponse.class)
    .delaySubscription(Duration.ofSeconds(5)); //irá esperar 5 segundos para fazer a chamada!
}
```



# Java Async



## CompletableFuture

Métodos:

* `.supplyAsync()`

  * Chama uma thread no background e retorna imediatamente
  * Retorna: `CompletableFuture<T>`

* `.thenAccept()`

  * Espera a chamada terminar para ter o resultado;

  * Recebe um valor da chamada anterior:

    * ```java
      CompletableFuture
        .supplyAsync(() -> myService.call())
        .thenAccept((result) -> sysout(resultOfMyService.call));
      ```

  * Retorna: `CompletableFuture<Void>`;

  * Normalmente utilizado no **final** das chamadas;

* `.join()`

  * Segura a thread `main` até que o processo do CompletableFuture seja concluído

    * Ex.:

      * ```java
        CompletableFuture
          .supplyAsync(() -> myService.call())
          .thenAccept((result) -> sysout(resultOfMyService.call))
          .join();
        ```

* `.thenApply()`

  * Utilizado para **transformar** o dado;

    * ```java
      CompletableFuture
        .supplyAsync(() -> myService.call())
        .thenApply((result) -> result.upperCase())
        .thenAccept((result) -> sysout(resultOfMyService.call))
        .join();
      ```

      
