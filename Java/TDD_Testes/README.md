# JUnit & TDD
Testar é chato. Testar não avança o projeto. Vale a pena ficar testando tudo? Essa é uma das perguntas e afirmações mais feitas entre desenvolvedores, porém **infelizmente** muito bugs não surgem na hora de desenvolvimento, vão surgir no futuro…<br><br>

Será que o método que foi criado agora não afeta outro método? Com um **teste automatizado**, podemos ter mais segurança de que nosso sistema esteja funcionando corretamente!<br>

# JUnit - Teste unitário

A criação de testes pelo Java, se dá através de uma bibleoteca chamada **JUnit**.

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>

#Spring Boot
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.junit.vintage</groupId>
            <artifactId>junit-vintage-engine</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.hamcrest</groupId>
    <artifactId>hamcrest-all</artifactId>
    <version>1.3</version>
</dependency>
```

## Vantagens

* Permite a criação rápida de código de teste enquanto possibilita um aumento na qualidade do sistema sendo desenvolvido e testado;
* Não é necessário escrever o próprio framework;
* Amplamente utilizado pelos desenvolvedores da comunidade código-aberto, possuindo um grande número de exemplos;
* Uma vez escritos, os testes são executados rapidamente sem que, para isso, seja interrompido o processo de desenvolvimento;
* JUnit checa os resultados dos testes e fornece uma resposta imediata;
* Pode-se criar uma hierarquia de testes que permitirá testar apenas uma parte do sistema ou todo ele;
* Escrever testes com JUnit permite que o programador perca menos tempo depurando seu código;
* JUnit é LIVRE.



## Getting Started
  O intuito dos teste unitarios, sao testar os metodos de validacao do projeto!

1. comecar replicando o pacote que possui validacoes - _por padrao se o metodo chama "Gerenciador", no JUnit chamara "GerenciadorTest"_;

2. Mapear os possíveis testes:

   * Nao podemos ter uma sessao no mesmo horario de comeco da outra;
   * Nao podemos criar uma sessao que gere conflito com horario da proxima sessao;
   * Podemos adicionar caso nao tenha nenhuma sessao (List = null);

3. Para criar cenarios de teste, devemos colocar a anotacao `@Test` nos metodos:

   ```java
   @Test
   public void deveAdicionarSeListaDaSessaoEstiverVazia(){
       
   }
   ```

4. Com a anotacao `@Before`, podemos deixar as informacoes padroes de teste para o JUnit,
     desta forma podemos testar chamando somente anotacoes:

   ```java
   public class GerenciadorDeSessaoTest {
         private Filme rogueOne;
         private Sala sala3D;
         private Sessao sessaoDasDez;
         private Sessao sessaoDasTreze;
         private Sessao sessaoDasDezoito;
         
         @Before
         public void preparaSessao() {
           this.rogueOne = new Filme("Rogue One", Duration.ofMinutes(120), "Acao");
           this.sala3D = new Sala("sala 3D");
           
           this.sessaoDasDez = new Sessao(LocalTime.parse("10:00:00"), rogueOne, sala3D);
           this.sessaoDasTreze = new Sessao(LocalTime.parse("13:00:00"), rogueOne, sala3D);
           this.sessaoDasDezoito = new Sessao(LocalTime.parse("18:00:00"), rogueOne, sala3D);
         }
   }
   ```

5. Para verificar se ira "poder" ou "nao poder", utilizamos a classe `Assert`

   ```java
   @Test
   public void deveAdicionarSeListaDaSessaoEstiverVazia(){
     boolean cabe = gerenciador.cabe(sessao);
     //Espereamos que retorn true neste caso
     Assert.assertTrue(cabe);
   }
   ```

   

### 2º Exemplo

Vamos imaginar que queremos testar um leilão, onde a classe:

* `Lance` -> recebe quem fez o lance e também o valor do lance;
* `Usuario` -> representa o interessado no leilão;
* `Leilao` -> possui a quantidade de `Lances` e estabelece o item a ser leiloado;
* `Avaliador` -> verificar o maior `Lance` dado no `Leilao`

```java
public class Lance {

	private Usuario usuario;
	private double valor;
	
	public Lance(Usuario usuario, double valor) {
		this.usuario = usuario;
		this.valor = valor;
	}

	//Getters
}

public class Usuario {

	private int id;
	private String nome;
	
	public Usuario(String nome) {
		this(0, nome);
	}

	public Usuario(int id, String nome) {
		this.id = id;
		this.nome = nome;
	}
    
    //Getters
}


public class Leilao {

	private String descricao;
	private List<Lance> lances;
	
	public Leilao(String descricao) {
		this.descricao = descricao;
		this.lances = new ArrayList<Lance>();
	}
	
	public void propoe(Lance lance) {
		lances.add(lance);
	}
    
    //Getters
}


class Avaliador {

    private double maiorDeTodos = Double.NEGATIVE_INFINITY;
    private double menorDeTodos = Double.POSITIVE_INFINITY;

    public void avalia(Leilao leilao) {
        for(Lance lance : leilao.getLances()) {
            if(lance.getValor() > maiorDeTodos) maiorDeTodos = lance.getValor();
        }
    }

    public double getMaiorLance() {
        return maiorDeTodos;
    }

}
```

Se fossemos testar (**_sem o Junit_**), poderiamos testar através de um método `main`:

```java
class TesteDoAvaliador {

    public static void main(String[] args) {
        Usuario joao = new Usuario("João");
        Usuario jose = new Usuario("José");
        Usuario maria = new Usuario("Maria");

        Leilao leilao = new Leilao("Playstation 3 Novo");

        leilao.propoe(new Lance(joao, 300.0));
        leilao.propoe(new Lance(jose, 400.0));
        leilao.propoe(new Lance(maria, 250.0));

        Avaliador leiloeiro = new Avaliador();
        leiloeiro.avalia(leilao);

        System.out.println(leiloeiro.getMaiorLance()); // imprime 400.0
    }
}
```

Então, poderiamos checar o `menorLance`:

```java
class Avaliador {
    public void avalia(Leilao leilao) {
        for(Lance lance : leilao.getLances()) {
            if(lance.getValor() > maiorDeTodos) maiorDeTodos = lance.getValor();
            else if(lance.getValor() < menorDeTodos) menorDeTodos = lance.getValor();
        }
    }
    
    public double getMenorLance() {
        return menorDeTodos;
    }
}


class TesteDoAvaliador {

    public static void main(String[] args) {
        Usuario joao = new Usuario("João");
        Usuario jose = new Usuario("José");
        Usuario maria = new Usuario("Maria");

        Leilao leilao = new Leilao("Playstation 3 Novo");

        leilao.propoe(new Lance(joao, 300.0));
        leilao.propoe(new Lance(jose, 400.0));
        leilao.propoe(new Lance(maria, 250.0));

        Avaliador leiloeiro = new Avaliador();
        leiloeiro.avalia(leilao);

        System.out.println(leiloeiro.getMaiorLance()); // imprime 400.0
        System.out.println(leiloeiro.getMenorLance()); // imprime 250.0
    }
}
```

Até então, tudo está funcionando/imprimindo… mas e se invertessemos a ordem do lance?

```java
leilao.propoe(new Lance(joao, 250.0));
leilao.propoe(new Lance(jose, 300.0));
leilao.propoe(new Lance(maria, 400.0));

System.out.println(leiloeiro.getMenorLance()); // INFINITY
```

Isto acontece por causa do `else if`  qe foi feito na classe `Avaliador`, mas será que descobririamos sem um teste? O melhor jeito é deixar automático, de forma que toda alteração seja validada pelo teste;

```java
public class AvaliadorTest {

