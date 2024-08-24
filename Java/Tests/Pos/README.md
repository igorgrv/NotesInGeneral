# Testes / T. Integrado / Performance

## JUnit

Dependências:

```xml
<dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter-api</artifactId>
  <version>5.10.1</version>
  <scope>test</scope>
</dependency>
<dependency>
  <groupId>org.assertj</groupId>
  <artifactId>assertj-core</artifactId>
  <version>3.24.2</version>
</dependency>
```

Staticos:

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.catchThrowable;
```

 VSCode - `settings.json`:

```json
"java.completion.favoriteStaticMembers": [
    "org.assertj.core.api.*",
    "org.assertj.core.api.Assertions.*",
    "org.junit.Assert.*",
    "org.junit.Assume.*",
    "org.junit.jupiter.api.Assertions.*",
    "org.junit.jupiter.api.Assumptions.*",
    "org.junit.jupiter.api.DynamicContainer.*",
    "org.junit.jupiter.api.DynamicTest.*",
    "org.mockito.Mockito.*",
    "org.mockito.ArgumentMatchers.*",
    "org.mockito.Answers.*"
  ],
```

## 

Dependêcias:

* `<scope>test</scope>` = significa que somente irá ser carregada quando rodarmos testes

```xml
<!-- JUNIT ESTÁ DEPRECATED - USAR ORG.JUNIT.JUPITER -->
<!-- 
<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>4.13.2</version>
</dependency> -->
<!-- ORG.JUNIT.JUPITER - necessario para Intellij -->
<!-- <dependency>
  <groupId>org.junit.jupiter</groupId>
  <artifactId>junit-jupiter-engine</artifactId>
  <version>5.10.1</version>
  <scope>test</scope>
</dependency> -->
```



### assertEquals

```java
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CalculadoraTest {

  Calculadora calculadora;

  @BeforeEach
  public void setup() {
    this.calculadora = new Calculadora();
  }

  @Test
  public void deveSomar() {
    int resultado = calculadora.soma(3, 2);
    assertEquals(5, resultado);
  }

  @Test
  public void deveSubtrair() {
    int resultado = calculadora.substracao(3, 2);
    assertEquals(1, resultado);
  }
}
```



### assertThrows

Se sabemos que o método também lança uma exception dado um problema, então usamos `assertThrows`

```java
@Test
public void deveDividir() {
  assertThrows(ArithmeticException.class, () -> {
    int resultado = calculadora.divisao(10, 0);
    assertEquals(5, resultado);
  });
}
```



## AssertJ

O AsserJ melhora a sintaxe do JUNIT

```xml
<dependency>
  <groupId>org.assertj</groupId>
  <artifactId>assertj-core</artifactId>
  <version>3.24.2</version>
</dependency>
```

### assertThat

```java
import static org.assertj.core.api.Assertions.assertThat;

@Test
public void deveSomar() {
  int resultado = calculadora.soma(3, 2);
  assertThat(resultado).isEqualTo(5);
}
```

Existem diversos tipos de `assetThat`:

```java
// para save
assertThat(savedMessage)
        .isInstanceOf(Message.class)
        .isNotNull()
        .isEqualTo(message);

// para findById
assertThat(messageOptional)
        .isPresent()
        .containsSame(message);

// para findAll
assertThat(resultado)
        .hasSize(2)
        .containsExactlyInAnyOrder(mensagem1, mensagem2);
```



### isInstanceOf

Para capturar a exception e também a mensagem da exception, podemos:

```java
@Test
public void deveDividir() {
  Throwable exception = catchThrowable(() -> calculadora.divisao(10, 0));
  assertThat(exception).isInstanceOf(ArithmeticException.class);
}
```

ou validando a mensagem:

```java
@Test
public void deveDividir() {
  Throwable exception = catchThrowable(() -> calculadora.divisao(10, 0));
  assertThat(exception).isInstanceOf(ArithmeticException.class).hasMessage("divide by zero");
}
```



### doNothing()

As vezes não queremos q o mockito realize alguma operação, para isso temos o **`doNothing()`**

```java
// para o deleteBy
doNothing().when(mensagemRepository).deleteById(id);
```



### assertThatThrowBy

Considerando que o `findPostById` lance uma exception, podemos:

```java
assertThatThrownBy(() -> postService.findPostById(UUID.randomUUID()))
      .isInstanceOf(RuntimeException.class)
      .hasMessageContaining("UUID not found");
