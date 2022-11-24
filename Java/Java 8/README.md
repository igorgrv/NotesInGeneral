
# JAVA 8 Features
As principais atribuições que foram dadas ao Java8, foram:
* Default methods;
* Lambdas;
* Method reference;
* Streams;
* Nova API de Data;

## <a name="defaultmethod"></a>Default Methods
Os **default methods** foram adicioandas as Interfaces, de modo que quando fosse adicionado um método como `default`, **não seria necessário** que classes que implementem esta interface, **implementassem** o método! - **_É O OPOSTO DA CLASSE ABSTRACT_**
* Exemplo: na classe `java.util.List` foi inserido o método `default void sort`, e não foi necessário adicionar este método nas classes filhas de List, como ArrayList<>, LinkedList<> e etc...

### Os métodos `default` permitem a interface evoluir sem quebrar compatibilidade!
* Exemplo da implementação do método `sort`, implementado na Interface `List`:
	* **Sem o método** sort da List, é necessário utilizar o da **Collections**:
		```java
		List<String> cursos = new ArrayList<String>();
		cursos.add("Java");
		cursos.add("Abstract");
		cursos.add("Default");
		
		Collections.sort(cursos);
		//Neste caso, por ser String ele ordenará alfabeticamente
		```
	* **Sem o método** sort da List, **ordenando pelo tamanho da String**, com **Comparator**:
		```java
		class ComparadorPorTamanho implements Comparator<String>{
		
			@Override
			public int compare(String s1, String s2) {
				return Integer.compare(s1.length(), s2.length());
			}
			
		}
		
		public static void main(String[] args) {
			List<String> cursos = new ArrayList<String>();
			cursos.add("Java");
			cursos.add("Abstract");
			cursos.add("Method Default");
			
			//Collections.sort(cursos);
			Comparator<String> comparador = new ComparadorPorTamanho();
			Collections.sort(cursos, comparador);
			System.out.println(cursos);
			
		}
		```
	* **Com o método `sort`** da List:
		```java
		Comparator<String> comparador = new ComparadorPorTamanho();
		//Collections.sort(cursos, comparador);
		
		cursos.sort(comparador);
		System.out.println(cursos);
		```
		* Ou seja, a `interace List` só conseguiu implementar nela o método `sort` devido a implementação do método `default void sort`!

* Outro exemplo está no método `forEach` que também foi implementado na `interface List`:
	* Exibindo objetos de uma lista **com For**:
		```java
		List<String> cursos = new ArrayList<String>();
		cursos.add("Java");
		//Demais cursos adicionados
		
		for (String curso : cursos) {
			System.out.println(curso);
		}
		```
	*  **com forEach** - com Lambda (sem Lambda seria necessário implementar a classe `Consumer<String>` ):
		```java
		List<String> cursos = new ArrayList<String>();
		cursos.add("Java");
		//Demais cursos adicionados
		
		cursos.forEach(curso -> System.out.println(curso));
		```

## <a name="lambdas"></a>Lambdas
Antes do Lambda (`->`) eram utilizadas **classes anônimas**.  
* As classes anônimas permitiam que invez de **criarmos uma classe** para receber **um único método**, poderiamos no Construtor da própria classe passar os métodos:
	* Exemplo **sem Classe Anônima**:
		```java
		class ComparadorPorTamanho implements Comparator<String>{
		
			@Override
			public int compare(String s1, String s2) {
				return Integer.compare(s1.length(), s2.length());
			}		
		}
		
		public static void main(String[] args) {
			List<String> cursos = new ArrayList<String>();
			cursos.add("Java");
			
			Comparator<String> comparador = new ComparadorPorTamanho ();
			cursos.sort(comparador);
		}
		```
	* Exemplo **com Classe Anônima**:
		```java
		public static void main(String[] args) {
			List<String> cursos = new ArrayList<String>();
			cursos.add("Java");
			
			Comparator<String> comparador = new Comparator<String>() {
				@Override
				public int compare(String s1, String s2) {
					return Integer.compare(s1.length(), s2.length());
				}
			};
			cursos.sort(comparador);
		}
		```