    @Test
    public void deveEntenderLancesEmOrdemCrescente() {
        // cenario: 3 lances em ordem crescente
        Usuario joao = new Usuario("Joao");
        Usuario jose = new Usuario("José");
        Usuario maria = new Usuario("Maria");

        Leilao leilao = new Leilao("Playstation 3 Novo");

        leilao.propoe(new Lance(maria,250.0));
        leilao.propoe(new Lance(joao,300.0));
        leilao.propoe(new Lance(jose,400.0));

        // executando a acao
        Avaliador leiloeiro = new Avaliador();
        leiloeiro.avalia(leilao);

        // comparando a saida com o esperado
        double maiorEsperado = 400;
        double menorEsperado = 250;

        Assert.assertEquals(maiorEsperado, leiloeiro.getMaiorLance(), 0.0001);
        Assert.assertEquals(menorEsperado, leiloeiro.getMenorLance(), 0.0001);
    }
}
```

Conforme a aplicação vai crescendo, o teste deve crescer junto:

* Implemente a média dos lances dados:

  ```java
  class Avaliador {
  
      private double maiorDeTodos = Double.NEGATIVE_INFINITY;
      private double menorDeTodos = Double.POSITIVE_INFINITY;
      private double media = 0;    
  
      public void avalia(Leilao leilao) {
  
  
          double total = 0;
          for(Lance lance : leilao.getLances()) {
              if(lance.getValor() > maiorDeTodos) maiorDeTodos = lance.getValor();
              if(lance.getValor() < menorDeTodos) menorDeTodos = lance.getValor();
              total += lance.getValor();
          }
          if(total == 0) {
              media = 0;
              return;
          }
          media = total / leilao.getLances().size();
      }
  
      public double getMaiorLance() { return maiorDeTodos; }
      public double getMenorLance() { return menorDeTodos; }
      public double getMedia() { return media; }
  }
  
  class AvaliadorTest {
  
      @Test
      public void deveCalcularAMedia() {
          // cenario: 3 lances em ordem crescente
          Usuario joao = new Usuario("Joao");
          Usuario jose = new Usuario("José");
          Usuario maria = new Usuario("Maria");
  
          Leilao leilao = new Leilao("Playstation 3 Novo");
  
          leilao.propoe(new Lance(maria,300.0));
          leilao.propoe(new Lance(joao,400.0));
          leilao.propoe(new Lance(jose,500.0));
  
          // executando a acao
          Avaliador leiloeiro = new Avaliador();
          leiloeiro.avalia(leilao);
  
          // comparando a saida com o esperado
          Assert.assertEquals(400, leiloeiro.getMedia(), 0.0001);
      }
  
      @Test
      public void testaMediaDeZeroLance(){
  
          // cenario
          Usuario ewertom = new Usuario("Ewertom");
  
          // acao
          Leilao leilao = new Leilao("Iphone 7");
  
          Avaliador avaliador = new Avaliador();
          avaliador.avalia(leilao);
  
          //validacao
          assertEquals(0, avaliador.getMedia(), 0.0001);
  
      }
  }
  ```

* Retorne os 3 maiores lances:

  ```java
  public class Avaliador {
  
      private double maiorDeTodos = Double.NEGATIVE_INFINITY;
      private double menorDeTodos = Double.POSITIVE_INFINITY;
      private List<Lance> maiores = new ArrayList<Lance>(leilao.getLances());
  
      public void avalia(Leilao leilao) {
          for(Lance lance : leilao.getLances()) {
              if(lance.getValor() > maiorDeTodos) maiorDeTodos = lance.getValor();
              if (lance.getValor() < menorDeTodos) menorDeTodos = lance.getValor();
          }
  
          Collections.sort(maiores, (o1, o2) -> {
  		    if(o1.getValor() < o2.getValor()) return 1;
  		    if(o1.getValor() > o2.getValor()) return -1;
  		    return 0;
  		});
          maiores = maiores.subList(0, maiores.size()> 3 ? 3 : maiores.size());
      }
  
      public List<Lance> getTresMaiores() {
          return this.maiores;
      }
  
      public double getMaiorLance() {
          return maiorDeTodos;
      }
  
      public double getMenorLance() {
          return menorDeTodos;
      }
  }
  
  public class AvaliadorTest {
  
      @Test
      public void deveEncontrarOsTresMaioresLances() {
          Usuario joao = new Usuario("João");
          Usuario maria = new Usuario("Maria");
          Leilao leilao = new Leilao("Playstation 3 Novo");
  
          leilao.propoe(new Lance(joao, 100.0));
          leilao.propoe(new Lance(maria, 200.0));
          leilao.propoe(new Lance(joao, 300.0));
          leilao.propoe(new Lance(maria, 400.0));
  
          Avaliador leiloeiro = new Avaliador();
          leiloeiro.avalia(leilao);
  
          List<Lance> maiores = leiloeiro.getTresMaiores();
  
          assertEquals(3, maiores.size());
          assertEquals(400, maiores.get(0).getValor(), 0.00001);
          assertEquals(300, maiores.get(1).getValor(), 0.00001);
          assertEquals(200, maiores.get(2).getValor(), 0.00001);
      }
  
      @Test
      public void deveDevolverTodosLancesCasoNaoHajaNoMinimo3() {
          Usuario joao = new Usuario("João");
          Usuario maria = new Usuario("Maria");
          Leilao leilao = new Leilao("Playstation 3 Novo");
  
          leilao.propoe(new Lance(joao, 100.0));
          leilao.propoe(new Lance(maria, 200.0));
  
          Avaliador leiloeiro = new Avaliador();
          leiloeiro.avalia(leilao);
  
          List<Lance> maiores = leiloeiro.getTresMaiores();
  
          assertEquals(2, maiores.size());
          assertEquals(200, maiores.get(0).getValor(), 0.00001);
          assertEquals(100, maiores.get(1).getValor(), 0.00001);
      }
  
      @Test
      public void deveDevolverListaVaziaCasoNaoHajaLances() {
          Leilao leilao = new Leilao("Playstation 3 Novo");
  
          Avaliador leiloeiro = new Avaliador();
          leiloeiro.avalia(leilao);
  
          List<Lance> maiores = leiloeiro.getTresMaiores();
  
          assertEquals(0, maiores.size());
      }
  
  }
  ```

  

## Testando com exceções

Vamos imaginar o cenário acima, onde temos um leilão sem nenhum lance dado, como testariamos? como ficaria a classe `Assert`?

```java
public class Avaliador {

    private double maiorDeTodos = Double.NEGATIVE_INFINITY;
    private double menorDeTodos = Double.POSITIVE_INFINITY;
    private List<Lance> maiores;

    public void avalia(Leilao leilao) {
        // lançando a exceção
        if(leilao.getLances().size() == 0) {
            throw new RuntimeException("Não é possível avaliar um leilão sem lances!");
        }

        for(Lance lance : leilao.getLances()) {
            if(lance.getValor() > maiorDeTodos) maiorDeTodos = lance.getValor();
            if (lance.getValor() < menorDeTodos) menorDeTodos = lance.getValor();
        }

        tresMaiores(leilao);
    }

    // código continua aqui...
}
```

Os testes permitem receber uma exceção na chamada do `@Test`

```java
@Test(expected=RuntimeException.class)
public void naoDeveAvaliarLeiloesSemNenhumLanceDado() {
    Leilao leilao = new CriadorDeLeilao()
        .para("Playstation 3 Novo")
        .constroi();

    leiloeiro.avalia(leilao);
}
```

E se o lance for igual ou menor que zero?

```java
public class Lance {

    private Usuario usuario;
    private double valor;

    public Lance(Usuario usuario, double valor) {
        if(valor<=0) throw new IllegalArgumentException();
        this.usuario = usuario;
        this.valor = valor;
    }
    // ...
}

public class LanceTest {

    @Test(expected=IllegalArgumentException.class)
    public void deveRecusarLancesComValorDeZero() {
        new Lance(new Usuario("John Doe"), 0);
    }

    @Test(expected=IllegalArgumentException.class)
    public void deveRecusarLancesComValorNegativo() {
        new Lance(new Usuario("John Doe"), -10);
    }
}
```

## Melhorando os testes com @Before e Builder

Quando vamos realizar os testes, geralmente acabamos repetindo uma série de códigos que fazem parte do cenário.. Para resolver isto, o Junit possui a anotação `@Before` que permite a criação de um cenário toda vez que um `@Test` for criado!

```java
public class AvaliadorTest {