```





## TDD

TDD = ***Test Driver Development***, ou Desenvolvimento Orientado a Testes, envolve:

1. Partimos do Teste/criamos uma hipótese
2. Teste irá falhar
3. Fazemos o teste funcionar
4. Refatoramos

<img src="/Users/igorgomesromerovilela/Development/NotesInGeneral/Java/graduate/imageResource/tdd.png" alt="tdd" style="zoom:80%;" />

Exemplo:

```java
// Primeiros fazemos falhar:
@Test
public void devePermitirRegistrarInformacao(){
  Assert.fail("teste não implementado")
}

@Test
public void devePermitirConsultarInformacao(){
  Assert.fail("teste não implementado")
}
```



### @BeforeAll / @Before / @After

```java
class ClasseTest {
 	@BeforeAll
  public void beforeClass(){
    LOG.info("inicio dos testes")
  }
  @Before
  public void beforeTest(){
    LOG.info("antes do teste")
  }
  @Test
  public void testA(){
    LOG.info("teste A")
  }
  @Test
  public void testA(){
    LOG.info("teste B")
  }
  @After
  public void afterTest(){
    LOG.info("depois do teste")
  }
  @AfterAll
  public void afterClass(){
    LOG.info("finaliza testes")
  } 
}

// inicio dos testes
// antes do teste
// teste 1
// depois do teste
// teste b
// depois do teste
// finaliza testes
```



## Mockito

Por default, o mockito no spring boot vem incluído na dependência:

```xml
<dependency>
  <groupId>org.mockito</groupId>
  <artifactId>mockito-core</artifactId>
  <version>3.12.4</version>
</dependency>
```

* Mockito/Dublê, serve para **simular** **chamadas ao banco de dados**

Para simular o banco, vamos incluir o H2:

```xml
<dependency>
  <groupId>com.h2database</groupId>
  <artifactId>h2</artifactId>
  <version>2.2.224</version>
  <scope>test</scope>
</dependency>
```

`application-test.yaml`:

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driverClassName: org.h2.Driver
    username: admin
    password: 
  jpa:
    database: h2
    database-platform: org.hibernate.dialect.H2Dialect
    defer-datasource-initialization: true
    hibernate.ddl-auto: create-drop
    properties.hibernate:
      show_sql: true
      format_sql: true
      globally_quoted_identifiers: true
```



### Setup

Config default para o Mockito;

```java
class MessageRepositoryTest {
  
  @Mock
  private MessageRepository messageRepository;

  AutoCloseable openMocks;

  @BeforeEach
  void setup() throws Exception {
    openMocks = MockitoAnnotations.openMocks(messageRepository);
  }

  @AfterEach
  void teardown() throws Exception {
    openMocks.close();
  }
}
```



### when()

Para **simular** a chamada ao repositório utilizamos o `when()`

* `when(repository.save(objeto)).thenReturn(objeto);`

  ```java
  class RepositoryTest {
    @Mock
    private MessageRepository messageRepository;
    
  	// setup comentado
    
     private Message generateMessage() {
      return Message.builder()
        .uuid(UUID.randomUUID())
        .user("user 1")
        .message("message is 123")
        .build();
    }
  
    @Test
    void mustSaveMessage() {
      Message message = generateMessage();
  
      // se chamar .save para any objeto do tipo Message, então retorne o objeto criado
      when(messageRepository.save(any(Message.class))).thenReturn(message);
      
      // o mockito irá ser acionado neste step
      Message savedMessage = messageRepository.save(message);
  
      assertThat(savedMessage)
          .isInstanceOf(Message.class)
          .isNotNull()
          .isEqualTo(message);
      verify(messageRepository, times(1)).save(any(Message.class));
    }
  }
  ```

* Para o `findById`:

  ```java
  @Test
  void mustFindMessage() {
    UUID id = UUID.randomUUID();
    Message message = generateMessage();
    message.setUuid(id);
  
    when(messageRepository.findById(id)).thenReturn(Optional.of(message));
  
    Optional<Message> messageOptional = messageRepository.findById(id);
  
    verify(messageRepository, times(1)).findById(id);
    
    assertThat(messageOptional).isPresent().containsSame(message);
    messageOptional.ifPresent(savedMessage -> {
      assertThat(savedMessage.getUuid()).isEqualTo(id);
      assertThat(savedMessage.getMessage()).isEqualTo(message.getMessage());
    });
  }
  ```




### Service

Para testar a camada Service, devemos:

* Mockar a Repository
* Criar um `AutoCloseable` + setup + tearDown
* Quando o método da service for chamado, devemos **antes mockar o comportamento da repository**;

