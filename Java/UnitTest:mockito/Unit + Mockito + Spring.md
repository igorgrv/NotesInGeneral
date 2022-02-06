# Unit + Mockito + Spring

## Dependencies

Para utilizar **JUnit + Mockito**, basta utilizar a dependencia do Spring (versão 2.6.3 do spring-parent irá permitir o uso do Mockito 4):

```xml
<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
  		<version>2.6.3</version>
			<scope>test</scope>
</dependency>
```

Automáticamente as dependencias do Mockito, Hamcrest, Junit são importadas!

## JUNIT 4 & 5

| Description                                                  | JUnit 4                                                      | JUnit 5                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Test Annotation Changes                                      | `@Before` `@After` `@BeforeClass` `@AfterClass` `@Ignore`    | `@BeforeEach` `@AfterEach` `@BeforeAll` `@AfterAll` `@Disabled` |
| Use `@ExtendWith` instead of `@RunWith`                      | `@RunWith(SpringJUnit4ClassRunner.class)` `@RunWith(MockitoJUnitRunner.class)` | `@ExtendWith(SpringExtension.class)` `@ExtendWith(MockitoExtension.class)` |
| Package changes to `org.junit.jupiter`                       | `org.junit.Test;` `org.junit.Assert.*;`                      | `org.junit.jupiter.api.Test;` `org.junit.jupiter.api.Assertions.*;` |
| `@RunWith` is NOT needed with `@SpringBootTest`, `@WebMvcTest`, `@DataJpaTest` | `@RunWith(SpringRunner.class)` `@SpringBootTest(classes = DemoApplication.class)` | `@SpringBootTest(classes = DemoApplication.class)`           |

## Simples Unit Test

Testes seguem a estrutura do código original e o nome do arquivo java, por padrão irá ser `nomeFile+Test`

Exemplo estrutura:

```
-- src
---- main
------ igor
-------- controller
---------- MyClass.java
---- test
------ igor
-------- controller
---------- MyClassTest.java
```

Class de negócio:

```java
package com.igor.controller;

public class MyClass {

  public int sumValues (int [] values) {
    int sum = 0;
    for (int value : values) {
      sum += value;
    }
    return sum;
  }
}
```

Classe de teste:

```java
package com.igor.controller;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class MyClassTest {

  private MyClass business;

  @Before
  public void before() {
    business = new MyClass();
  }

  @Test
  public void sumValues_basics() {
    int actualValue = business.sumValues(new int [] { 1, 2, 3 });
    assertEquals(6, actualValue);
  }

  @Test
  public void sumValues_empty() {
    int actualValue = business.sumValues(new int [] {});
    assertEquals(0, actualValue);
  }

}
```



## Simple Unit Test + With Service Class

Quando uma classe utiliza a lógica de outra classe (geralmente da classe Service), o processo de se fazer o teste também precisa ser alterado, exemplo:

Nosso service:

```java
public interface MyClassService {

  int[] retrieveValues();
}
```

Classe que implementa o Service (sem autowired, utilizamos de `set`)

```java
public class MyClass {

  private MyClassService myClassService;

  public void setMyClassService(MyClassService myClassService) {
    this.myClassService = myClassService;
  }
  
  public int sumValuesFromService() {
    int sum = 0;
    
    // chama o service com os values
    int[] values = myClassService.retrieveValues();
    for (int value : values) {
      sum += value;
    }
    return sum;
  }
}
```



### Using Stubs (bad idea)

Na classe de teste precisaremos instanciar a classe Service para **cada tipo de teste**, caso contrário irá retornar NPE (NullPointerException).



Para retornar 6:

```java
class MyClassServiceReturnSix implements MyClassService {
  @Override
  public int[] retrieveValues() {
    return new int[] { 1, 2, 3 };
  }
}

public class MyClassTest {
  
  @Test
  public void sumValuesWithService() {
    MyClass business = new MyClass();
    business.setMyClassService(new MyClassServiceReturnSix());
    int actualValues = business.sumValuesFromService();
    assertEquals(6, actualValues);
  }
}
```

Para retornar empty:

```java
class MyClassServiceReturnEmpty implements MyClassService {
  @Override
  public int[] retrieveValues() {
    return new int[] {};
  }
}

public class MyClassTest {
  
  @Test
  public void sumValuesWithService() {
    MyClass business = new MyClass();
    business.setMyClassService(new MyClassServiceReturnEmpty());
    int actualValues = business.sumValuesFromService();
    assertEquals(6, actualValues);
  }
}
```



O que será um **PROBLEMA**, pq imagine se a interface implementar outros e outros métodos, o teste irá quebrar!

# Mockito

O Mock/Mockito veio para ajudar principalmente os casos onde é necessário fazer a injeção de alguma classe (como no exemplo anterior com os Services).

```java
// Os imports serão em geral do pacote:
import static org.mockito.Mockito.mock;
```

## mock

O comando `mock` é o utilizado para *mocar* a classe, funciona como um `autowired`.