    private Avaliador leiloeiro;
    private Usuario joao;
    private Usuario jose;
    private Usuario maria;

    @Before
    public void setUp() {
        this.leiloeiro = new Avaliador();
        this.joao = new Usuario("João");
        this.jose = new Usuario("José");
        this.maria = new Usuario("Maria");
    }
    
 	//TESTES OMITIDOS
    
}
```

Outra mudança que pode ser feita, é a utilização do Design Pattern **Builder**, para contruir uma cadeia de `lance`

```java
public class CriadorDeLeilao {

    private Leilao leilao;

    public CriadorDeLeilao() { }

    public CriadorDeLeilao para(String descricao) {
        this.leilao = new Leilao(descricao);
        return this;
    }

    public CriadorDeLeilao lance(Usuario usuario, double valor) {
        leilao.propoe(new Lance(usuario, valor));
        return this;
    }

    public Leilao constroi() { 
        return leilao;
    }
}

//Classe de teste
public class AvaliadorTest {

    private Avaliador leiloeiro;
    private Usuario maria;
    private Usuario jose;
    private Usuario joao;

    @Before
    public void setUp() {
        this.leiloeiro = new Avaliador();
        this.joao = new Usuario("João");
        this.jose = new Usuario("José");
        this.maria = new Usuario("Maria");
    }

    @Test
    public void deveEntenderLancesEmOrdemCrescente() {

        Leilao leilao = new CriadorDeLeilao()
            .para("Playstation 3 Novo")
            .lance(joao, 250)
            .lance(jose, 300)
            .lance(maria, 400)
            .constroi();

        leiloeiro.avalia(leilao);

        assertEquals(400.0, leiloeiro.getMaiorLance(), 0.00001);
        assertEquals(250.0, leiloeiro.getMenorLance(), 0.00001);
    }

    @Test
    public void deveEntenderLeilaoComApenasUmLance() {
        Leilao leilao = new CriadorDeLeilao()
        .para("Playstation 3 Novo")
        .lance(joao, 1000)
        .constroi();

        leiloeiro.avalia(leilao);

        assertEquals(1000.0, leiloeiro.getMaiorLance(), 0.00001);
        assertEquals(1000.0, leiloeiro.getMenorLance(), 0.00001);
    }

    @Test
    public void deveEncontrarOsTresMaioresLances() {
        Leilao leilao = new CriadorDeLeilao()
            .para("Playstation 3 Novo")
            .lance(joao, 100)
            .lance(maria, 200)
            .lance(joao, 300)
            .lance(maria, 400)
            .constroi();

        leiloeiro.avalia(leilao);

        List<Lance> maiores = leiloeiro.getTresMaiores();
        assertEquals(3, maiores.size());
        assertEquals(400.0, maiores.get(0).getValor(), 0.00001);
        assertEquals(300.0, maiores.get(1).getValor(), 0.00001);
        assertEquals(200.0, maiores.get(2).getValor(), 0.00001);
    }

}

//TESTANDO O LANCE
public class LanceTeste{
    
	@Test
    public void deveReceberUmLance() {
        Leilao leilao = new CriadorDeLeilao().para("Macbook Pro 15").constroi();
        assertEquals(0, leilao.getLances().size());

        leilao.propoe(new Lance(new Usuario("Steve Jobs"), 2000));

        assertEquals(1, leilao.getLances().size());
        assertEquals(2000.0, leilao.getLances().get(0).getValor(), 0.00001);
    }

    @Test
    public void deveReceberVariosLances() {
        Leilao leilao = new CriadorDeLeilao()
            .para("Macbook Pro 15")
            .lance(new Usuario("Steve Jobs"), 2000)
            .lance(new Usuario("Steve Wozniak"), 3000)
            .constroi();

        assertEquals(2, leilao.getLances().size());
        assertEquals(2000.0, leilao.getLances().get(0).getValor(), 0.00001);
        assertEquals(3000.0, leilao.getLances().get(1).getValor(), 0.00001);
    }

    @Test
    public void naoDeveAceitarDoisLancesSeguidosDoMesmoUsuario() {
        Usuario steveJobs = new Usuario("Steve Jobs");
        Leilao leilao = new CriadorDeLeilao()
            .para("Macbook Pro 15")
            .lance(steveJobs, 2000.0)
            .lance(steveJobs, 3000.0)
            .constroi();

        assertEquals(1, leilao.getLances().size());
        assertEquals(2000.0, leilao.getLances().get(0).getValor(), 0.00001);
    }

    @Test
    public void naoDeveAceitarMaisDoQue5LancesDeUmMesmoUsuario() {
        Usuario steveJobs = new Usuario("Steve Jobs");
        Usuario billGates = new Usuario("Bill Gates");

        Leilao leilao = new CriadorDeLeilao().para("Macbook Pro 15")
                .lance(steveJobs, 2000)
                .lance(billGates, 3000)
                .lance(steveJobs, 4000)
                .lance(billGates, 5000)
                .lance(steveJobs, 6000)
                .lance(billGates, 7000)
                .lance(steveJobs, 8000)
                .lance(billGates, 9000)
                .lance(steveJobs, 10000)
                .lance(billGates, 11000)
                .lance(steveJobs, 12000)
                .constroi();

        assertEquals(10, leilao.getLances().size());
        int ultimo = leilao.getLances().size()-1;
        assertEquals(11000.0, leilao.getLances().get(ultimo).getValor(), 0.00001);
    }    
}

```

# TDD

The main cycle of a TDD is composed of three cycles:

* RED (Failed Tests);
* GREEN (Correct Tests);
* BLUE (Refactoring the code);

To beginning with:

1. We start **creating the test**, which has to fail (the red cycle);
2. After the test, we have to **create the method** which will make the test pass (the green cycle) - **BUT**, the method has to be as simple as is possible;
3. When we finished all the tests and methods, it's time to **refactor our code**, but we must not change the test (the blue cycle);
4. After the refactoring, we need to do the tests again;

## Getting Started

Add the dependency:

```xml
<dependency>
    <groupId>org.hamcrest</groupId>
    <artifactId>hamcrest-all</artifactId>
    <version>1.3</version>
    <scope>test</scope>
</dependency>
```

To start faster, we will create only a simple Spring Boot Application, without any dependency (just default).

* Create a simple class, called `MovieStore` and using the shortcut (CTRL + 1), add a JUnit class - `MovieStoreTest`.

As a standard TDD project, we will create the test to then create the method. <br><br>

`MovieStoreTest`:

As we learned, with the creation of the Test, we have to create the original class. So, at beginning of the  `MovieStoreTest`:

1. We will create the method `findByPartialTitle(String title)` ;
2. As the return is a List of `Movie` we will have to change the return type to `List<Movie>`;
3. As the class `Movie` doesn't exist, we need to create it;

```java
//assertThat should comes from org.hamcrest.MatcherAssert.assertThat;
class MovieStoreTest {

	@Test
	public void returnsNoResultWhenNoTitlesPartiallyMatchSearch() throws Exception{
		MovieStore movieStore = new MovieStore();
		List<Movie> results = movieStore.findByPartialTitle("Harry Potter");
		assertThat(results.size(), is(0));
	}

}


public class Movie {

}


public class MovieStore {

	public List<Movie> findByPartialTitle(String title) {
		return null;
	}

}
```

We need to keep in mind, that at the beginning, our test **HAS TO FAIL** to then **_make the test pass_**, so:

1. First our method `findByPartialTitle`  returns null - what will returns a `nullPointerException`;
2. Since the test failed, now we will fix setting the return as a `return new LinkedList<Movie>();`

```java
public class MovieStore {

	public List<Movie> findByPartialTitle(String title) {
		return new LinkedList<Movie>();
	}

}
```

Let's implements another test:

```java
@Test
public void returnsMoviesWhenTitlesPartiallyMatched() throws Exception{
    MovieStore movieStore = new MovieStore();
    Movie harryPotter = new Movie("Harry Potter");
    movieStore.add(harryPotter);
    movieStore.add(new Movie("Fast And Furios"));
    movieStore.add(new Movie("Star Wars"));

    List<Movie> results = movieStore.findByPartialTitle("arry");
    assertThat(results.size(), is(1));
    assertThat(results, contains(harryPotter));
}