```java
class PostServiceTest {

  private PostService postService;

  @Mock
  private PostRepository postRepository;
  AutoCloseable openMocks;

  @BeforeEach
  void setup() {
    openMocks = MockitoAnnotations.openMocks(this);
    postService = new PostService(postRepository);
  }

  @AfterEach
  void tearDown() throws Exception {
    openMocks.close();
  }

  private Post generatePosts() {
    return Post.builder()
        .uuid(UUID.randomUUID())
        .user("user 1")
        .message("posts is 123")
        .build();
  }

  @Test
  void mustSavePost() {
    Post postCreated = generatePosts();

    when(postRepository.save(any(Post.class))).thenReturn(postCreated);

    Post savedPost = postService.savePost(postCreated);
    assertThat(savedPost).isInstanceOf(Post.class).isNotNull();
    assertThat(savedPost.getMessage()).isEqualTo("posts is 123");
  }

 	@Test
  void mustFindPost() {
    UUID id = UUID.randomUUID();
    Post post = generatePosts();
    post.setUuid(id);

    when(postRepository.findById(id)).thenReturn(Optional.of(post));
    Post postFound = postService.findPostById(id);

    assertThat(postFound).isInstanceOf(Post.class).isNotNull().isEqualTo(post);
    assertThat(postFound.getMessage()).isEqualTo("posts is 123");
    verify(postRepository, times(1)).findById(any(UUID.class));
  }
  
  @Test
  void mustThrowExceptionIfPostIsNotFound() {

    when(postRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

    assertThatThrownBy(() -> postService.findPostById(UUID.randomUUID()))
      .isInstanceOf(RuntimeException.class)
      .hasMessageContaining("UUID not found");
    
    verify(postRepository, times(1)).findById(any(UUID.class));
  }
  
  @Test
  void mustUpdatePostMessage() {
    UUID uuid = UUID.randomUUID();
    String newMessage = "message updated";
    Post oldPost = generatePosts();
    oldPost.setUuid(uuid);

    when(postRepository.findById(uuid)).thenReturn(Optional.of(oldPost));
    when(postRepository.save(any(Post.class))).thenAnswer(i -> i.getArgument(0));

    Post postUpdated = postService.updatePostMessage(uuid, newMessage);
    assertThat(postUpdated).isInstanceOf(Post.class).isNotNull();
    assertThat(postUpdated.getMessage()).isEqualTo(newMessage);
    verify(postRepository, times(1)).findById(any(UUID.class));
    verify(postRepository, times(1)).save(any(Post.class));
  }
  
  @Test
  void devePermitirApagarMensagem() {
    var id = UUID.fromString("51fa607a-1e61-11ee-be56-0242ac120002");
    var mensagem = MensagemHelper.gerarMensagem();
    mensagem.setId(id);
    when(mensagemRepository.findById(id))
        .thenReturn(Optional.of(mensagem));
    doNothing()
        .when(mensagemRepository).deleteById(id);

    var resultado = mensagemService.apagarMensagem(id);

    assertThat(resultado).isTrue();
    verify(mensagemRepository, times(1)).findById(any(UUID.class));
    verify(mensagemRepository, times(1)).delete(any(Mensagem.class));
  }
  
}
```



## Teste Integrado

### Repository

O Teste integrado para **repository** funciona **como** se estivessemos criando **um** ***Service***, mas precisamos das anotações abaixo na classe de test:

* necessário ter um `application-test.yaml`

```java
@SpringBootTest
@AutoConfigureTestDatabase
@ActiveProfiles("test")
@Transactional
// IT stands for Integrated Test
class MessageRepositoryIT {}
```

Ao invés de usarmos o Mock, iremos usar o próprio `@Autowired`:

```java
@SpringBootTest
@AutoConfigureTestDatabase
@ActiveProfiles("test")
@Transactional
class MensagemRepositoryIT {

  @Autowired
  private MensagemRepository mensagemRepository;

  @Test
  void devePermitirCriarTabela() {
    long totalTabelasCriada = mensagemRepository.count();
    assertThat(totalTabelasCriada).isNotNegative();
  }
}
```

Dessa forma ficamos com um cenário parecido com o do Service:

```java
private Post generatePosts() {
  return Post.builder()
      .uuid(UUID.randomUUID())
      .user("user 1")
      .message("posts is 123")
      .build();
}

private Post savePost(Post post) {
  return postRepository.save(post);
}

@Test
void mustSavePost() {
  UUID randomUUID = UUID.randomUUID();
  Post post = generatePosts();
  post.setUuid(randomUUID);
  Post savedPost = savePost(post);

  long count = postRepository.count();
  assertThat(count).isPositive();

  assertThat(savedPost).isInstanceOf(Post.class).isNotNull();
  assertThat(savedPost.getUser()).isEqualTo("user 1");
  assertThat(savedPost.getMessage()).isEqualTo("posts is 123");
}

@Test
void mustFindPost() {
  UUID randomUUID = UUID.randomUUID();
  Post postGenerated = generatePosts();
  postGenerated.setUuid(randomUUID);

  Optional<Post> postOpt = postRepository.findById(randomUUID);

  assertThat(postOpt).isPresent();

  postOpt.ifPresent(post -> {
    assertThat(post.getUuid()).isEqualTo(randomUUID);
    assertThat(post).isInstanceOf(Post.class).isNotNull();
    assertThat(post.getUser()).isEqualTo("user 1");
    assertThat(post.getMessage()).isEqualTo("posts is 123");
  });
}
```