```java
MyClassService serviceMocked = mock(MyClassService.class);
```

* A class que é mocada não recebe os **comportamentos** , ou seja, se mocarmos um `List` , adicoinar um elemento ao List, e chamar `list.size()` não será retornado 1, a não seja que seja explicitamente informado a classe mocada, com o uso do `when` (comando abaixo)

  * ```java
    @Test
      public void testingListMock() {
        List<String> listMocked = mock(List.class);
        listMocked.add("test1");
        assertEquals(1, listMocked.size()); // IRÁ FALHAR, retornará 0
      }
    ```

## when

O Comando `when` funcionará para especificar o que fazer quando o método de dentro da classe mockada for chamado

```java
MyClassService serviceMocked = mock(MyClassService.class);
when(serviceMocked.retrieveValues()).thenReturn(new int[] { 1, 2, 3 });
```



### Tests with Mockito

1. Valide que retornará a soma corretamente
2. Retornará 0 em caso de vazio

```java
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.Before;
import org.junit.Test;

public class MyClassTest {
  
  MyClass business = new MyClass;
  MyClassService service = mock(MyClassService.class)
    
  @Test
  public void sumValuesWithService() {
    when(serviceMocked.retrieveValues()).thenReturn(new int[] { 1, 2, 3 });
    assertEquals(6, business.sumValuesFromService());
  }

  @Test
  public void sumValuesReturnempty() {
    when(serviceMocked.retrieveValues()).thenReturn(new int[] { });
    assertEquals(0, business.sumValuesFromService());
  }
}
```



## @InjectMocks + @RunWith

`@RunWith` + `@injectMocks`  irá instanciar o objeto que estiver sido anotada (como um autowired)

```java
import org.mockito.InjectMocks;

@RunWith(MockitoJUnitRunner.class)
public class MyClassTestMock {
  
  // MyClass business = new MyClass();
  @InjectMocks
  MyClass business;
  
}
```

* @ExtendWith(MockitoExtension.class) é utilizado para JUnit 5

## @Mock

Bem parecido com o @InjectMocks, porém dedicado a classe Service que será injetado

```java
import org.mockito.Mock;
// MyClassService serviceMocked = mock(MyClassService.class);

@Mock
MyClassService serviceMocked;
```

* Segue o mesmo comportamento do comando `mock` - não carrega o **comportamento** da classe

### Spy

Diferente do Mock, o `Spy` sim, carrega os comportamentos da classe! Para declarar uma classe com Spy, basta adicionar o comando antes da classe!

```java
@Test
  public void testingSpy() {
    List<String> listSpy = spy(List.class);
    listSpy.add("test1");
    assertEquals(1, listSpy.size()); // RETURNS 1!
  }
```



## Returning Multiple values

Em algumas situações queremos validar múltiplas ações de um mesmo método e isso é possível também!

```java
@Mock
List<String> listMocked;

@Test
public void returnMultipleSizes() {
  // Quando chamarem size(), retorne 5 e dps 10
  when(listMocked.size())
    	.thenReturn(5)
    	.thenReturn(10)
  assetEquals(5, listMocked.size());
  assetEquals(10, listMocked.size());
}

@Test
public void returnMultipleValuesString() {
  when(listMocked.get(0)).thenReturn("testIgor");
  assertEquals("testIgor", listMocked.get(0));
  assertEquals(null, listMocked.get(1));
}
```



## Arguments Matcher

Em algumas situações iremos querer garantir que não importe a quantidade de vezes, queremos sempre retornar um valor, para isso o Mockito oferece alguns ***Arguments Matcher***:

* anyInt()
* anyBoolean()
* anyString()

```java
@Test
public void testArgumentsMatcher() {
  when(listMocked.get(anyInt())).thenReturn("Igor");
  assertEquals("Igor", listMocked.get(0));
  assertEquals("Igor", listMocked.get(1));
}  
```



## Verify

Verify é um método utilizado para checar se determinado método foi chamado e quantas vezes foi chamado:

* **funciona para classes mockadas!**

```java
@Test
public void testingVerify() {
  listMocked.get(0);
  listMocked.get(1);

  verify(listMocked).get(0); // Check if get 0 was called
  verify(listMocked).get(1); // Check if get 1 was called
  verify(listMocked).get(2); // It will fail
}
```

É possível especificar quantas vezes esperamos que determinado método seja chamado, com:

* atLeast(int);
* atLeastOnce();
* atMost(int);
* never();

```java
@Test
public void testingVerify() {
  listMocked.get(0);
  listMocked.get(1);

  verify(listMocked).get(0); // Check if get 0 was called
  verify(listMocked).get(1); // Check if get 1 was called
  verify(listMocked, atLeastOnce()).get(anyInt()); // ao menos uma vez o get é chamado
  verify(listMocked, atMost(2)).get(anyInt()); // No máximo 2
  verify(listMocked, never()).get(2); // get 2 nunca é chamado
}
```

## Argument Capture