//Based on the test, the findByPartialTitle changed.
public class MovieStore {
	
	List<Movie> movies = new LinkedList<Movie>();

	public List<Movie> findByPartialTitle(String title) {
		for (Movie movie : movies) {
			if(movie.title().contains(title)) {
				return asList(movie);
			}
		}
		return new LinkedList<Movie>();
	}

	public void add(Movie movie) {
		movies.add(movie);
	}

}

public class Movie {

	private String title;

	public Movie(String title) {
		this.title = title;
	}

	public String title() {
		return title;
	}
}
```

and if we want to the 'find' method become insensitive (doesn't matter if is upper or lowercase)... Ty tips here, is to make all the words Upper or Lower, and then find it;

```java
@Test
public void returnsMoviesWhenTitlesPartiallyMatchedInsentive() throws Exception{
    MovieStore movieStore = new MovieStore();
    Movie harryPotter = new Movie("Harry Potter");
    Movie starWars = new Movie("Star Wars");
    Movie starTrek = new Movie("STAR Trek");

    movieStore.add(harryPotter);
    movieStore.add(starWars);
    movieStore.add(starTrek);

    List<Movie> results = movieStore.findByPartialTitle("star");
    assertThat(results.size(), is(2));
    assertThat(results, containsInAnyOrder(starTrek, starWars));
}


//MovieStore
public List<Movie> findByPartialTitle(String title) {
    List<Movie> result = new LinkedList<>(); 

    for (Movie movie : movies) {
        //toUpper in both title and titleSearch
        if(movie.title().toUpperCase().contains(title.toUpperCase())) {
            result.add(movie);
        }
    }
    return result;
}

```

As we're creating a new tests adding the same movie, we can extract to a `setUp()` using the annotation `@BeforeEach`.

```java
private Movie harryPotter = new Movie("Harry Potter");
private Movie starWars  = new Movie("Star Wars");
private Movie starTrek  = new Movie("STAR Trek");
private MovieStore movieStore = new MovieStore();

@BeforeEach
private void setUp() {
    movieStore.add(harryPotter);
    movieStore.add(starWars);
    movieStore.add(starTrek);
}
```

Another test, called `returnsMoviesWhenDirectoExactlyMatches` to return a List of Movies by the director namer.

```java
@Test
public void returnsMoviesWhenDirectoExactlyMatches() throws Exception {
    List<Movie> results = movieStore.findByDirector("Igor");
    assertThat(results.size(), is(2));
    assertThat(results, containsInAnyOrder(starTrek, starWars));
}

//MovieStore
public List<Movie> findByDirector(String director) {
    List<Movie> result = new LinkedList<>();

    for (Movie movie : movies) {
        if (movie.getDirector().equals(director)) {
            result.add(movie);
        }
    }
    return result;
}


//Movie
public Movie(String title, String director) {
    this.title = title;
    this.director = director;
}

public String getDirector() {
    return director;
}
```

A new test, could be `returnsMoviesWhenYearBetweenTwoValues`:

```java
@Test
public void returnsMoviesWhenYearBetweenTwoValues() throws Exception {
    List<Movie> results = movieStore.findByYear(1999, 2001);
    assertThat(results.size(), is(2));
    assertThat(results, containsInAnyOrder(starTrek, starWars));
}

//MovieStore
public List<Movie> findByYear(int from, int to) {
    List<Movie> result = new LinkedList<>();

    for (Movie movie : movies) {
        if (movie.getYear() >= from && movie.getYear() <= to) {
            result.add(movie);
        }
    }
    return result;
}
```



 ## Red -> Green -> Blue

All tests are done:

```java
class MovieStoreTest {

	private MovieStore movieStore = new MovieStore();
	private Movie harryPotter = new Movie("Harry Potter", "Romero", 2002);
	private Movie starWars = new Movie("Star Wars", "Igor", 2001);
	private Movie starTrek = new Movie("STAR Trek", "Igor", 2001);

	@BeforeEach
	private void setUp() {
		movieStore.add(harryPotter);
		movieStore.add(starWars);
		movieStore.add(starTrek);
	}

	@Test
	public void returnsNoMoviesWhenNoTitlesPartiallyMatchSearch() throws Exception {
		MovieStore movieStore = new MovieStore();
		List<Movie> results = movieStore.findByPartialTitle("Harry Potter");
		assertThat(results.size(), is(0));
	}

	@Test
	public void returnsMoviesWhenDirectoExactlyMatches() throws Exception {
		List<Movie> results = movieStore.findByDirector("Igor");
		assertThat(results.size(), is(2));
		assertThat(results, containsInAnyOrder(starTrek, starWars));
	} 

	@Test
	public void returnsMoviesWhenYearBetweenTwoValues() throws Exception {
		List<Movie> results = movieStore.findByYear(1999, 2001);
		assertThat(results.size(), is(2));
		assertThat(results, containsInAnyOrder(starTrek, starWars));
	}
}


public class MovieStore {

	List<Movie> movies = new LinkedList<Movie>();

	public List<Movie> findByPartialTitle(String title) {
		List<Movie> result = new LinkedList<>();

		for (Movie movie : movies) {
			if (movie.title().toUpperCase().contains(title.toUpperCase())) {
				result.add(movie);
			}
		}
		return result;
	}

	public void add(Movie movie) {
		movies.add(movie);
	}

	public List<Movie> findByDirector(String director) {
		List<Movie> result = new LinkedList<>();

		for (Movie movie : movies) {
			if (movie.getDirector().equals(director)) {
				result.add(movie);
			}
		}
		return result;
	}

	public List<Movie> findByYear(int from, int to) {
		List<Movie> result = new LinkedList<>();

		for (Movie movie : movies) {
			if (movie.getYear() >= from && movie.getYear() <= to) {
				result.add(movie);
			}
		}
		return result;
	}
}
```

And now it's time to refactor or code, that is, make the class more beauty, but how?

1. Look what's repeating in our code;
2. Split it in methods, we can use an anonymous class to become lambda; 
3. Convert to java 8;

```java
public class MovieStore {

	List<Movie> movies = new LinkedList<Movie>();

	public void add(Movie movie) {
		movies.add(movie);
	}
	
	//Anonymous interface, because of the if that we had
	interface Predicate {
		boolean matches(Movie movie);
	}

    //Extract the code that was repeated and repeated to one method
	private List<Movie> findBy(Predicate predicate) {
		List<Movie> result = new LinkedList<>();

		for (Movie movie : movies) {
			if (predicate.matches(movie)) {
				result.add(movie);
			}
		}
		return result;
	}

    //Used java 8 to make it beauty
	public List<Movie> findByPartialTitle(String title) {
		return findBy(movie -> movie.title().toUpperCase().contains(title.toUpperCase()));
	}

	public List<Movie> findByDirector(String director) {
		return findBy(movie -> movie.getDirector().equals(director));
	}