### Service

```java
@SpringBootTest
@AutoConfigureTestDatabase
@ActiveProfiles("test")
@Transactional
class MensagemServiceIT {

  @Autowired
  private MensagemRepository mensagemRepository;

  @Autowired
  private MensagemService mensagemService;

  @Test
  void devePermitirRegistrarMensagem() {
    var mensagem = MensagemHelper.gerarMensagem();

    var mensagemArmazenada = mensagemService.criarMensagem(mensagem);

    assertThat(mensagemArmazenada)
        .isNotNull()
        .isInstanceOf(Mensagem.class);
    assertThat(mensagemArmazenada.getId())
        .isNotNull();
    assertThat(mensagemArmazenada.getUsuario())
        .isNotNull()
        .isNotEmpty()
        .isEqualTo(mensagem.getUsuario());
    assertThat(mensagemArmazenada.getConteudo())
        .isNotNull()
        .isNotEmpty()
        .isEqualTo(mensagem.getConteudo());
  }

  @Test
  void devePermitirBuscarMensagem() {
    var mensagem = MensagemHelper.registrarMensagem(mensagemRepository);

    var mensagemObtidaOptional = mensagemRepository.findById(mensagem.getId());

    assertThat(mensagemObtidaOptional)
        .isPresent()
        .containsSame(mensagem);
    mensagemObtidaOptional.ifPresent(mensagemObtida -> {
      assertThat(mensagemObtida.getId())
          .isEqualTo(mensagem.getId());
      assertThat(mensagemObtida.getUsuario())
          .isEqualTo(mensagem.getUsuario());
      assertThat(mensagemObtida.getConteudo())
          .isEqualTo(mensagem.getConteudo());
      assertThat(mensagemObtida.getDataCriacao())
          .isEqualTo(mensagem.getDataCriacao());
    });
  }

  @Test
  void deveGerarExcecao_QuandoBuscarMensagem_IdNaoExistente() {
    var id = UUID.fromString("50537a52-1ab2-11ee-be56-0242ac120002");

    assertThatThrownBy(() -> mensagemService.buscarMensagem(id))
        .isInstanceOf(MensagemNotFoundException.class)
        .hasMessage("mensagem não encontrada");
  }

  @Test
  void devePermirirAlterarMensagem() {
    var mensagemOriginal = MensagemHelper.registrarMensagem(mensagemRepository);
    var mensagemModificada = mensagemOriginal.toBuilder().build();
    mensagemModificada.setConteudo("abcd");

    var mensagemObtida = mensagemService.alterarMensagem(mensagemOriginal.getId(),
        mensagemModificada);

    assertThat(mensagemObtida)
        .isInstanceOf(Mensagem.class)
        .isNotNull();
    assertThat(mensagemObtida.getId())
        .isEqualTo(mensagemModificada.getId());
    assertThat(mensagemObtida.getUsuario())
        .isEqualTo(mensagemModificada.getUsuario());
    assertThat(mensagemObtida.getConteudo())
        .isEqualTo(mensagemModificada.getConteudo());
  }

  @Test
  void deveGerarExcecao_QuandoAlterarMensagem_IdNaoCoincide() {
    var id = UUID.fromString("5f789b39-4295-42c1-a65b-cfca5b987db2");
    var mensagemNova = MensagemHelper.gerarMensagemCompleta();

    assertThatThrownBy(
        () -> mensagemService.alterarMensagem(id, mensagemNova))
        .isInstanceOf(MensagemNotFoundException.class)
        .hasMessage("mensagem não apresenta o ID correto");
  }

  @Test
  void devePermitirApagarMensagem() {
    var mensagemRegistrada = MensagemHelper.registrarMensagem(mensagemRepository);
    var resultado = mensagemService.apagarMensagem(mensagemRegistrada.getId());
    assertThat(resultado).isTrue();
  }

  @Test
  void devePermitirIncrementarGostei() {
    var mensagemRegistrada = MensagemHelper.registrarMensagem(mensagemRepository);

    var mensagemRecebida = mensagemService.incrementarGostei(mensagemRegistrada.getId());

    assertThat(mensagemRecebida.getGostei()).isEqualTo(1);
  }

  @Test
  void devePermitirListarMensagens() {
    Page<Mensagem> mensagens = mensagemService.listarMensagens(Pageable.unpaged());

    assertThat(mensagens).hasSize(5);
    assertThat(mensagens.getContent())
        .asList()
        .allSatisfy(mensagem -> {
          assertThat(mensagem).isNotNull();
          assertThat(mensagem).isInstanceOf(Mensagem.class);
        });
  }

  @Test
  @Sql(scripts = {"/clean.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
  void devePermitirListarTodasAsMensagens_QuandoNaoExisteRegistro() {
    Page<Mensagem> mensagens = mensagemService.listarMensagens(Pageable.unpaged());
    assertThat(mensagens).isEmpty();
  }

}
```