Lambda veio para **melhorar a Classe Anônima**, de forma que não seja necessário repetir uma grande quantidade de código!
* **PORÉMMM**, temos que prestar atenção na utilização do Lambda - quando/como utilizar ?
	* Utilizaremos quando formos implementar **uma interface que possui UM ÚNICO método** (chamado de Interface Funcional) , sendo que:
		* Será necessário por entre `{ } ` quando tiver **mais de um método**;
		* Não utilizar `{ }` quando tiver **1 método**;
		* Não precisa dar `return`;
		* Quando tiver **+1 argumento**, deve estar entre `(s1, s2)`;
		* Quando tiver **1 argumento**, não é necessário por entre `()`;

Exemplo acima **com Lambda**:
```java
/*		SEM LAMBDA
Comparator<String> comparador = new Comparator<String>() {
	@Override
	public int compare(String s1, String s2) {
		return Integer.compare(s1.length(), s2.length());
	}
};
*/		

//		COM LAMBDA
cursos.sort((s1,s2) -> Integer.compare(s1.length(), s2.length()));
//    OU
cursos.sort(Comparator.comparing(s -> s.length()));
```
* **_Interface Funcional -> É toda interface com um único método;_**
	* Lambda funciona para estas classes, pois o Java sabe que somente aquele único método será implementado;

## <a name="methodreference"></a>Método de Referência
Um Método de Referência é utilizado para **simplificar** ainda mais um **lambda**. Mais especificamente, iremos avisar ao Java, que queremos um método da Classe Tal.
* Exemplo, a classe `String` possui o método `length()`. Utilizando o método de referência, iremos deixar neste formato: `(String::length)`!
	```java
	//	COM LAMBDA
	cursos.sort(Comparator.comparing(s -> s.length()));
	
	//	COM MÉTODO DE REFERÊNCIA
	cursos.sort(Comparator.comparing(String::length));
	
	//-------------------------------------------------------
	//	COM LAMBDA
	cursos.forEach(curso -> System.out.println(curso));
	
	//	COM MÉTODO DE REFERÊNCIA
	cursos.forEach(System.out::println);
	```
	* **PORÉMMM** o método de referência só podem **instanciar um único método**, caso seja necessário invocar dois métodos, terá de ser utilizado o lambda.
		* Exemplo, queremos imprimir o nome dos cursos (não o objeto)
		```java
		List<Curso> cursos = new ArrayList<Curso>();
		cursos.add(new Curso ("Java"));
		cursos.add(new Curso ("Pyton"));
		
		cursos.forEach(System.out::println); //irá imprimir o objeto Curso
		
		//Como imprimir invés do objeto, imprimir o nome de cada Curso  ??
		cursos.forEach(c -> System.out.println(c.getNome()));
		```
## <a name="streams"></a>Streams
A Interface `Stream`, veio para nos ajudar a "trabalhar" com a interface `Collection (Collections, Lists, Sets)`, nos permetindo a:
* Filtrar;
* Ordernar;
* Mapear;
* Contar;
* Ifs;
* ForEach;

Exemplos de elementos para Stream:
```java
List<String> listOfStrings = Arrays.asList("str1", "str2"); // pode ser feito stream por ser Collection
IntStream.of(1,2,3,4,5,6,7,8,9,10);
IntStream.range(0, 10);
```



### Methods

Dado um Array de `Int`:

```java
int[] numbers = {4,1,13,90,16,2,0};
```

Exemplo métodos Operações intermediarias:

* anyMatch(); - boolean

  * ```java
    IntStream.of(numbers).anyMatch(num -> num % 2 == 1); //tem algum numero impar?
    ```

* allMatch(); - boolean

  * ```java
    IntStream.of(numbers).allMatch(num -> num % 2 == 1); //todos s�o numeros impares?
    ```

* noneMatch() - boolean

  * ```java
    IntStream.of(numbers).noneMatch(num -> num % 2 == 1); //nenhum numero impar?
    ```

* skip(); - Stream/void

  * ```java
    IntStream.of(numbers).skip(3); // pula os 3 primeiros
    ```

* Limit(); - Stream/void

  * ```java
    IntStream.of(numbers).limit(3); //limita a 3
    ```

* Count(); - Long

  * ```java
    IntStream.of(numbers).count(); //Conta número de elementos
    ```