	public List<Movie> findByYear(int from, int to) {
		return findBy(movie -> movie.getYear() >= from && movie.getYear() <= to);
	}

}
```

# Mock

## Por que o Mock?

Imagine que estamos fazendo testes que fazem **requisições ao BD**. Se o BD for novo, terá poucos registros e terá um retorno rápido, correto? Mas imagina um teste em um BD legado, com 1milhão de registros… Pode demorar, correto? Entã a classe **MOCKITO** foi criada para nós auxiliar nessa **Simulação de um BD**, de forma que é possível:

* Verificar se métodos foram chamados;
* Verificar se exceções foram lançadas;
* “Simular” o banco de dados;

## Como utilizar o Mock?

Para utilizar o Mock, a gente precisa ensina-lo a se comportar da maneira que a gente espera.

Exemplo:

* Vamos verificar se um Leilão irá encerrar no período de uma semana, utilizando um `Mock`:

  1. Vamos precisar falar para o Mock, retornar um `daoFalso`, que irá simular o `LeilaoDao`;
  2. O método `when()` recebe o que queremos “simular” e o método `thenReturn()` passa o que o método falso deve devolver;
     * Neste caso, estamos passando para o método `correntes` uma lista com dois Leilões, afinal o método `correntes` precisa receber algo…

  ```java
  @Test
  public void deveEncerrarLeiloesQueComecaramUmaSemanaAntes() {
      Calendar dataAntiga = Calendar.getInstance();
      dataAntiga.set(1999, 1, 20);
  
      Leilao leilao1 = new CriadorDeLeilao().para("TV").naData(dataAntiga).constroi();
      Leilao leilao2 = new CriadorDeLeilao().para("TV LCD").naData(dataAntiga).constroi();
  
      List<Leilao> leiloesAntigos = Arrays.asList(leilao1, leilao2);
  
      // criando o mock!
      LeilaoDao daoFalso = mock(LeilaoDao.class);
      // ensinando o mock a reagir da maneira que esperamos!
      when(daoFalso.correntes()).thenReturn(leiloesAntigos);
  
      EncerradorDeLeilao encerrador = new EncerradorDeLeilao(daoFalso);
  
      //método encerra, irá receber do daoFalso.correntes() todos leilões c/ mais de uma semana
      encerrador.encerra();
  
      assertEquals(2, encerrador.getTotalEncerrados());
      assertTrue(leilao1.isEncerrado());
      assertTrue(leilao2.isEncerrado());
  }
  
  //Precisamos passar pelo construtor do EncerradorDeLeilao o DAO, desta forma podemos simular
  public class EncerradorDeLeilao {
  	
  	private LeilaoDao dao;
  
  	public EncerradorDeLeilao (LeilaoDao dao) {
  		this.dao = dao;
  	}
  
  	private int total = 0;
  
  	public void encerra() {
  		List<Leilao> todosLeiloesCorrentes = dao.correntes();
  
  		for (Leilao leilao : todosLeiloesCorrentes) {
  			if (comecouSemanaPassada(leilao)) {
  				leilao.encerra();
  				total++;
  				dao.atualiza(leilao);
  			}
  		}
  	}
  }
  ```

* Verificar se Leilões que começaram ontem não foram encerrados:

  ```java
  @Test
  public void naoDeveEncerrarLeiloesQueComecaramOntem() {
      Calendar dataOntem = Calendar.getInstance();
      dataOntem.add(Calendar.DAY_OF_MONTH, -1);
  
      Leilao leilaoOntem = new CriadorDeLeilao().para("TV").naData(dataOntem).constroi();
  
      LeilaoDao daoFalso = mock(LeilaoDao.class);
      when(daoFalso.correntes()).thenReturn(asList(leilaoOntem));
  
      EncerradorDeLeilao encerrador = new EncerradorDeLeilao(daoFalso);
      encerrador.encerra();
  
      assertFalse(leilaoOntem.isEncerrado());
  }
  ```

## Verificando se métodos foram executados

Uma das vantagens do uso do Mock, é saber se métodos foram executados!<br><br>

No exemplo acima, temos a verificação se o Leilão foi encerrado, porém, dentro do método `encerra()` temos a atualização do status dos leilões, através do método `dao.atualiza(leilao);`

```java
public void encerra() {
    List<Leilao> todosLeiloesCorrentes = dao.correntes();

    for (Leilao leilao : todosLeiloesCorrentes) {
        if (comecouSemanaPassada(leilao)) {
            leilao.encerra();
            total++;
            dao.atualiza(leilao);
        }
    }
}
```

Como podemos saber se o método `atualiza` foi executado?

* O Mock, possui um método chamado **`verify()`** que retorna um `boolean` verificando se aquela ação foi tomada ou não!

```java
@Test
public void deveAtualizarLeiloesEncerrados() {
    Calendar antiga = Calendar.getInstance();
    antiga.set(1999, 1, 20);

    Leilao leilao1 = new CriadorDeLeilao().para("TV").naData(antiga).constroi();

    RepositorioDeLeiloes daoFalso = mock(RepositorioDeLeiloes.class);
    when(daoFalso.correntes()).thenReturn(Arrays.asList(leilao1));

    EncerradorDeLeilao encerrador = new EncerradorDeLeilao(daoFalso);
    encerrador.encerra();

    // verificando que o metodo atualiza foi realmente invocado!
    verify(daoFalso).atualiza(leilao1);
}
```

* Podemos ir alem e **verificar quantas vezes** o método foi invocado:
  * se invocarmos no exemplo abaixo, mais de uma vez, o Mock retornará erro, informando a quantidade de vezes invocados;

```java
verify(daoFalso, times(1)).atualiza(leilao1);
```

* Podemos **verificar se NUNCA** o método foi chamado:

```java
verify(daoFalso, never()).atualiza(leilao1);
```

## Manutenção

Algo comum é o código ir evoluindo e então os testes terem que ir evoluindo junto, mas e como faremos com o Mock? TEMOS QUE CONTINUAR EVOLUINDO ELE!

* Exemplo:

  * Imagine que após encerrar um leilão, seja encaminhado um email informando o termino:

    ```java
    public interface EnviadorDeEmail {
        void envia(Leilao leilao);
    }
    
    public class EncerradorDeLeilao {
    
        private int total = 0;
        private final RepositorioDeLeiloes dao;
        private final EnviadorDeEmail carteiro;
    
        public EncerradorDeLeilao(RepositorioDeLeiloes dao, EnviadorDeEmail carteiro) {
            this.dao = dao;
            this.carteiro = carteiro;
        }
    
        public void encerra() {
            List<Leilao> todosLeiloesCorrentes = dao.correntes();
    
            for (Leilao leilao : todosLeiloesCorrentes) {
                if (comecouSemanaPassada(leilao)) {
                    System.out.println("oi");
                    leilao.encerra();
                    total++;
                    dao.atualiza(leilao);
                    carteiro.envia(leilao);
                }
            }
        }
    }
    ```

  * Os testes irão quebrar, pq agora o construtor receber outro parâmetro, que **precisará ser mockado**

    ```JAVA
     @Test
    public void deveEncerrarLeiloesQueComecaramUmaSemanaAtras() {
    
        Calendar antiga = Calendar.getInstance();
        antiga.set(1999, 1, 20);
    
        Leilao leilao1 = new CriadorDeLeilao().para("TV de plasma")
            .naData(antiga).constroi();
        Leilao leilao2 = new CriadorDeLeilao().para("Geladeira")
            .naData(antiga).constroi();
    
        RepositorioDeLeiloes daoFalso = mock(RepositorioDeLeiloes.class);
        when(daoFalso.correntes()).thenReturn(Arrays.asList(leilao1, leilao2));
    
        //NOVO MOCK
        EnviadorDeEmail carteiroFalso = mock(EnviadorDeEmail.class);
        
        EncerradorDeLeilao encerrador = new EncerradorDeLeilao(daoFalso, carteiroFalso);
        encerrador.encerra();
    
        assertEquals(2, encerrador.getTotalEncerrados());
        assertTrue(leilao1.isEncerrado());
        assertTrue(leilao2.isEncerrado());
    }
    ```

* Com o envio do email testado, podemos **GARANTIR A ORDEM** de execução dos métodos com o `InOrder`:

  ```java
  // passamos os mocks que serao verificados
  InOrder inOrder = inOrder(daoFalso, carteiroFalso);
  // a primeira invocação
  inOrder.verify(daoFalso, times(1)).atualiza(leilao1);    
  // a segunda invocação
  inOrder.verify(carteiroFalso, times(1)).envia(leilao1);
  
  
  @Test
  public void deveEnviarEmailAposPersistirLeilaoEncerrado() {
      Calendar antiga = Calendar.getInstance();
      antiga.set(1999, 1, 20);
  
      Leilao leilao1 = new CriadorDeLeilao().para("TV de plasma")
          .naData(antiga).constroi();
  
      RepositorioDeLeiloes daoFalso = mock(RepositorioDeLeiloes.class);
      when(daoFalso.correntes()).thenReturn(Arrays.asList(leilao1));
  
      EnviadorDeEmail carteiroFalso = mock(EnviadorDeEmail.class);
      EncerradorDeLeilao encerrador = 
          new EncerradorDeLeilao(daoFalso, carteiroFalso);
  
      encerrador.encerra();
  
      InOrder inOrder = inOrder(daoFalso, carteiroFalso);
      inOrder.verify(daoFalso, times(1)).atualiza(leilao1);    
      inOrder.verify(carteiroFalso, times(1)).envia(leilao1);    
  }
  ```

  

## Mock & Exceções

Vamos imaginar o cenário onde o banco de dados falhou, ou até mesmo o servidor que envia email deu problema… Como podemos fazer com que apesar do problema o sistema continue funcionando? Com **Try/Catch**!

```java
for (Leilao leilao : todosLeiloesCorrentes) {
    try {
        if (comecouSemanaPassada(leilao)) {
            leilao.encerra();
            total++;
            dao.atualiza(leilao);
            carteiro.envia(leilao);
        }
    } catch(Exception e) {
        // salvo a excecao no sistema de logs
        // e o loop continua!
    }
}
```

Mas e o teste? Como ele interpretará isso?

* O Mock possui um método chama `doThrow(Exception)` que pode ser utilizado junto com o método `when()`

Vamos simular que o `leilao1` deu problema, mas queremos que o sistema prossiga com a atualizacao do `leilao2`

```java
@Test
public void deveContinuarAExecucaoMesmoQuandoDaoFalha() {
    Calendar antiga = Calendar.getInstance();
    antiga.set(1999, 1, 20);

    Leilao leilao1 = new CriadorDeLeilao().para("TV de plasma")
        .naData(antiga).constroi();
    Leilao leilao2 = new CriadorDeLeilao().para("Geladeira")
        .naData(antiga).constroi();

    RepositorioDeLeiloes daoFalso = mock(RepositorioDeLeiloes.class);
    when(daoFalso.correntes()).thenReturn(Arrays.asList(leilao1, leilao2));

    //TRATAMOS A EXCEÇÃO DO LEILAO1
    doThrow(new RuntimeException()).when(daoFalso).atualiza(leilao1);

    EnviadorDeEmail carteiroFalso = mock(EnviadorDeEmail.class);
    EncerradorDeLeilao encerrador = 
        new EncerradorDeLeilao(daoFalso, carteiroFalso);

    encerrador.encerra();

    //VERIFICAMOS SE O LEILAO2 FOI ATUALIZADO E ENVIADO
    verify(daoFalso).atualiza(leilao2);
    verify(carteiroFalso).envia(leilao2);
}
```

## Recuperando valor de um método

E se quisermos pegar um valor final de um método? Por exemplo, temos o método `getMaiorLance()` que retorna o maior lance dado de um `Leilao`, mas como “capturamos” este valor?

* A classe `ArgumentCaptor` serve para pegarmos o **resultado do método**!

Vamos utilizar a classe `Pagamento` que iremos testar se o pagamento feito foi do maior lance:

```java
public class Pagamento {