## Nested

Uma forma de organizar os testes é utilizando `@Nested`:

```java
  @Nested
  class RegistrarMensagem {

    @Test
    void devePermitirRegistrarMensagem() {
      var mensagem = MensagemHelper.gerarMensagem();
      when(mensagemRepository.save(any(Mensagem.class)))
          .thenAnswer(i -> i.getArgument(0));

      var mensagemArmazenada = mensagemService.criarMensagem(mensagem);

      assertThat(mensagemArmazenada)
          .isInstanceOf(Mensagem.class)
          .isNotNull();
      assertThat(mensagemArmazenada.getUsuario())
          .isEqualTo(mensagem.getUsuario());
      assertThat(mensagemArmazenada.getId())
          .isNotNull();
      assertThat(mensagemArmazenada.getConteudo())
          .isEqualTo(mensagem.getConteudo());
      verify(mensagemRepository, times(1)).save(mensagem);
    }
  }
```

Dessa forma, quando formos executar o código estará separado por blocos



## MockMVC / Controller

Para realizar o test do Controller, precisamos do **MockMVC**

### SetUp inicial

```java
import org.springframework.test.web.servlet.MockMvc;

class MensagemControllerTest {	
	// responsável por simular a controller
  private MockMvc mockMvc;

  @Mock
  private MensagemService mensagemService;

  AutoCloseable openMocks;

  @BeforeEach
  void setUp() {
    openMocks = MockitoAnnotations.openMocks(this);
    MensagemController mensagemController = new MensagemController(mensagemService);
    mockMvc = MockMvcBuilders.standaloneSetup(mensagemController).build();
  }

  @AfterEach
  void tearDown() throws Exception {
    openMocks.close();
  }
}
```



### Testando um POST

Para testar um método POST, iremos utilizar do **`mockMvc.perform(post("/yourPath"))`**!

* Para validar a mensagem usamos o **`andExpect(status().isCreated())`**

```java
@Test
void devePermitirRegistrarMensagem() throws Exception {
  var mensagemRequest = MensagemHelper.gerarMensagemRequest();
  when(mensagemService.criarMensagem(any(Mensagem.class))).thenAnswer(i -> i.getArgument(0));

  mockMvc.perform(post("/mensagens")
      .contentType(MediaType.APPLICATION_JSON)
      .content(asJsonString(mensagemRequest)))
      .andExpect(status().isCreated());

  verify(mensagemService, times(1))
      .criarMensagem(any(Mensagem.class));
}

public static String asJsonString(final Object obj) {
    try {
    return new ObjectMapper().writeValueAsString(obj);
  } catch (Exception e) {
    throw new RuntimeException(e);
  }
}
```



### GET - jsonPath

Quando rodamos um GET, podemos validar o conteúdo que foi retornado como resposta, usando **jsonPath** + **`andExpect`**

* **`mockMvc.perform(get("/yourPath"))`**!
* **`andExpect(status().isOk())`**

```java
@Test
void devePermitirBuscarMensagem() throws Exception {
  var id = UUID.fromString("259bdc02-1ab5-11ee-be56-0242ac120002");
  var mensagem = MensagemHelper.gerarMensagem();
  mensagem.setId(id);
  mensagem.setDataCriacao(LocalDateTime.now());

  when(mensagemService.buscarMensagem(any(UUID.class))).thenReturn(mensagem);

  mockMvc.perform(get("/mensagens/{id}", id)
      .contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.id").value(mensagem.getId().toString()))
      .andExpect(jsonPath("$.conteudo").value(mensagem.getConteudo()))
      .andExpect(jsonPath("$.usuario").value(mensagem.getUsuario()))
      .andExpect(jsonPath("$.dataCriacao").exists())
      .andExpect(jsonPath("$.gostei").exists());
  verify(mensagemService, times(1)).buscarMensagem(any(UUID.class));
}
```