ArgumentCapture é uma classe do package Mockito que nos permite capturar o valor e fazer tudo desse valor capturado, através dos métodos:

* capture();
* getValue();
* getAllValues();

```java
@Test
public void testingArgumentCapture() {
  listMocked.add("test1");
  ArgumentCaptor<String> captor = ArgumentCaptor.forClass(String.class);

  verify(listMocked).add(captor.capture());
  assertEquals("test1", captor.getValue());
}
```

Bem utilizável para verificar valores de uma lista:

```java
@Test
public void testingArgumentCaptureList() {
  listMocked.add("test1");
  listMocked.add("test2");
  ArgumentCaptor<String> captor = ArgumentCaptor.forClass(String.class);

  verify(listMocked, times(2)).add(captor.capture());

  assertEquals("test1", captor.getAllValues().get(0));
  assertEquals("test2", captor.getAllValues().get(1));
}
```



# Spring



## Controller

### WebMvcTest & MockMvc

Quando precisamos fazer test de um Controller, fazemos uso do `WebMvcTest` que irá esperar:

* Nome da classe Controller que será feito o test;

E também precisamos utilizar o método utilizado com `RunWith`

Dado controller:

```java
@RestController
public class MyController {
  
  @GetMapping(value = "/helloworld")
  public String helloWorld() {
    return "helloWorld";
  }
}
```

Test controller:

```java
@RunWith(SpringRunner.class) //if Using JUNIT 5 there is not need to use RunWith
@WebMvcTest(MyController.class)
public class MyControllerTest {}
```

Para realizar chamadas REST em uma camada de Test, fazemos uso do **`MockMvc`** ! que irá esperar:

* RequestBuilder = MockMvcRequestBuilders
  * Verbo HTTP (GET, POST) -> URI
  * MediaType.Application_JSON

```java
@WebMvcTest(HelloWorldController.class)
public class HelloWorldControllerTest {
  
  @Autowired
  private MockMvc mockMvc;

  @Test
  public void returnHelloWorld() throws Exception {
    RequestBuilder requestBuilder = MockMvcRequestBuilders
      		.get("/")
      		.accept(MediaType.APPLICATION_JSON);
    
    ResultActions response = mockMvc.perform(requestBuilder);
 
    String responseString = response.andReturn().getResponse().getContentAsString();
    assertEquals("HelloWorld", responseString);
  }
}
```

#### MockMvcResultMatchers

Com o uso dos métodos státicos do `MockMvcResultMatcher`:

```java
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
```

Temos acesso ao:

* `status() -> verificar status HTTP`
  * `status().isOk() -> check if it's 200` 
* `content() -> verifica o conteúdo`
  * `content().string("test")`
  * `content().json("{ \"name:\":\"test\" }")`

```java
@Test
public void testingMockMvcResultMatchers() {
  RequestBuilder requestBuilder = MockMvcRequestBuilders
    						.get("/")
    						.accept(MediaType.APPLICATION_JSON);
	mockMvc.perform(requestBuilder)
    	.andExpect(status().isOk())
    	.andExpect(content().string("HelloWorld"))
    	.andReturn();
}

@Test
public void returnDummyItem() throws Exception {
  RequestBuilder requestBuilder = MockMvcRequestBuilders
    							.get("dummy-item")
    							.accept(MediaType.APPLICATION_JSON);
 
  mockMvc.perform(requestBuilder)
    .andExpect(status().isOk())
    .andExpect(content().json("{\"quantity\":100,\"price\":10,\"name\":\"Ball\",\"id\":1}"))
    .andReturn();
}
```



## Service

### MockBean

Dado o controller & service:

```java
@RestController
public class HelloWorldController {

  @Autowired
  private HelloWorldService helloWorldService;

  @GetMapping("/dummy-item-service")
  public Item dummyItemService() {
    return helloWorldService.retrieveItem();
  }
}


@Component
public class HelloWorldService {

  public Item retrieveItem() {
    return new Item(1, "Ball", 10, 100);
  } 
}
```

Do mesmo modo que fazemos o `@Autowired` faremos o `@MockBean` no Service

```java
@WebMvcTest(HelloWorldController.class)
public class HelloWorldControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private HelloWorldService helloWorldService;
  
}
```

Só fazer o `@MockBean` não irá fazer o Mockito entender o que fazer quando o método `retrieveItem` for chamado, para isso usamos o `when`

```java
@WebMvcTest(HelloWorldController.class)
public class HelloWorldControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private HelloWorldService helloWorldService;
  
  @Test
  public void returnItemWithService() {
    when(helloWorldService.retrieveItem()).thenReturn(new Item(1, "Ball", 10, 100));
    
		RequestBuilder requestBuilder = MockMvcRequestBuilders
      							.get("/dummy-item-service")
      							.accept(MediaType.APPLICATION_JSON);

    mockMvc.perform(requestBuilder)
      .andExpect(status().isOk())
      .andExpect(content().json("{quantity:100,price:10,name:Ball,id:1}"))
      .andReturn();
  }
  
}
```