	private double valor;
	private Calendar data;

	public Pagamento(double valor, Calendar data) {
		this.valor = valor;
		this.data = data;
	}
	public double getValor() {
		return valor;
	}
	public Calendar getData() {
		return data;
	}
}

//CLASSE QUE IREMOS TESTAR
public class GeradorDePagamentos {

	private RepositorioDeLeiloes leiloes;
	private RepositoDePagamentos pagamentos;
	private Avaliador avaliador;

	public GeradorDePagamentos(RepositorioDeLeiloes leiloes, RepositoDePagamentos pagamentos, Avaliador avaliador) {
		this.leiloes = leiloes;
		this.pagamentos = pagamentos;
		this.avaliador = avaliador;
	}
	
    //MÉTODO QUE IRÁ PEGAR O PAGAMENTO DO MAIOR LANCE
	public void gera () {
		List<Leilao> leiloesEncerrados = leiloes.encerrados();
		for (Leilao leilao : leiloesEncerrados) {
			avaliador.avalia(leilao);
			
			Pagamento pagamento = new Pagamento(avaliador.getMaiorLance(), Calendar.getInstance());
			pagamentos.salva(pagamento);
		}
	}
}


public class GeradorDePagamentosTest {

	@Test
	public void deveGerarPagamentoParaUmLeilaoEncerrado() {
		Avaliador avaliador = new Avaliador();
		Leilao leilao = new CriadorDeLeilao()
				.para("TV")
				.lance(new Usuario("igor"), 200.00)
				.lance(new Usuario("Stephanie"), 250.00)
				.constroi();
		
		//MOCKAMOS AQUILO QUE IREMOS UTILIZAR MÉTODOS NOS TESTES
		RepositoDePagamentos pagamentos = mock(RepositoDePagamentos.class);
		RepositorioDeLeiloes leiloes = mock(RepositorioDeLeiloes.class);
		
		when(leiloes.encerrados()).thenReturn(asList(leilao));
		
		GeradorDePagamentos gerador = new GeradorDePagamentos(leiloes, pagamentos, avaliador);
		gerador.gera();
		
		 // criamos o ArgumentCaptor que sabe capturar um Pagamento
	    ArgumentCaptor<Pagamento> argumento = ArgumentCaptor.forClass(Pagamento.class);
	    // capturamos o Pagamento que foi passado para o método salvar
	    verify(pagamentos).salva(argumento.capture());
	    
	    Pagamento pagamentoGerado = argumento.getValue();
        assertEquals(250.0, pagamentoGerado.getValor(), 0.00001);
	}

}
```

# Selenium - Teste Automatizado

O Selenium é uma biblioteca que nos possibilita fazer testes automatizados, ou seja, permite com que a máquina execute diversos testes, repetidamente, com possibilidade de até mesmo nos trazer evidências!

## Getting Started - Testando o Google

Além de adicionar a dependência abaixo, se faz necessário baixar o [chromedriver](http://chromedriver.storage.googleapis.com/index.html) correspondente a versão do Google Chrome

```xml
<!-- https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>3.141.59</version>
</dependency>
```

1. Devemos verificar o **Browser** que iremos utilizar e a partir do do browser, o Selenium oferece a classe `WebDriver`

   ```java
   System.setProperty("webdriver.chrome.driver", "C:\\SeleniumDrivers\\chromedriver.exe");
   WebDriver driver = new ChromeDriver();
   ```

2. Para **expandir a tela** assim que o Browser for aberto:

   ```java
   driver.manage().window().maximize();
   ```

3. Para **abri o browser determinada URL**, utilizamos o método `get("http...")`

   ```java
   driver.get("https://www.google.com.br/");
   
   driver.close(); //necessário fechar por último
   ```

4. Para **procurar** um **TextBox**, podemos utilizar o método `findElement(By.name("id"))`;

   * _Este método nos permite localizar o campo pelo: **name, id, tagName**(button, form, li);_

   ```java
   WebElement txtBusca = driver.findElement(By.name("q"));
   ```

5. Para **escrever** em um Texbox, utilizamos o `sendKeys`:

   ```java
   txtBusca.sendKeys("Testando a busca com Selenium");
   ```

6. Para **Submeter** um formulário, temos duas formas:

   * Ou pelo próprio campo: `txtBusca.submit();`

   * Ou pelo botão: 

     ```java
     WebElement botaoSalvar = driver.findElement(By.id("btnSalvar"));
     botaoSalvar.click();
     ```

Exemplo: Abra o navegador no google e pesquise sobre o Selenium:

```java
public class TesteAutomatizado {
	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver", "C:\\SeleniumDrivers\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.manage().window().maximize();
		driver.get("https://www.google.com.br/");
		
		WebElement txtBusca = driver.findElement(By.name("q"));
		txtBusca.sendKeys("Testando a busca com Selenium");
		
		txtBusca.submit();
        