### Exception - print / content

Se quiseremos ter mais detalhes do que o mockMvc está fazendo podemos usar:

* **`.andDo(print())`**

```java
@Test
void deveGerarExcecao_QuandoBuscarMensagem_IdNaoExistente()
    throws Exception {
  var id = UUID.fromString("259bdc02-1ab5-11ee-be56-0242ac120002");

  when(mensagemService.buscarMensagem(any(UUID.class)))
      .thenThrow(new MensagemNotFoundException("mensagem não encontrada"));

  mockMvc.perform(get("/mensagens/{id}", id)
      .contentType(MediaType.APPLICATION_JSON))
    	.andDo(print())
      .andExpect(status().isNotFound());
		  .andExpect(content().string("mensagem não encontrada"));
  verify(mensagemService, times(1))
      .buscarMensagem(any(UUID.class));
}
```



### GET - Parameters

Como testar rotas com parâmetros? 

* **`param("yourParam", "paramValue")`**

```java
@Test
void devePermitirListarMensagens() throws Exception {
  var mensagem = MensagemHelper.gerarMensagemCompleta();
  Page<Mensagem> page = new PageImpl<>(Collections.singletonList(
      mensagem));
  when(mensagemService.listarMensagens(any(Pageable.class)))
      .thenReturn(page);
  mockMvc.perform(get("/mensagens")
             .param("page", 1)
             .param("size", 10)
      .contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.content[0].id").value(mensagem.getId().toString()))
      .andExpect(jsonPath("$.content[0].conteudo").value(mensagem.getConteudo()))
      .andExpect(jsonPath("$.content[0].usuario").value(mensagem.getUsuario()))
      .andExpect(jsonPath("$.content[0].dataCriacao").exists())
      .andExpect(jsonPath("$.content[0].gostei").exists());
  verify(mensagemService, times(1))
      .listarMensagens(any(Pageable.class));
}

@Test
void devePermitirListarMensagens_QuandoReceberParametrosInvalidos()
    throws Exception {
  Page<Mensagem> page = new PageImpl<>(Collections.emptyList());
  when(mensagemService.listarMensagens(any(Pageable.class)))
      .thenReturn(page);
  mockMvc.perform(get("/mensagens?page=2&ping=pong")
      .contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.content").isArray())
      .andExpect(jsonPath("$.content", empty()))
      .andExpect(jsonPath("$.content", hasSize(0)));
  verify(mensagemService, times(1)).listarMensagens(any(Pageable.class));
}
```



## Rest-Assured - Controller Test Integrados

Para fazer os testes integrados da Controller, precisamos utilizar o ***Rest Asured***

```xml
<dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>spring-mock-mvc</artifactId>
    <version>5.3.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>json-schema-validator</artifactId>
    <version>5.3.1</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.rest-assured</groupId>
    <artifactId>rest-assured</artifactId>
    <version>5.3.0</version>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.codehaus.groovy</groupId>
            <artifactId>groovy</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.codehaus.groovy</groupId>
            <artifactId>groovy-xml</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### SetUp

As classes com RestAssured precisam seguir o padrão:

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase
@ActiveProfiles("test")
@Transactional
class MensagemControllerIT {

  @LocalServerPort
  private int port;

  @BeforeEach
  public void setup() {
    RestAssured.port = port;
  }
}
```



### Post

Rest Assured irá seguir o fluxo:

* `given`
* `when`
* `then`

```java
import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasKey;
import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.Matchers.startsWith;


@Test
void devePermitirRegistrarMensagem() {
  var mensagemRequest = MensagemHelper.gerarMensagemRequest();

  given()
      .contentType(MediaType.APPLICATION_JSON_VALUE)
      .body(mensagemRequest)
	.when()
      .post("/mensagens")
	.then()
      .statusCode(HttpStatus.CREATED.value())
      .body("$", hasKey("id"))
      .body("$", hasKey("usuario"))
      .body("$", hasKey("conteudo"))
      .body("$", hasKey("dataCriacao"))
      .body("$", hasKey("gostei"))
      .body("usuario", equalTo(mensagemRequest.getUsuario()))
      .body("conteudo", equalTo(mensagemRequest.getConteudo()));
}
```



### Schema Validator

Validar campo a campo do objeto versus o que está no banco de dados pode ser trabalhoso, para isso **rest-assured** possui o **`json-schema-validator`**