* Distinct() - Stream

  * ```java
    IntStream.of(numbers).distinct(); //retorna somente os elementos não duplicados
    ```

* findFirst();

* sorted();

### Filter - Stream

Alguns exemplos utilizando uma lista de cursos:

```java
List<Curso> cursos = new ArrayList<Curso>();
cursos.add(new Curso("Java", 40));
cursos.add(new Curso("Python", 100));
cursos.add(new Curso("Spring", 110));
cursos.add(new Curso("HTML", 30));
```
Exemplo: quero que seja impresso cursos com a duração >= 100 minutos:
```java
cursos.stream()
	.filter(c -> c.getDuracao() >= 100)
	.forEach(c -> System.out.println(c.getNome()));
```

### Map - Stream

O `map` é utilizado quando queremos alterar a stream:

* O método `map(Curso::getDuracao)` transforma a `Stream<Curso>` em `Stream<Integer>`;

* Exemplo: Quero **receber** (_não imprimir, pois quero trabalhar posteriormente com esses numeros_) o tempo dos cursos com a duração >= 100 minutos:

  ```java
  cursos.stream()
  	.filter(c -> c.getDuracao() >= 100)
  	.map(Curso::getDuracao)
  	.forEach(System.out::println); //o Map ira devolver somente a duracao
  ```

### MapToInt - Int

Quando trabalhamos com soma, inves de utilizar `map`, podemos utilizar o `mapToInt`, que terá métodos como `sum()`:

* Exemplo: quero a soma da duracação dos cursos com +100 minutos;

  ```java
  int sum = cursos.stream()
  		.filter(c -> c.getDuracao() >= 100)
  		.mapToInt(Curso::getDuracao)
  		.sum();
  System.out.println(sum);
  ```

### Collect - List

Quando utilizamos o `stream()`, ele não afeta a lista, ou seja, caso seja feito um filtro, e seja impresso após o stream, não será considerado o filtro! <br><br>Para **guardar o resultado do stream** em um List, por exemplo, podemos utilizar o método `collect`

* Exemplo: guardar em um `List<Curso>` os cursos com duracao de +100 minutos:
	```java
	 List<String> streamToList = cursos.stream()
		.filter(c -> c.getDuracao() >= 100)
		.map(Curso::getNome)
		.collect(Collectors.toList());
	 
	 System.out.println(streamToList);
	```

### AnyMatch - boolean

O `anyMatch` é utilizado para retornar um **boolean**

* Exemplo: retornar se existe a String “X” dentro da Lista

  ```java
  public boolean existeCanetaOuLapis(Orcamento orcamento, String nomeItem) {
      return orcamento.getItens().stream()
          .anyMatch(item -> item.getNome().equals(nomeItem));
  }
  ```

#### Matcher

Quando queremos um anyMatch mais complexo, utilizamos da classe `Matcher`

* Exemplo: verificar se existe um pattern dado uma String

  * ```java
    boolean isAllowed = allAllowedDomains.stream().anyMatch(allowedDomain -> {
      // pattern → E.g.: *ibm.com
      Pattern pattern = Pattern.compile("." + allowedDomain.getEmailDomain(), Pattern.CASE_INSENSITIVE);
      // matcher → E.g.: (domain entered by user) us.ibm.com
      Matcher matcher = pattern.matcher(email);
      // if matches, then is a valid domain
      return matcher.matches();
    });
    ```



### Peek

O `peek` é utilizado para debug, principalmente quando queremos exibir logs.

* Exemplo: Mostre os valores processados:

  * ```java
    IntStream.rangeClosed(1,10)
      .peek(i -> System.out.println('Começando a chamada')) // irá logar
      .mapToObj(i -> new Multiplicador(i * 5))
      .peek(i -> System.out.println('Resultado: ' + i)) //irá logar
      .collect(Collectors.toList());
    ```

* Exemplo: assim como um forEach, o peek pode ser usado para chamar um método:

  * ```java
    IntStream.rangeClosed(1,10)
    	.peek(i -> new SleepUtil(5)) // irá chamar para cada elemento a classe SleepUtil
      .peek(i -> System.out.println('Começando a chamada'))
      .mapToObj(i -> new Multiplicador(i * 5))
    ```

  