        driver.close();
	}
}
```

## Preenchendo e testando formularios

Para este teste, será utilizado o projeto [leiloes ](<http://s3.amazonaws.com/caelum-online-public/PM-74/leiloes.zip)(desenvolvido pela Alura). Este projeto, necessita que seja executado pelo  [ANT](https://ant.apache.org/bindownload.cgi) (necessita ser instalado, junto com o a variável de ambiente ANT_HOME no windows);

* Deverá ser trocado o ivy.jar de 2.20 para 2.5 -> também realizar a alteração no build.properties;
* Deverá utilizar o JDK 8;
* Acessar o projeto via terminal e executar o comando `ant jetty.run`

**Exemplo**: Teste o cadastro de usuário, dada a URL: `http://localhost:8080/usuarios/new`

```java
@BeforeEach
void setUp() {
    System.setProperty("webdriver.chrome.driver", "C:\\SeleniumDrivers\\chromedriver.exe");
    driver = new ChromeDriver();

    driver.manage().window().maximize();
    driver.get("http://localhost:8080/usuarios/new");

    txtNome = driver.findElement(By.name("usuario.nome"));
    txtEmail = driver.findElement(By.name("usuario.email"));
}

@Test
void testandoCadastroDeUsuario() {
    txtNome.sendKeys("Igor");
    txtEmail.sendKeys("igorgrv@hotmail.com");

    txtNome.submit();

    boolean achouNome = driver.getPageSource().contains("Igor");
    boolean achouEmail = driver.getPageSource().contains("igorgrv@hotmail.com");

    assertTrue(achouEmail);
    assertTrue(achouNome);

}

@AfterEach
void after() {
    driver.close();
}
```

Até a etapa acima, ja aprendemos… Mas e para checar se o usuário foi cadastrado?

* Para **verificar um texto** dentro de uma página HTML, temos o comando:

  ```java
  boolean achouNome = driver.getPageSource().contains("Igor");
  boolean achouEmail = driver.getPageSource().contains("igorgrv@hotmail.com");
  ```

```java
class UsuarioTesteTest {
	@Test
	void testandoCadastroDeUsuario() {
		System.setProperty("webdriver.chrome.driver", "C:\\SeleniumDrivers\\chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		driver.manage().window().maximize();
		driver.get("http://localhost:8080/usuarios/new");
		
		WebElement txtNome = driver.findElement(By.name("usuario.nome"));
		WebElement txtEmail = driver.findElement(By.name("usuario.email"));
		
		txtNome.sendKeys("Igor");
		txtEmail.sendKeys("igorgrv@hotmail.com");
		
		txtNome.submit();
		
		boolean achouNome = driver.getPageSource().contains("Igor");
		boolean achouEmail = driver.getPageSource().contains("igorgrv@hotmail.com");
		
		assertTrue(achouEmail);
		assertTrue(achouNome);
        
        driver.close();
	}
}
```

**Exemplo 2**: Verifique se o não preenchimento do Nome do usuário é apresentado o erro de “Nome obrigatório”;

```java
@Test
void deveApresentarErroDoFormularioCasoNaoSejaPreenchidoNome() {
    txtEmail.sendKeys("igorgrv@hotmail.com");

    txtEmail.submit();

    boolean achouValidacao = driver.getPageSource().contains("Nome obrigatorio!");

    assertTrue(achouValidacao);
}
```

**Exemplo 3**: erifique se o não preenchimento do Nome e Email do usuário é apresentado o erro de “Nome obrigatório!” e "E-mail obrigatorio!" ;

```java
@Test
void deveApresentarErroDoFormularioCasoNaoSejaPreenchidoNomeEEmail() {
    txtEmail.submit();

    boolean nomeObrigatorio = driver.getPageSource().contains("Nome obrigatorio!");
    boolean emailObrigatorio = driver.getPageSource().contains("E-mail obrigatorio!");

    assertTrue(nomeObrigatorio);
    assertTrue(emailObrigatorio);
}
```

## Verificando se um link funciona

E se quissemos testar um link, ou seja, uma tag `<a href="" />`? O Selenium, possui um elemento que nos permite fazer a **busca pelo texto** do link, através do `By.linkText("Novo usuário")`;

* Exemplo: 

  * Invés de utilizar a URL: `http://localhost:8080/usuarios/new` 
  * Utilize URL: `http://localhost:8080/usuarios`

  * Irá ser necessário clicar no link “Novo Usuário”

  ```java
  //BASTA ALTERAR O MÉTODO @BEFORE
  @BeforeEach
  void setUp() {
      System.setProperty("webdriver.chrome.driver", "C:\\SeleniumDrivers\\chromedriver.exe");
      driver = new ChromeDriver();
  
      driver.manage().window().maximize();
      driver.get("http://localhost:8080/usuarios");
  
      //IRÁ PROCURAR O LINK E CLICAR NELE
      linkNovoUsuario = driver.findElement(By.linkText("Novo Usuário"));
      linkNovoUsuario.click();
  
      txtNome = driver.findElement(By.name("usuario.nome"));
      txtEmail = driver.findElement(By.name("usuario.email"));
  }
  ```

  

## Page Objects

A idéia do PageObjects é simplificar o teste, de forma que seja mais clean! E um meio de fazer isto seria **criar uma Classe para cada página!**

```java
linkNovoUsuario = driver.findElement(By.linkText("Novo Usuário"));
linkNovoUsuario.click();

//SIMPLIFICANDO PODEMOS FAZER
usuario.novo()
```

```java
txtNome = driver.findElement(By.name("usuario.nome"));
txtEmail = driver.findElement(By.name("usuario.email"));

txtNome.sendKeys("Igor");
txtEmail.sendKeys("igorgrv@hotmail.com");

txtNome.submit();

//SIMPLIFICANDO PODEMOS:
usuario.novo().cadastra("Igor","igorgrv@hotmail.com");
```

```JAVA
boolean achouNome = driver.getPageSource().contains("Igor");
boolean achouEmail = driver.getPageSource().contains("igorgrv@hotmail.com");

assertTrue(achouEmail);
assertTrue(achouNome);

//SIMPLIFICANDO PODEMOS:
asserTrue(usuario.existeNaListagem("Igor","igorgrv@hotmail.com"));
```

Portanto, o código simplificado ficaria:

```java
usuario.novo().cadastra("Igor","igorgrv@hotmail.com");
asserTrue(usuario.existeNaListagem("Igor","igorgrv@hotmail.com"));
```

1. Crie uma nova classe para a Pagina Usuario:

   ```java
   public class UsuarioPage {
   
   	private WebDriver driver;
   
   	public UsuarioPage(WebDriver driver) {
   		this.driver = driver;
   	}
   	
   	public void visita() {
   		driver.get("http://localhost:8080/usuarios");
   	}
   	
       //Irá direcionar para próxima página
   	public UsuarioNovoPage novo() {
   		driver.findElement(By.linkText("Novo Usuário")).click();
   		return new UsuarioNovoPage(driver);
   	}
   	
   	public boolean existeNaListagemDaPagina(String nome, String email) {
   		return driver.getPageSource().contains(nome) && driver.getPageSource().contains(email);
   	}
   }
   ```

2. Crie uma nova classe para a Página Novo Usuario:

   ```java
   public class UsuarioNovoPage {
   
   	private WebDriver driver;
   
   	public UsuarioNovoPage(WebDriver driver) {
   		this.driver = driver;
   	}
   
   	public void cadastra(String nome, String email) {
   		WebElement txtNome = driver.findElement(By.name("usuario.nome"));
   		WebElement txtEmail = driver.findElement(By.name("usuario.email"));
   
   		txtNome.sendKeys(nome);
   		txtEmail.sendKeys(email);
   
   		txtNome.submit();
   	}
   	
   	public boolean validacaoDeNomeObrigatorio() {
   		return driver.getPageSource().contains("Nome obrigatorio!");
   	}
   
   }
   ```