* Necessário criar um json com o schema na folder `resources/schemas`

  ```json
  {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "Mensagem Response",
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "usuario": {
        "type": "string"
      },
      "conteudo": {
        "type": "string"
      },
      "dataCriacao": {
        "type": "string"
      },
      "dataAlteracao": {
        "type": "string"
      },
      "gostei": {
        "type": "integer"
      }
    },
    "required": [
      "id",
      "usuario",
      "conteudo",
      "dataCriacao",
      "gostei"
    ]
  }
  ```

Quando for testar, irá referenciar o JSON:

```java
@Test
void devePermitirRegistrarMensagem_ValidarSchema() {
  var mensagemRequest = MensagemHelper.gerarMensagemRequest();

 	given()
      .header("Content-Type", "application/json")
      .body(mensagemRequest)
	.when()
      .post("/mensagens")
	.then()
      .statusCode(HttpStatus.CREATED.value())
      .header("Content-Type", notNullValue())
      .header("Content-Type", startsWith("application/json"))
      .body(matchesJsonSchemaInClasspath("./schemas/MensagemResponseSchema.json"));
}
```



## Maven Profiles

Para executar os testes via CLI, temos:

```bash
mvn test
```


Mas se quiseremos executar os testes integrados separados aos testes unitários, podemos configurar o `pom.xml`:

```xml
<profiles>
    <profile>
        <id>integration-test</id>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <version>3.1.2</version>
                    <configuration>
                        <includes combine.self="override">
                            <include>**/*IT.java</include>
                        </includes>
                        <excludes combine.self="override">
                            <exclude>**/*Test.java</exclude>
                        </excludes>
                    </configuration>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>
```

Dessa forma podemos executar:

```bash
mvn test -P integration-test
```



## Allure Report

O Allure Report gera reports de cada classe de Test criada

<img src="/Users/igorgomesromerovilela/Development/NotesInGeneral/Java/graduate/imageResource/allurerport.png" alt="allurerport" style="zoom:50%;" />

### SetUp

1. Adicionar dependências

   ```xml
    <dependency>
         <groupId>io.qameta.allure</groupId>
         <artifactId>allure-junit5</artifactId>
         <version>2.23.0</version>
         <scope>test</scope>
     </dependency>
     <dependency>
         <groupId>io.qameta.allure</groupId>
         <artifactId>allure-rest-assured</artifactId>
         <version>2.23.0</version>
     </dependency>
   ```

2. Alterar o `plugin` do `maven-surefire-plugin`, adicionando `properties` + `systemPropertyVariables`

   ```xml
   <plugin>
       <groupId>org.apache.maven.plugins</groupId>
       <artifactId>maven-surefire-plugin</artifactId>
       <version>3.1.2</version>
       <configuration>
           <excludes>
               <exclude>**/bdd/**</exclude>
           </excludes>
           <properties>
               <configurationParameters>
                   junit.jupiter.displayname.generator.default.remove-parent=true
               </configurationParameters>
           </properties>
           <systemPropertyVariables>
               <junit.jupiter.extensions.autodetection.enabled>true</junit.jupiter.extensions.autodetection.enabled>
               <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>
           </systemPropertyVariables>
       </configuration>
       <dependencies>
           <dependency>
               <groupId>org.aspectj</groupId>
               <artifactId>aspectjweaver</artifactId>
               <version>${aspectj.version}</version>
           </dependency>
       </dependencies>
   </plugin>
   ```

3. Criar o `allure.properties` dentro de `resources`:

   ```properties
   allure.results.directory=target/allure-results
   ```

4. Ao rodar `mvn test` irá ser gerado uma folder dentro de targets, chamada `allure-results` - para exibir o relatório precisaremos instalar globalmante o `allure`

   ```sh
   npm install -g allure
   ```

5. Executar o `allure serve`

   ```sh
   allure serve target/allure-results
   ```

6. Dentro de cada classe de integração, precisaremos por no `setup` do `@BeforeEach` o `RestAssured.enableLogging`:

   ```java
   @BeforeEach
   public void setup() {
     RestAssured.port = port;
     RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
   }
   ```

7. Colocar um filter para cada método que queira detalhes do `Allure Report`:

   ```java
   @Test
   void devePermitirRegistrarMensagem() {
     var mensagemRequest = MensagemHelper.gerarMensagemRequest();
   
     given()
       	// filter para exibir no Allure Report
         .filter(new AllureRestAssured())
         .contentType(MediaType.APPLICATION_JSON_VALUE)
         .body(mensagemRequest)
     .when()
         .post("/mensagens")
     .then()
         .statusCode(HttpStatus.CREATED.value())
         .body("$", hasKey("id"))
         .body("$", hasKey("usuario"))
         .body("$", hasKey("conteudo"))
         .body("$", hasKey("dataCriacao"))
         .body("$", hasKey("gostei"))
         .body("usuario", equalTo(mensagemRequest.getUsuario()))
         .body("conteudo", equalTo(mensagemRequest.getConteudo()));
   }
   ```

   