## <a name="optional"></a>Optional

Que tal uma classe que evita `null`? que evita MUITOS Ifs? A classe `Optional<E>`, como o nome já diz, retorna "por opção" o objeto ou não _(em caso de o objeto não existir)_. Alguns dos métodos mais utilizados:
* orElse();
* isPresent();

Na prática, quando utilizamos `stream` com um `filter()`, será devolvido um objeto do tipo `Optional`:
```java
Optional<Curso> findAny = cursos.stream()
		.filter(c -> c.getDuracao() >= 100)
		.findAny(); //irá devolver por "opção" um Curso
		//caso não exista um objeto, irá devolver um null

Optional<Curso> cursoOptional= cursos.stream()
		.filter(c -> c.getDuracao() >= 1000) //nao existe curso com esta duração
		.findAny();
			
		System.out.println(cursoOptional); //irá imprimir "Optional.empty"
```
E se quisermos **devolver o objeto em si** e não um tipo Optional? Utilizaremos o método `orElse()`:
```java
Curso curso = cursoOptional.orElse(null);	
```
*	Porém ainda podemos receber um "NullPointerException", para resolver, podemos utilizar o `ifPresent( )`;
	```java
	cursos.stream()
		.filter(c -> c.getDuracao() >= 100)
		.findAny()
		.ifPresent(c -> sysout(c.getNome())); //caso não existe, irá imprimir nada
	```
	O `Optional`  possui variações, como:
* `OptionalDouble`
* `OptionalInt`

Por exemplo, quando o `stream()` resultar em cálculos que podem retornar números "quebrados" (_zero dividido por algo_), poderá ser utilizado um dos Optionals acima!
* Exemplo 5: Calcule a média de duração dos Cursos:
	```java
	OptionalDouble average = cursos.stream()
		.mapToInt(Curso::getDuracao)
		.average();
	 
	 System.out.println(average);
	```
* Exemplo 6: retornar o primeiro Curso com a duracao >100
	```java
	 cursos.stream()
	 	.filter(c -> c.getDuracao() >= 100)
	 	.findFirst()
	 	.ifPresent(c -> System.out.println(c.getNome()));
	 	//Python
	```
* Exemplo 7: retornar o qual é a menor duração
	```java
	 cursos.stream()
	 	.mapToInt(Curso::getDuracao)
	 	.min()
	 	.ifPresent(System.out::println);
	```
## <a name="apidatas"></a>API Datas - LocalDateTime 
A API de Datas do Java, foi implementada após anos utiliznado JODA (**_Java Object Date_**) e facilitará muito a utilização de **data e tempo**. Uma das classes mais utilizadas é:
* LocalDate;
* LocalDateTime;
* LocalTime;
* Period;

### Métodos
* `LocalDate.now()` -> retorna a data de hoje - formato ISO;
* `LocalDate.of(year, month, dayOfMonth)` -> utilizada para criar uma data com determinado ano, mês e dia;
	
	* `LocalDate.of(2020, Month.MAY, 1)`;
* `LocalDate.getYear()` -> retorna o ano da variável
	```java
	LocalDate hoje = LocalDate.now(); //2020-05-01
	LocalDate copa = LocalDate.of(2022, Month.JULY, 2);
	
	int anosFaltantesParaCopa = copa.getYear() - hoje.getYear();
	System.out.println(anosFaltantesParaCopa); //2
	```
* `Period.between(LocalDateOld, LocalDateNew)` -> retorna a quantidade de dias, meses e anos entre duas datas;
	
	* `Period.between(hoje, copa) -> ira retornar P2Y2M1D` 
* `Period.getYear()` -> retorna o ano dentre o periodo dado
	```java
	System.out.println(periodo.getYears() + " anos e " + periodo.getMonths() + " meses");
	```

### Formatador de Datas
Para formatar Datas, utilizamos a Classe `DateTimeFormatter`, que possui inumeros métodos, porém o mais utilizado é o `ofPattern`>
```java
LocalDate copa = LocalDate.of(2022, Month.JULY, 2);

DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyy");
System.out.println(copa.format(formatador));
//01/05/2020 -> data formatada
```