3. Automatize o teste:

   ```java
   class UsuarioTesteTest {
   
   	private WebDriver driver;
   	private UsuarioPage usuario;
   
   	@BeforeEach
   	void setUp() {
   		System.setProperty("webdriver.chrome.driver", "C:\\SeleniumDrivers\\chromedriver.exe");
   		driver = new ChromeDriver();
   		driver.manage().window().maximize();
   		
   		usuario = new UsuarioPage(driver);
   		usuario.visita();
   	}
   
   	@Test
   	void testandoCadastroDeUsuario() {
   		usuario.novo().cadastra("igor", "igorgrv@hotmail.com");
   		assertTrue(usuario.existeNaListagemDaPagina("igor", "igorgrv@hotmail.com"));
   	}
   
   	@Test
   	void deveApresentarErroDoFormularioCasoNaoSejaPreenchidoNome() {
   		UsuarioNovoPage form = usuario.novo();
   		form.cadastra("", "igorgrv@hotmail.com");
   
   		assertTrue(form.validacaoDeNomeObrigatorio());
   	}
   
   	@AfterEach
   	void after() {
   		driver.close();
   	}
   
   }
   ```

Exemplo 2:

* Crie um teste para verificar se o usuário poderá ser excluído:

  ```java
  public class UsuarioPage {
  
	private WebDriver driver;
  
  	public UsuarioPage(WebDriver driver) {
  		this.driver = driver;
  	}
      
      public void excluirUsuario(int i) {
          driver.findElements(By.tagName("button")).get(i-1).click();;
  
          //IRÁ ACEITAR O JAVASCRIPT
          Alert alert = driver.switchTo().alert();
          alert.accept();
      }
  }
  
  @Test
  void testaSeOUsuarioPodeSerExcluido() {
      usuario.novo().cadastra("igor2", "igorgrv2@hotmail.com");
      assertTrue(usuario.existeNaListagemDaPagina("igor2", "igorgrv2@hotmail.com"));
  
      usuario.excluirUsuario(1);
      assertFalse(usuario.existeNaListagemDaPagina("igor2", "igorgrv2@hotmail.com"));
  }
  ```
  

## Formulários mais complexos

E como faremos caso quisessemos testar um formulário com **ComboBox**  ou **ChecBox**? 

* Exemplo: passe para um ComboBox o valor a ser preenchido:

  ```java
  Select cmbUsuario = new Select(driver.findElement(By.name("usuario")));
  cmbUsuario.selectByVisibleText(usuario);
  ```

* Exemplo2: teste um CheckBox:

  ```java
  //usado é proviniente do método
  if(usado) {
      WebElement ckUsado = driver.findElement(By.name("leilao.usado"));
      ckUsado.click();
  }
  ```

* Testando as funções do Leilão:

  ```java
  public class LeilaoPage {
  
  	private WebDriver driver;
  
  	public LeilaoPage(WebDriver driver) {
  		this.driver = driver;
  	}
  	
  	public void visita () {
  		driver.get("http://localhost:8080/leiloes");
  	}
  	
  	public LeilaoNovoPage novo () {
  		driver.findElement(By.linkText("Novo Leilão")).click();
  		return new LeilaoNovoPage(driver);
  	}
  
  	public boolean existe(String produto, double valor, String usuario, boolean usado) {
  
          return driver.getPageSource().contains(produto) && 
                  driver.getPageSource().contains(String.valueOf(valor)) &&
                  driver.getPageSource().contains(usado ? "Sim" : "Não");
  
      }
  }
  
  public class LeilaoNovoPage {
  
  	private WebDriver driver;
  
  	public LeilaoNovoPage(WebDriver driver) {
  		this.driver = driver;
  	}
  
  	public void preenche(String nome, double valor, String usuario, boolean usado) {
  		WebElement txtNome = driver.findElement(By.name("leilao.nome"));
  		WebElement txtValor = driver.findElement(By.name("leilao.valorInicial"));
  
  		txtNome.sendKeys(nome);
  		txtValor.sendKeys(String.valueOf(valor));
  
  		Select cmbUsuario = new Select(driver.findElement(By.name("leilao.usuario.id")));
  		cmbUsuario.selectByVisibleText(usuario);
  
  		if (usado) {
  			WebElement ckUsado = driver.findElement(By.name("leilao.usado"));
  			ckUsado.click();
  		}
  
  		txtNome.submit();
  
  	}
  }
  
  
  public class LeilaoTeste {
  
  	private ChromeDriver driver;
  	private LeilaoPage leiloes;
  	private UsuarioPage usuarios;
  
  	@BeforeEach
  	void inicializa() {
  		System.setProperty("webdriver.chrome.driver", "C:\\SeleniumDrivers\\chromedriver.exe");
  		driver = new ChromeDriver();
  		driver.manage().window().maximize();
  		
  		leiloes = new LeilaoPage(driver);
  		usuarios = new UsuarioPage(driver);
  		
  		usuarios.visita();
  		usuarios.novo().cadastra("Paulo Henrique", "paulo@henrique.com");
  
  	}
  
  	@Test
  	void deveCadastrarUmLeilao() {
  
  		leiloes.visita();
  		LeilaoNovoPage novoLeilao = leiloes.novo();
  		novoLeilao.preenche("Geladeira", 123, "Paulo Henrique", true);
  
  		assertTrue(leiloes.existe("Geladeira", 123, "Paulo Henrique", true));
  	}
  	
  	@AfterEach
  	void after () {
  		driver.close();
  	}
  }
  ```

  

## Testes com AJAX

Quando se trata de uma requisição em AJAX, não podemos pedir para o JUnit verificar instanteneamente se a requisição foi feita e ai está o “segredo”.

* Crie um teste para verificar se um lance foi efetuado (lembre-se de que o lance é feito através de uma requisição AJAX)!

  ```java
  //A IMPLEMENTAÇÃO DEVE SER SIMPLES, LEMBRE-SE DO TDD, VAMOS COMEÇAR PELO TESTE
  @Test
  public void deveFazerUmLance() {
  
      leiloes.detalhes(1);
  
      lances.lance("José Alberto", 150);
  
      assertTrue(lances.existeLance("José Alberto", 150));
  }
  ```

Implementações:

```java
public class DetalhesDoLeilaoPage {

    private WebDriver driver;

    public DetalhesDoLeilaoPage(WebDriver driver) {
        this.driver = driver;
    }

    public void lance(String usuario, double valor) {
        WebElement txtValor = driver.findElement(By.name("lance.valor"));
        WebElement combo = driver.findElement(By.name("lance.usuario.id"));
        Select cbUsuario = new Select(combo);

        cbUsuario.selectByVisibleText(usuario);
        txtValor.sendKeys(String.valueOf(valor));

        
        //POR SE TRATAR DE UM BOTÃO EM AJAX, DEVEMOS FAZER PELO BOTÃO!
        driver.findElement(By.id("btnDarLance")).click();
    }
    
    
    //AQUI MORA O PROBLEMA DA VERIFICAÇÃO EM AJAX, PRECISAMOS SETAR UM TIME
    public boolean existeLance(String usuario, double valor) {
        return driver.getPageSource().contains(usuario)
                && driver.getPageSource().contains(String.valueOf(valor));
    }

}
```

**Setando um Time** para verificar se o elemento foi preenchido:

```java
public boolean existeLance(String usuario, double valor) {
    Boolean temUsuario = new WebDriverWait(driver, 10)
        .until(ExpectedConditions
               .textToBePresentInElement(By.id("lancesDados"), usuario));

    if(temUsuario) {
        return driver.getPageSource().contains(String.valueOf(valor));
    } else {
        return false;
    }
}
```

Teste:

```java
public class LanceSystemTest {

    private WebDriver driver;
    private LeiloesPage leiloes;

    @Before
    public void inicializa() {
        this.driver = new FirefoxDriver();

                driver.get("http://localhost:8080/apenas-teste/limpa");

        UsuariosPage usuarios = new UsuariosPage(driver);
        usuarios.visita();
        usuarios.novo().cadastra("Paulo Henrique", "paulo@henrique.com");
        usuarios.novo().cadastra("José Alberto", "jose@alberto.com");

        leiloes = new LeiloesPage(driver);
        leiloes.visita();
        leiloes.novo().preenche("Geladeira", 100, "Paulo Henrique", false);
    }

    @Test
    public void deveFazerUmLance() {

        DetalhesDoLeilaoPage lances = leiloes.detalhes(1);

        lances.lance("José Alberto", 150);

        assertTrue(lances.existeLance("José Alberto", 150));
    }

}
```