## Gatling - Test Performance

Com o **`Gatling`** conseguimos simular diferentes usuários realizando ações dentro de nossa aplicação, e também especificar qual ação o usuário estárá fazendo por X tempo.

### Dependências

```xml
<dependency>
    <groupId>io.gatling</groupId>
    <artifactId>gatling-app</artifactId>
    <version>3.9.5</version>
</dependency>
<dependency>
    <groupId>io.gatling.highcharts</groupId>
    <artifactId>gatling-charts-highcharts</artifactId>
    <version>3.9.5</version>
    <scope>test</scope>
</dependency>
```

### Maven Profile

Para facilitar e diferenciar os testes, criaremos um profile para testes de performance

```xml
<profile>
    <id>performance-test</id>
    <build>
        <plugins>
            <plugin>
                <groupId>io.gatling</groupId>
                <artifactId>gatling-maven-plugin</artifactId>
                <version>4.3.7</version>
                <configuration>
                  	<!-- Package que estará os testes -->
                    <simulationClass>org.example.performance.ApiPerformanceSimulation</simulationClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</profile>
```



### Simulation

Para simular chamadas, iremos criar uma classe de test que irá **extender `Simulation`**:

```java
public class ApiPerformanceSimulation extends Simulation {

    private final HttpProtocolBuilder httpProtocol = http
            .baseUrl("http://localhost:8080")
            .header("Content-Type", "application/json");
}
```

A partir do `HttpProtocolBuilder` iremos criar **cada ação** que o usuário irá performar:

```java
private final HttpProtocolBuilder httpProtocol = http
        .baseUrl("http://localhost:8080")
        .header("Content-Type", "application/json");

ActionBuilder adicinarMensagemRequest = http("adicionar mensagem")
        .post("/mensagens")
        .body(StringBody("{ \"usuario\": \"user\", \"conteudo\": \"demo\" }"))
        .check(status().is(201))
        .check(jsonPath("$.id").saveAs("mensagemId"));

ActionBuilder buscarMensagemRequest = http("buscar mensagem")
        .get("/mensagens/#{mensagemId}")
        .check(status().is(200));

ActionBuilder listarMensagemRequest = http("listar mensagens")
        .get("/mensagens")
        .queryParam("page", "0")
        .queryParam("size", "10")
        .check(status().is(200));
```

Criar o `scenarios` para cada `action`:

```java
ScenarioBuilder cenarioAdicionarMensagem = scenario("Adicionar mensagem")
        .exec(adicinarMensagemRequest);

ScenarioBuilder cenarioAdicionarBuscarMensagem = scenario("Adicionar e Buscar mensagem")
        .exec(adicinarMensagemRequest)
        .exec(buscarMensagemRequest);

ScenarioBuilder cenarioListarMensagem = scenario("Listar mensagens")
        .exec(listarMensagemRequest);
```



Criar um **setUp de usuário** para cada **scenario**:

```java
{
  setUp(
    cenarioAdicionarMensagem.injectOpen(
          rampUsersPerSec(1)
                  .to(10)
                  .during(Duration.ofSeconds(10)),
          constantUsersPerSec(10)
                  .during(Duration.ofSeconds(60)),
          rampUsersPerSec(10)
                  .to(1)
                  .during(Duration.ofSeconds(10))),
		cenarioAdicionarBuscarMensagem.injectOpen(
          rampUsersPerSec(1)
                  .to(30)
                  .during(Duration.ofSeconds(10)),
          constantUsersPerSec(30)
                  .during(Duration.ofSeconds(60)),
          rampUsersPerSec(30)
                  .to(1)
                  .during(Duration.ofSeconds(10))),
    cenarioListarMensagem.injectOpen(
          rampUsersPerSec(1)
                  .to(100)
                  .during(Duration.ofSeconds(10)),
          constantUsersPerSec(100)
                  .during(Duration.ofSeconds(60)),
          rampUsersPerSec(100)
                  .to(1)
                  .during(Duration.ofSeconds(10))))
    )
    .protocols(httpProtocol)
                .assertions(
                        global().responseTime().max().lt(50),
                        global().failedRequests().count().is(0L)
  								);
}
```



Para executar o teste de performance, **precisamos da aplicação rodando!** e então iremos rodar com o **`gatling`**

```shell
mvn gatling:test -P performance-test
```

Para visualizar o report do gatling, vamos em:

```
open target/gatling/performancessimulation-xxxxx/index.html
```

