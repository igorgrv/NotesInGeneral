
# Spring
# Reactive Microservices

Series:

* [**Part-2: Reactive Microservices with Spring WebFlux**](https://www.udemy.com/course/spring-webflux/?referralCode=E5376C4D4303C02AD3AB) - *CURRENT CLASS*
* [**Part-3: Spring RSocket**](https://www.udemy.com/course/spring-rsocket/?referralCode=A72EC8A45FE10100B46E) 
* [**Part-4: Redis with Spring WebFlux**](https://www.udemy.com/course/spring-webflux-redis/?referralCode=DE8B9FBDA7097BF08E6A) 
* [**Part-5: Design Patterns With WebFlux**](https://www.udemy.com/course/spring-webflux-patterns/?referralCode=42E47B81CC8B4926BD28) 

Code Reference: https://github.com/vinsguru/spring-webflux-course

<img src="/Users/igorgomesromerovilela/Development/NotesInGeneral/Java/Spring/resources/springWebvsFlux.png" alt="Screenshot 2022-11-22 at 10.17.15" style="zoom:67%;" />

WebClient foi criado para propor a programação reativa, ou seja, threads rodando em paralelo, invés de uma a uma.

* Benefícios:
  * Maior número de respostas no mesmo tempo
  * Maior performance
  * Menos tempo aguardando



Por default, a JDK irá expor 200 threads, ou seja, até 200 requests simultaneos NÃO haverá diferença entre **Spring Web e WebFlux** , **PORÉM**, quando passamos de 200 requests, o WebFlux se mostra muito mais eficiente!

<img src="/Users/igorgomesromerovilela/Library/Application Support/typora-user-images/Screenshot 2022-11-22 at 10.20.25.png" alt="Screenshot 2022-11-22 at 10.20.25" style="zoom:67%;" />



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



## Flux & Mono - Exposing APIs

Utilizamos:

* Mono, quando temos somente 1 retorno
  * Um Objeto
  * Uma String
  * Um número
* Flux, mais de um retorno
  * Arrays
  * List



### Mono - methods

* `just()` - Utilize para quando quer retornar diretamente um valor (que não envolve nenhuma lógica)

  * ```java
    public Mono<String> simpleMono (String yourStr) {
      return Mono.just("simple return");
    }
    ```

* `fromSupplier()` - utilize para quando acontecer qualquer tipo de processamento/lógica

  * ```java
    public Mono<MyObj> getSquare (int input) {
      return Mono.fromSupplier(() -> input * input)
        				.map(i -> new MyObj(i)); // iremos retornar o tipo MyObj como Mono
    }
    ```

  

### Flux - methods

* `range()` -> Assim como o `Stream` tem o `range` o Flux prove o mesmo método

* `doOnNext()` -> muito utilizado para ir manipulando os valores

* `delayElements()` -> adiciona um Sleep

* `map()` -> Funciona também como `Stream` , irá manipular o Flux para Objeto T, ficando `Flux<T>`

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



### GET - MONO - Server side

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



## WebClient - Calling APIs

O `WebClient` é utilizado para chamar API's e é amplamente usado com `Mono` & `Flux`.

* `retrieve()` -> é o que vai basicamente fazer a chamada
* `bodyToMono` -> é o que converte o valor recebido

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

```java
// ignorando o início da URL:
URI uri = UriComponentsBuilder.fromUriString("/conversations.info?token={token}&channel={channel}")
                .build(token, channel);

return webClient().get().uri(uri).retrieve().bodyToMono(String.class);
```



## WebClient - Microservices







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

      
