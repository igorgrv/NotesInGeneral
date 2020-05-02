
# O início com Java
O surgimento do Java veio com padrões que outras linguagens já utilizavam, então, o que torna o Java diferente é a **plataforma**, porquê? <br>
A plataforma Java é:
- Portátil;
- Fácil;
- Segura;
- Amplamente utilizada por outras linguágens;


# Sumário
1. [História](#historia)
2. [Versões/Instalação](#versoes)
	* [Compilando/Rodando primeiro código](#compilando)
3. [IDEs + Java Project](#ides)
4. [Tipos/Variáveis](#tipos)
	* [Casting](#casting)
5. [Condicionais](#condicionais)
6. [Orientação a objetos](#oo)
	* [O que é](#oqueeoo)
	* [Objeto/Instância](#classe)
		* [Referência vs Objeto](#refvsob)
	* [Associação/Composição](#composicao)
	* [Encapsulamento & visibilidade](#encapsul)
	* [Construtores](#construtores)
	* [Static](#static)
	* [Herença](#herenca)
		* [super. ou this.?](#super)
	* [Polimorfismo](#polimorfismo)
	* [Abstract](#abstract)
 7. [Interface](#interface)
 8. [Exceções](#excecoes)
	 * [Try/Catch/Finally](#trycatch)
	 * [Throw new/Throws](#throw)
 9. [JavaDoc](#javadoc)
 10. [Packages](#package)
 11. [Pacotes Java](#classes)
	  * [Java.lang](#lang)
		  * [String](#string)
		  * [Object](#object)
	  * [Java.util](#util)
		  * [Array](#array)
		  * [ArrayList](#arraylist)
			  * [Ordenando Lista](#orderlist)
			  * [Java 8 - Lambda/ForEach](#lambda)
		  * [LinkedList vs ArrayList](#linkedlist)
		  * [Set](#set)
			  * [Aplicando Set a um Modelo](#aplicandoset)
			  * [Set vs List](#setlist)
			  * [Equals e HashCode](#equalshash)
		  * [Map](#map)
	  * [Java.io](#javaio)
		* [Input/Entrada de dados](#inputio)
		* [Output/Saída de dados](#outputio)
		* [Input -> Output](#inputoutput)
		* [Scanner](#scanner)
			* [Parse/Split](#parseando)
			* [String.format](#stringformat)
12. [Wrapper vs Primitivos](#wrapper)
	* [Integer](#integer)
13. [Encode](#encode)
14. [Java 8](#java8)
    * [Default Methods](#defaultmethod)
    * [Lambdas](#lambdas)
    *  [Method Reference](#methodreference)
    *  [Streams](#streams)
      * [Optional](#optional)
    *   [API Datas](#apidatas)
  


# <a name="historia"></a>Um pouco sobre a historia...
James Gosling, este foi o "pai" do Java _(linguagem em si foi criada por um grupo)_. James trabalhava na **Sun Microsystems** que na época era uma start-up que era voltada a trabalhar com Hardware, que na época era o que dava dinheiro! - **_Foi um fracasso_**.
A Sun foi atacar o problema que ocorria na década de 90 - _muitos dispositivos eletrônico  e cada eletrônico precisava de um código fonte, ou seja, para cada televisão/VHS era necessário reescrever o código._ Criaram então um "processador/hardware" que **traduzia** o código para cada tipo de aparelho, **porém** por ser **necessário um hardware novo** para equipamento, se tornou algo que as fabricantes **não queriam!**<br> **Anos depois...** surgiu o BUM da web, então a ideia de uma "máquina virtual/tradutor" se encaixou como **software**, porque agora existiam Sistemas operacionais distintos que caia no mesmo problemas dos hardwares, **cada software precisava de um código distinto para S.O. diferentes**.

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/java.png?raw=true" widht=500 height=200>

- A **JVM** é a máquina virtual, mas o conceito de integração com sistemas existe para várias áreas do Java, como para banco de dados e etc...!

# <a name="versoes"></a>Versões do Java/Instalação
O java teve grandes versões:
- Java 5;
- Java 8;

_A Oracle invez de lançar diversas versões a cada 3 anos, estará lançando versões semestralmente, atualmente está na versão 14._

## Instalando
Devemos prestar atenção ao instalar o Java, pois existe o Java para:
- Rodar aplicações (JRE - Java Runtime Environment = JVM + Bibliotecas);
- Criar aplicações (JDK - Java Development Kit = JRE + Bibliotecas);

1. Baixaremos a [versão JDK](https://www.oracle.com/java/technologies/javase-downloads.html) que irá vir o JRE junto;
2. Devemos instalar no Path do Windows o caminho do Java;
	* Ir até Sistemas > Configurações avançadas > Variáveis de ambiente >  Adicionar diretório c:/Program Files/Java/Jdk/bin;

### <a name="compilando"></a>Compilando/Rodando primeiro código

Com um bloco de notas, escreva o código base e salve como **_.java_**.

```java
public class OlaMundo {
	public static void main (String[] args){
		System.out.println("Olá mundo");
	}
}
```
Entendendo:
*  Os códigos Java, precisam estar dentro de uma **Classe**;
* O `main`é o código principal, será responsável por identar que é o método que será **executável**;

### Compilando...
Para compilar o código, será utilizado o **Prompt de comando**!
* Dicas de navegabilidade pelo prompt:
	* cd -> volta a pasta inicial;
	* cd . . -> volta uma pasta;
	* dir -> desmontra todos arquivos da pasta;
	* type nomeArquivo -> ira abrir o arquivo e exibir o conteudo;
- A JVM não "entende" códigos .java - ela entende códigos **_.class_** - sendo assim é necessário compilar o arquivo .java com o código `javac nomeArquivo.java`;
- Após gerar o `nomeArquivo.class`, poderemos utilizar o comando `java nomeArquivo` para ver o resultado;

# <a name="ides"></a>IDEs
As três maiores IDEs são:
* Eclipse - versão  [Eclipse EE](https://www.eclipse.org/downloads/packages/);
* Netbeans;
* Intellij;

# <a name="tipos"></a>Tipos

O java é uma linguagem **fortemente tipada** (é necessário atribuir 'tipo' as variáveis)!
```java
idade = 37 //Não compila!
int idade = 37 //Agora o Java entende o que é a 'idade'
```
* **bity** -> para números muito pequeno (até 127);
* **short** -> para números pequenos (até 32mil);
* **int** -> para números inteiros (até 2 bilhões);
* **long** -> para números GIGANTES, necessário declar um `l`no final;
	```java
	long numeroGrande = 33238929838L;
	```
* **double** -> para números decimais/com ponto flutuante;
	```java
	//Atenção ao uso do double
	double divisao = 5 / 2 //ira retornar 2.0 pois o Java ira entender que é um inteiro
	double divisaoCerta = 5.0 / 2 //um nº tendo o double, o resultado irá ser double

	//Somar decimais deve se ter atenção!
	double valor1 = 0.1;
	double valor2 = 0.2;
	double total = valor1+valor2;
	//irá dar 0.3000000000004 - para somas de decimais o ideal é utilizar um BigDecimal
	```

## <a name="casting"></a>Casting
	O _casting_ é responsável por "forçar" a troca dos tipos, por exemplo:
	```java
	double salario = 1250.70;
	int valor = salario; 
	//para que ocorra a transformação do salario para valor é necessário realziar um casting

	int valor = (int) salario;
	//resultado: 1250 -> irá perder a precisão
	```
* **char** -> guarda um caracter, para isto é necessário deixar entre asplas simples
	```java
	char letra = 'i';
	```

# <a name="condicionais"></a>Condicionais
## if
Será utilizado para fazer validações "ses" - Ex.:<br>
```java
sysout("Testando o if");
int idade = 20;
if (idade > 18){
	sysout("você tem mais de 18 anos");
} else {
	sysout("você tem menos de 18");
}

//é possível utiliza o if sem as chaves, porém para um único comando
if(idade > 18) sysout("você tem mais de 18 anos");
```
## boolean
O valor em boolean poderá ser **false ou true** e poderá ser utilizado como condicionais:
```java
sysout("Testando o if");
int idade = 20;
boolean acompanhado = true;

if (idade > 18 || acompanhado){
	sysout("você tem mais de 18 anos e esta acompanhado");
} else {
	sysout("você tem menos de 18");
}
```
 * Atenção ao Java, pois ao declarar uma variável, é necessário declarar um valor. **Java não possui valores padrões para variáveis temporárias**;

## switch
O switch é utilizado quando queremos realizar diversos **ifs**;
```java
public class TestaMes {

    public static void main(String[] args) {

        int mes = 13;

        switch (mes) {
            case 1:
                System.out.println("O mês é Janeiro");
                break;
            case 2:
                System.out.println("O mês é Fevereiro");
                break;
            case 3:
                System.out.println("O mês é Março");
                break;
            case 4:
                System.out.println("O mês é Abril");
                break;
            case 5:
                System.out.println("O mês é Maio");
                break;
            case 6:
                System.out.println("O mês é Junho");
                break;
            case 7:
                System.out.println("O mês é Julho");
                break;
            case 8:
                System.out.println("O mês é Agosto");
                break;
            case 9:
                System.out.println("O mês é Setembro");
                break;
            case 10:
                System.out.println("O mês é Outubro");
                break;
            case 11:
                System.out.println("O mês é Novembro");
                break;
            case 12:
                System.out.println("O mês é Dezembro");
                break;
            default:
                System.out.println("Mês inválido");
                break;
        }
    }
}
```

## while
O while é um bloco de repetição que irá repetir até o termino da condição;
```java
int contador = 0;
while(contador <= 10) {
	contador ++;
	sysout(contador);
}
//irá imprimir a sequencia de 1,2,3,...10
```
Ex.: Retorne a somatória de 0...10
```java
int contador = 0;
int total = 0;

while(contador <= 10){
	total =+ contador;
	contador ++;
	/*
	* 1 vez:
		* total = 0
		* contador = 1
	* 2 vez:
		* total = 1
		* contador = 2
	* 3 vez:
		* total = 1 + 2 = 3
		* contador = 3
	*/
}
sysout(total);
```
## for
O `for` costuma ter **3 parâmetros**, sendo:
*	 1º parametro: contador (vale pela 1º vez);
*	2º parametro: condição;
*	3º parametro: o que deve ser executado no final de cada loop;

`for(int contador = 0; contador <=10; contador++)`

Ex.: Tabuada de 1....10
```java
for(int multiplicador = 1; multiplicador <= 10; multiplicador++){
	for(int contador = 0; contador <= 10; contador ++){
		sysout(multiplicador * contador);
		sysout();
		/*
		*	1 vez:
			*	multiplicador = 1
			*	contador = 0
			*	sysout = 0;
		*	2 vez:
			*	multiplicador = 1
			*	contador = 1
			*	sysout = 1
		*	11 vez:
			*	multiplicador = 2
			*	contador = 0
			*	sysout = 0
		*/
	}
	sysout();
}
```
Ex.: imprima um triângulo de asteriscos, começando com 1 asterisco
```java
for(int linha = 1; linha <= 10; linha ++) {
	for(int coluna = 0; coluna < linha; coluna ++) {
		System.out.print("*");				
	}
	System.out.println();
}
```
Ex.: imprima no lugar dos asteriscos os números na sequencia.
```java
/*
 * 1 
 * 12 
 * 123 
 * 1234
 */
for (int linha = 0; linha < 10; linha++) {
	for (int coluna = 0; coluna < 10; coluna++) {
		if (coluna > linha) {
			break;
		}
		System.out.print(coluna + 1);
	}
	System.out.println();
}
```
Ex.: Utilize um laço do tipo for para imprimir todos os múltiplos de 3, entre 1 e 100.
```java
for(int multiplo = 1; multiplo <= 100; multiplo ++) {
	if(multiplo % 3 == 0) {
		System.out.println(multiplo);
	}
}
```

# <a name="oo"></a>Orientação a objetos
## <a name="oqueeoo"></a> O que é a orientação a objetos?
A orientação a objetos veio para resolver problemas de repetibilidade de códigos. <br>_Ex.: imagine que um sistema, com **10 desenvolvedores**, possui diversos formulários que utilizam o CPF do cliente. Em um sistema **procedural** será necessário copiar e colar o mesmo trecho de código para que seja utilizado o campo CPF. Agora, imagine se inves do CPF for utilizado um CNPJ... terá de ser alterado **todas as linhas de código** que utilizam CPF e todos desenvolvedores terão de se atentar!_<br> A proposta da **O.O.** é de fazer **dados/atributos** e **métodos/comportamentos** andarem juntos!

## <a name="classe"></a> Classe
A classe é um **_Tipo_**, ou seja, é a especificação de algo, onde este Tipo conterá atributos e comportamentos.<br>
Ex.: A classe Conta, possui **_atributos_** como:
* saldo;
* agencia;
* numero;
* titular;

**_comportamentos_**, como:
* sacar;
* depositar;

## <a name="objeto"></a>Objeto/Instância
O objeto é uma derivação de uma classe, ou seja, dado uma classe Conta, podemos ter **N objetos/instâncias do tipo Conta**.<br> <br>Como instanciar/criar um objeto e atribuir valores aos atributos?
```java
public class Conta {
	//não poderá ser private neste exemplo, pois não temos getters/setters
	 double saldo;
	 int agencia, numero;
	 String titular;
}

public class criandoObjeto {

	public static void main(String[] args) {
		Conta primeiraConta = new Conta();
		primeiraConta.saldo = 300.0;
		System.out.println("O saldo da conta e: " + primeiraConta.saldo);
	}

}

```
* Utilizando classes os valores **default** para cada atributo será 0 para um int, 0.0 para double e false para boolean - é possível alterar os valores default;

## <a name="refvsob"></a>Referência vs Objeto
Quando um objeto é criado, a variável que é atribuida aquele objeto é chamada **referência**, ou seja, aquela variável não é especificamente um objeto.<br>Podemos perceber esta diferença quando atribuimos outra referência ao mesmo objeto!
```java
Conta primeiraConta = new Conta();
primeiraConta.saldo = 500.0;

Conta segundaConta = primeiraConta;
segundaConta.saldo += 100.0;
sysout("O saldo da PRIMEIRA conta e: " + primeiraConta.saldo); //600
sysout("O saldo da SEGUNDA conta e: " + segundaConta.saldo); //600

//isto ocorre pois temos DUAS REFERENCIAS ao mesmo objeto.
```

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/referencia.png?raw=true" widht=500 height=200>

## <a name="composicao"></a>Associação/Composição de Classes
A associação de classes é feita com a **junção de uma classe dentro de outra**, por exemplo, a classe Conta irá possuir como atributo a **classe Cliente**;
```java
public class Conta {

	 double saldo;
	 int agencia, numero;
	 Cliente titular; //atributo do tipo Cliente
}
```
* ATENÇÃO AO **NullPointerException**
```java
public static void main(String[] args) {
	Conta primeiraConta = new Conta();
	Cliente igor = new Cliente();
	igor.nome = "igor";
	
	System.out.println("O nome do titulo da conta e: " + primeiraConta.titular.nome);
	// irá gerar um nullpointer porque não foi "falado" ao Java que a referência "primeiraConta" possui o objeto "igor"
}

//Maneira correta
public static void main(String[] args) {
		Conta primeiraConta = new Conta();
		primeiraConta.titular = new Cliente();
		primeiraConta.titular.nome = "Igor";
		
		System.out.println("O nome do titulo da conta e: " + primeiraConta.titular.nome);
	}
```
## <a name="encapsul"></a>Encapsulamento/Visibilidade
O ideal é que os atributos não sejam acessados diretamente, devem ser acessados através de métodos, isto é feito através do **Encapsulamento**, utilizando **Getters/Setters**! Para correta utilização, os atributos terão a **Visibilidade privada** e os métodos  terão a **Visibilidade pública**!<br> Ex.: Imagine que uma pessoa que dirige um carro ter que saber detalhes do carro, como qual a quantidade de cilindros do carro, não faz sentido. O usuário só precisa saber dirigir! ou seja, detalhes do carro serão **escondidos**!

```java
public class Conta {

	 private double saldo;
	 private int agencia, numero;
	 private Cliente titular;

	// GETTERS AND SETTERS
	public double getSaldo() {
		return saldo;
	}
	public void setSaldo(double saldo) {
		this.saldo = saldo;
	}
	public int getAgencia() {
		return agencia;
	}
	public void setAgencia(int agencia) {
		this.agencia = agencia;
	}
	public int getNumero() {
		return numero;
	}
	public void setNumero(int numero) {
		this.numero = numero;
	}
	public Cliente getTitular() {
		return titular;
	}
	public void setTitular(Cliente titular) {
		this.titular = titular;
	}
	 
}
```
* CUIDADO COM GETTERS/SETTERS: veja sempre se será necessário, ou se não seria melhor utilizar métodos.<br>No exemplo acima, o saldo possui métodos para  `depositar()` e `sacar()`, ou seja, não precisaria do `setSaldo()`;

* Outro método de saber se irá ser utilizado getters/setters é saber se o parâmetro será "eterno", ou seja, uma vez criado (pelo construtor) não será mais alterado
## <a name="construtores"></a>Construtores
* Por padrão o java instancia um construtor padrão em "branco".
	```java
	public Conta (){
	}
	```
* O Construtor é uma rotina, que é executada uma única vez na construção de um objeto;
* Utilizamos o construtor quando queremos obrigar a utilizar parâmetros na criação de um objeto, como por exemplo, obrigar que _"uma conta só poderá existir se tiver agencia e número"_;
	* Quando criamos um construtor com parâmetros, o **_construtor default_**  deixa de existir! Caso queira utilizar, é necessário cria-lo.
	```java
	//Construtor com parâmetros
	public Conta(int agencia, int numero) {
		this.agencia = agencia;
		this.numero = numero;
	}
	```
## <a name="static"></a>Static
Em um cenário que queremos saber o **total de contas** criadas, ou seja, **total de objetos** instanciados, como fariamos?<br>
Ex.: Utilizando o construtor:
```java
public class Conta {
	private int total;
	
	//Adicionando ao construtor a soma ao iniciar um objeto...
	public Conta(int agencia, int numero) {
		this.total ++; //pertence ao objeto
		sysout("O total de classes instanciadas e: " + total);
		this.agencia = agencia;
		this.numero = numero;
	}
}

//Quando o atributo não é estático, ele pertencerá ao OBJETO, sendo assim toda vez que for criada uma classe, o total será SEMPRE 1, pois pertence ao OBJETO
```
* Os atributos **estáticos** quando implementados em uma classe pertence **A CLASSE** e não mais **AO OBJETO**;
	```java
	public class Conta {
		private static int total;
		
		//Adicionando ao construtor a soma ao iniciar um objeto...
		public Conta(int agencia, int numero) {
			Conta.total ++; //pertence a conta
			sysout("O total de classes instanciadas e: " + total);
			this.agencia = agencia;
			this.numero = numero;
		}
	}
	```
	* porém para devolver a quantidade de classes instanciadas nesse caso, iremos precisar utilizar o **public static getTotal()** - ou seja, para que seja retornar a quantidade, o **o método tem que ser statico também!**
```java
public class Conta {

	//atributos omitidos
	private static int total;

	public Conta(int agencia, int numero) {
		total++;
		//atributos omitidos
	}
	
	public static int getTotal() {
		return Conta.total;
	}
}

public static void main(String[] args) {
	Conta primeiraConta = new Conta(123, 12345);
	Conta segundaConta = new Conta(123, 54321);	
	
	System.out.println("O total de contas e: " + Conta.getTotal());
}
```

## <a name="herenca"></a>Herença
Imagine uma classe que represente o tipo `Funcionario`:
```java
public class Funcionario {
	private String nome, CPF;
	private double salario;

	public double getBonificao(){
		return this.salario * 0.1;
	}
	//construtores + getter/setters
}
```
Após o sistema estar funcionando, surge a classe do tipo `Gerente`
```java
public class Gerente{
	private String nome, CPF;
	private double salario;

	public double getBonificao(){
		return this.salario * 0.3;
	}
	//construtores + getter/setters
}
```
* Note que a única diferença está no método `getBonificao`, ou seja, os **atributos** são idênticos! <br> Mas afinal, o `Gerente` não é também um `Funcionario` ?

Utilizando o conceito de herança o `Funcionario` será a classe chamada de **Classe mãe/Base class/Super class** que irá ter os atributos `nome, CPF e salario` e desta forma as classes chamadas, **classes filhas**, HERDARÃO os atributos da classe mãe! <br>Sendo assim, o `Gerente`irá **_extender_** `Funcionario`!
```java
public class Gerente extends Funcionario{

	public double getBonificao(){
		return this.salario * 0.3;
	}
	//construtores + getter/setters
	//será herdado getters/setters da classe Funcionario também!
}
```
* Obs.: se a classe começar ter muitos `ifs` está na hora de criar uma classe!
* **_Atributos e Métodos_** são herdados juntos, PORÉM o **_construtor_** não! Se faz necessário chamar o construtor manualmente - tem que se ter atenção ao extender uma classe que possua um construtor pré definido!
	```java
	public class Funcionario {

		private String nome, CPF;
		private double salario;
		
		public Funcionario(String nome, String CPF, double salario) {
			super();
			this.nome = nome;
			CPF = cPF;
			this.salario = salario;
		}
		//Getters e Setters
	}

	public class Gerente extends Funcionario {
		//IDE irá informar que será necessário criar o construtor de Gerente com os mesmo atributos
		public Gerente(String nome, String CPF, double salario) {
			super(nome, CPF, salario);
		}
	}
	```

## <a name="super"></a>super. ou this.?
Quando trabalhamos com a herença, notamos que os atributos e métodos são herdados para a classe filha, porém existem alguns padrões a serem seguidos. <br> Quando estamos na classe _filha_ utilizando atributos da classe _mãe_, invés de utilizar o **_this_** temos de usar o **_super_** que irá indicar que aquele atributo que está "acima". Isto vale **não só para atributos, mas para métodos também!**<br> Ex.:
```java
public class Funcionario{
	
	private double salario; //o protected significa que poderá ser acessado pelas classes filhas;	

	public double getBonificacao(){
		return this.salario * 0.1;
	}
	//construtores + getter/setters
}


public class Gerente extends Funcionario{
	
	public double getBonificao(){
		return super.getBonificacao + super.getSalario;
	}
	//construtores + getter/setters
}
```


## <a name="polimorfismo"></a>Polimorfismo

O polimorfismo nada mais é do que a **sobrescrita** de um método em diferentes classes. Sendo amplamente utilizado para deixar de forma "genérica" os métodos, sem ter a necessidade de repetir métodos em várias classes<br>Ex.:
```java
public class Veiculo {
    public void liga() {
        System.out.println("Ligando Veiculo");
    }
}

class Carro extends Veiculo {
    public void liga() {
        System.out.println("Ligando Carro");
    }
}

class Moto extends Veiculo {
    public void liga() {
        System.out.println("Ligando Moto");
    }
}


public static void main(String[] args) {
    Veiculo m = new Moto();
    m.liga();

    Veiculo c = new Carro(); 
    c.liga();
} 

//Irá imprimir:
	//Ligando Moto
	//Ligando Carro
```
## Sobrecarga de métodos
A sobrecarga de um método é como se fosse uma **outra versão do método**! <br> Ex.:
```java
public class Gerente extends Funcionario {

    private int senha;

    public boolean autentica(int senha) {
        if(this.senha == senha) {
            return true;
        } else {
            return false;
        }
    }

    //novo método, recebendo dois params
    public boolean autentica(String login, int senha) {
        //implementacao omitida
    }

    //outros métodos omitidos
}

//Desta forma podemos utilizar o método AUTENTICA passando a senha OU passando senha e login
```

## <a name="abstrata"></a>Classes Abstratas
As **classes abstratas** tem como padrão ser uma classe de **conceito**, por exemplo, em uma empresa se tem `Funcionarios`, onde dentro de funcionarios, teremos: 
* Gerentes;
* Analistas;
* Editores de vídeo e etc;

O funcionário poderia ser uma classe abstrata, porque é uma classe que carrega o conceito do que é um funcionário, ou seja, **é correto criar um objeto chamado Funcionario?** NÃO! Os funcionários precisam ser específicos!
```java
//No cenário acima, não queremos permitir que a classe FUNCIONARIO seja instanciada, mas como?

Funcionario funcionario = new Funcionario(); //ERRADO
Gerente gerente = new Gerente();
Analistas analistas= new Analistas();
```
Para transformar uma classe abstrata, basta informar o `abstract` antes do `class`
```java
public abstract class Funcionario {}

//desta forma não será mais possível instancia-lo
Funcionario funcionario = new Funcionario(); //n funcionara
```

### Métodos Abstratos
Assim como classes abstratas, podemos ter **métodos abstratos**! <br>
Quando implementamos um método abstrato em uma classe, este método **se torna OBRIGATÓRIO** para as **classes filhas**!
*	Os métodos abstratos não possuem corpo! - não há implementação;
*	A classe deve ser abstrata!
```java
public abstract class Funcionario { Funcionario
	public abstract double getBonificacao()
}

public class Gerente extends Funcionario {
	public double getBonificacao(){
		sysout("Bonificacao do gerente");
		return 200.0;
	}	
}

public class Analistas extends Funcionario {
	public double getBonificacao(){
		sysout("Bonificacao do gerente");
		return 100.0;		
	}	
}
```
### Classe Abstrata extends Classe Abstrata?
Imagine o cenário em que a classe abstrata `Funcionario` possui 4 classes filhas, sendo: `Gerente, Diretor, Editor e Analista` e dessas classes filhas, somente o **Gerente e Diretor** possuem uma senha mestre, como implementariamos?
 1. Uma das maneiras seria implementar dentro das classes Gerente e Diretor o método `autenticaFuncionario()`, porém ambas classes teriam o MESMO MÉTODO - **quando classes possuem o mesmo método É SINAL DE REPETIÇÃO**!
 2. Outra maneira seria **cria uma outra classe abstrata** que conteria o método a `autenticaFuncionario()` para que então o Gerente e Diretor extendesse esta classe abstrata e não mais a classe abstrata Funcionário!

# <a name="interface"></a> Interface
Enquanto uma **classe abstrata** pode ter métodos abstratos **ou nao abstratos**, as interfaces possuem **TODOS os métodos abstratos.**
* As interfaces são conhecidas como **_Contratos_**, onde é atribuido métodos que todas as classes que a **_implemente_** tenha os métodos!
* A classe é possível **_extender e implementar_**!
* A classe pode **implementar mais de uma interface** - `public class teste implements interfaceUm, interfaceDois`
* A interface **não pode ter atributos**!

```java
public abstract interface Autenticavel {
	public abstract void setSenha(int senha);
	public abstract boolean autentica(int senha);
}

public class Cliente implements Autenticavel {
	private int senha;
	
	@Override
	public abstract void setSenha(int senha){
		this.senha = senha;
	}
	
	public abstract boolean autentica(int senha){
		if(this.senha == senha){
			return true;
		} else {
			return false;
		}
	}
}

//É POSSÍVEL USAR HERENÇA COM INTERFACE
public class Gerente extends Funcionario implements Autenticavel {
	private int senha;

	private double getBonificao(){
		return super.getSalario();
	}
	
	@Override
	public abstract void setSenha(int senha){
		this.senha = senha;
	}
	
	@Override
	public abstract boolean autentica(int senha){
		if(this.senha == senha){
			return true;
		} else {
			return false;
		}
	}
}
```
* Note que apesar de termos implementar a interface, os métodos `autentica` e senha `setSenha` estão com códigos repetidos, o que também é uma má prática! Como resolver?
	* Quando repetimos código, o segredo é criar uma classe que represente este código! e então podemos chamar esta classe no construtor e utilizar os métodos! ex.:
```java
//Interface
public abstract interface Autenticavel {
	public abstract void setSenha(int senha);
	public abstract boolean autentica(int senha);
}
//-----------------------------------------------------
//Classe Generica
public class AutenticaGeneric {
	private int senha;
	
	public abstract void setSenha(int senha){
		this.senha = senha;
	}
	
	public abstract boolean autentica(int senha){
		if(this.senha == senha){
			return true;
		} else {
			return false;
		}
	}
}
//-----------------------------------------------------
//Classes Gerente e Cliente
public class Gerente extends Funcionario implements Autenticavel {
	
	private AutenticaGeneric autenticador;
	
	public Gerente (){
		this.autenticador = new AutenticaGeneric();
	}
	
	public abstract void setSenha(int senha){
		this.autenticador,setSenha(senha);
	}
	public abstract boolean autentica(int senha){
		this.autenticador,autentica(senha);
	}
}
//-----------------------------------------------------
public class Cliente implements Autenticavel {
	
	private AutenticaGeneric autenticador;
	
	public Cliente  (){
		this.autenticador = new AutenticaGeneric();
	}
	
	public abstract void setSenha(int senha){
		this.autenticador,setSenha(senha);
	}
	public abstract boolean autentica(int senha){
		this.autenticador,autentica(senha);
	}
}
```
# <a name="excecoes"></a>Exceções
## Pilha (stack)
A Pilha(stack) é utilizada pela JVM para poder controlar a ordem dos métodos a serem executados!
* A pilha começa com o código `main`!
```java
public class Fluxo {

    public static void main(String[] args) {
        System.out.println("Ini do main");
        metodo1();
        System.out.println("Fim do main");
    }

    private static void metodo1() {
        System.out.println("Ini do metodo1");
        metodo2();
        System.out.println("Fim do metodo1");
    }

    private static void metodo2() {
        System.out.println("Ini do metodo2");
        for(int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
        System.out.println("Fim do metodo2");        
    }
}
```
Através do **Debugger** é possível acompanhar as execuções do Java, seguindo a pilha!
* F5 entra dentro do método;
	* Cuidado com classes como o `sysout` pois irá entrar dentro da classe System;
* F6 executa o método;
<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/stack.png?raw=true" widht=400 height=400>

## Tratando exceções
Imagine as exceções como `ifs`, onde a exceção é gerada quando **não previmos** um problema, tais como:
* _NullpointerException_;
* _ArithmeticException_ (divisão por zero por exemplo);

```java
private static void metodo2() {
	System.out.println("Ini do metodo2");
	for (int i = 1; i <= 5; i++) {
		System.out.println(i);
		int a = i/0;
	}
	System.out.println("Fim do metodo2");
}
```
<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/arithmetic.png?raw=true" widht=400 height=300>

## <a name="trycatch"></a>Try/Catch/Finally
Um meio de tratar as exceções é utilizando o bloco `Try{} Catch(Excepction){}`!
1. Dentro do **_Try_** o código irá tentar executar o código e em caso de erro irá para o **_Catch_** ;
2. O Catch espera receber um **tipo de exceção** que ele deve tratar e caso ocorra a exceção, devemos avisar o java o que fazer!
	```java
	try {
		int a = i/0;
	} catch (ArithmeticException e) {
		System.out.println("Deu erro na conta: " + e);
	}
	```
	O código não parou mais, apenas informou que houve uma exceção
	<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/trycatch.png?raw=true" widht=400 height=300>
	* Um módo de não ficar esse monte de código de exceção, é utilizar o `e.getMessage()` - ira apenas aparecer `ArithmeticException / by zero`!

* Podemos ter **mais de um catch**! Basta adicionar um 'pipe' ao lado da exceção
	```java
	try {
		int a = i/0;
	} catch (ArithmeticException | NullPointerException e) {
		System.out.println("Deu erro na conta: " + e);
	}
	```
### Finally
O finally é utilizado como um bloco que será **sempre** executado, **não importa** se entrou no **Catch**. Um bom exemplo é quando abrimos e fechamos a conexão com o banco de dados!

```java
Conexao con = null;
try {
	con = new Conexao();
	con.leDados();
} catch (IllegalStateException e) {
	System.out.println("Deu erro na conexao: " + e);
} finally {
	con.close();
}
```

## <a name="throw"></a>Throw new/Throws
Comumente através do bloco `Catch` é lançada a exceção através do código `throw`! Desta forma o método que esta sendo executado **termina** , como um **break**!
```java
throw new ArithmeticException("Deu erro na conta").
```
O código acima, irá fazer o mesmo que o bloco abaixo:
```java
 catch (ArithmeticException | NullPointerException e) {
	System.out.println("Deu erro na conta: " + e);
}
```

# <a name="package"></a>Packages
O pacote vem com o intuito de organizar as classes, para que não fique tudo misturado/bagunçado!
### Como criar?
Basta selecionar a pasta `src` e clicar com o botão direito > new > package!
* Quando um package é criado, as classes que **não estão** no mesmo package irão pedir para realizar um `import`!
* Por convenção, os pacotes são iniciados como sites: **_br.com.igor.projetox_**!
* Quando classes estão no pacote **_default package_**, apenas classes do mesmo pacote podem acessar as informações;

### Modificador de acesso - package
Assim como os modificadores, `private e public`, existe o modificador de acesso `package`.
* Se uma classe esta dentro de um pacote, por padrão **se não informarmos** o modificador o modificador será `package` - porém este modificador não permite que outros pacotes tenham acesso **nem mesmo se extender**!

# <a name="javadoc"></a>JavaDoc
O JavaDoc é complemento do Java responsável por gerar uma documentação do projeto, baseado nas anotações que são feitas!

#### Como gerar?
* Caso não tenha anotações no projeto não irá aparecer a opção!
```java
/**
* @author igor
*/
public class xxxxxx {}
```
* Somente classes/membros públicos são possíveis de serem contemplados!

No Eclipse -> Project -> Generate JavaDoc -> selecione o projeto -> finish!
Será criado uma pasta `doc`, com um **index.html**

## Anotações
-   `@author`  (usado na classe ou interface)
-   `@version`  (usado na classe ou interface)
-   `@param`  (usado no método e construtor)
-   `@return`  (usado apenas no método)
-   `@exception`  ou  `@throws`  (no método ou construtor)
-   `@see`
-   `@since`
-   `@serial`
-   `@deprecated`

# <a name="jar"></a>Jar
Imagine que queremos passar o projeto para outra equipe, teriamos que sair **copiando e colando?** Não! O `.jar` - **_java archive_** - é um código copilado, ou seja, em um único arquivo terão todos as classes e etc...

## Como exportar/gerar o Jar?
Clique com o botão direito no **projeto** > Export > Java > Jar file > Selecionar o conteudo que desejar > finish.

## Como importar/usar o Jar?
Importe o .jar para a pasta lib > clique com direito no .jar > build path > add to the build path!
Desta forma será possível utilizar as classes e etc...

# <a name="classes"></a>Pacotes Java
## <a name="lang"></a>Java.lang
O java.lang é o **único pacote** do java não é importado! É um dos **mais importantes** pacoste dos java! 
* As classes `String` e `System` pertence, a ele - utilizada no **método main**.
* Exceções também vem dele - `Exception`, `RuntimeException`, `NullPointerException` ou `ArithmeticException`.


### <a name="string"></a>String
A primeira dúvida ao começar usar a classe String, é **porque não damos `new` na String?** Sendo que é uma classe e damos uma referência?<br> O java fez desta forma para **facilitar** nossa vida, porém seria a mesma:
```java
String nome = "Java";
String nome = new String("Java");
```

**Métodos importantes** (os métodos podem ser encontrados no JavaDoc):<br>
* **String não pode ser alterada**, para que seja alterada, é necessário **criar outra String** referenciando a antiga!
	* `replace(char old, char new)` - substitui;
		```java
		String nome = "Java";
		String newNome = nome.replace('v', 'c');
		System.out.println(newNome); //Jaca
		```
	* `replaceAll(String x, String y)` - substitui todos caracteres encontrados
		```java
		String nome = "I1G2O3R";
		String newNome = nome.replaceAll("[^0-9]+", "");
		System.out.println(newNome); //123
		```
	* `toUpperCase()` - maísculo
		```java
		String nome = "Java";
		String nomeMaisculo = nome.toUpperCase();
		System.out.println(nomeMaisculo); //JAVA
		```
	* `charAt(int x)` - retorna posição caracter selecionado
		```java
		String nome = "Java";
		char charAt = nome.charAt(1);
		System.out.println(charAt); //a
		```
	* `indexOf(int x)` - inverso do charAt, devolve a posição
		```java
		String nome = "Java";
		int indexOf = nome.indexOf("v");
		System.out.println(indexOf); //2
		```
	* `substring(int x)` - retorna o resto da String a partir da posição selecionada
		```java
		String nome = "Treinando Java";
		String substring = nome.substring(5);
		System.out.println(substring); //ando Java
		```
	* `substring(int beginIndex, int endIndex)` - permite retornar pedaços da String definidos pelo inicio e fim
		```java
		String nome = "Treinando Java, porem esta string esta grande";
		String substring = nome.substring(0,15);
		System.out.println(substring); //Treinando Java,
		```
	* `lenght()` - retorna a quantidade de caracteres
		```java
		String nome = "Treinando Java";
		System.out.println(nome.length()); //14
		
		for (int i = 0; i < nome.length(); i++) {
			System.out.println(nome.charAt(i));
		}
		/**
		*A
		*L
		*U
		*R
		*A
		*/
		```
	* `isEmpty()` - retorna um boolean se está vazio ou não
		```java
		String nome = "";
		System.out.println(nome.isEmpty()); //true
		```		
	* `trim()` - retira espaços desnecessários, como " "
		```java
		String nome = " Igor    ";
		String nomeSemEspaco = nome.trim();
		System.out.println(nomeSemEspaco); //Alura
		```		
	* `contains(String x)` - retorna boolean p /verificar se contém a String
		```java
		String nome = " Igor   ";
		System.out.println(nome.contains("Ig"); //true
		```		

	**StringBuilder**
	O StringBuilder é utilizado para concatenar Strings
	```java
	StringBuilder builder = new StringBuilder("Igor");
	builder.append(" Gomes");
	builder.append(" Romero");
	builder.append(" Vilela");
	String texto = builder.toString();
	System.out.println(texto); //Igor Gomes Romero Vilela
	```

### <a name="object"></a> Object
A classe Object, é a **CLASSE MÃE**, todas as classes do Java provém dela! 
* A classe Object é utilizada como um padrão  **generico!** , ou seja se definirmos que um método recebe um tipo `Object`, significa que qualquer tipo poderá ser utilizado!
	* o método `System.out.println()` recebe um Object, pois nele podemos declarar qualquer tipo de referência!

**Método importante** :
* `toString()` - este método retorna uma String que se refere a Classe!
	```java
	public class Conta {
		private int numero, conta;
		
		@Override
		public String toString(){
			return "A conta: " + this.numero + " tem dinheiro";
		}
	}

	public static void main(String[] args) {
		Conta cc = new Conta();
		cc.setNumero = 123;
		sysout(cc);
		//A conta: 123 tem dinheiro
	}
	```

# <a name="util"></a>Java.util
## <a name="array"></a>Array
O Array **é um objeto** que representa um **conjunto de dados**! <br>Ex. **_sem array_**: Imagine ter de representar um conjunto com 5 idades:
```java
int idade1 = 10;
int idade2 = 12;
int idade3 = 14;
int idade4 = 16;
int idade5 = 18;
```
Ex. **_com array_**:
```java
int idades [] = new int[5];

//Se o array não for atribuido nenhum valor, será atribuido 0 (por ser int)
idades[0] = 10;
idades[1] = 12;
idades[2] = 14;
idades[3] = 16;
idades[4] = 18;

//Ou, de uma forma menos literal
int idades2 [] = {10,12,14,16,18};
```
* Caso tentassemos atribuir o `idades[10]` iria gerar uma **exceção** `ArrayIndexOutOfBoundsException`;
* Por utilizar array, temos métodos e vantangens!
	* Método `length`:
	```java
	sysout(idades.length); // length -> irá devolver a quantidade de registros
	
	for(int i = 0; i<idades.length; i++){
		idades[i] = i*i;
		System.out.println(idades[i]);
	}
	// irá imprimir a sequencia de 0,1,4,9,16
	```

### Array de referência
Quando criamos um array de uma classe, chamamos este array de **referência**. - _no exemplo acima, haviamos criado um array de um tipo primitivo (int)_.
```java
ContaCorrente contas [] = new ContaCorrente[2]; 
//contas é um objeto do tipo array que guarda objetos do tipo ContaCorrente

ContaCorrente c1 = new ContaCorrente(22,12345);
contas[0] = c1;

sysout(contas[0].getNumero); //irá imprimir 22
```
* Não é uma boa prática ficar colocando as posições do array - como `contas[0] = c1`. Poderiamos criar uma classe que no construtor será adicionado os objetos e assim vão ir sendo acrescentados ao array:
	```java
	public class GuardaContas {
		private Conta[] referencias;
		private int posicaoLivre = 0;

		public GuardaContas() {
			this.referencias = new Conta [10]
		}

		public void adiciona(Conta ref){
			this.referencias[this.posicaoLivre] = ref;
			this.posicaoLivre++;
		}
	}

	//------------------------------------------------------------
	public static void main (String[] args){
		GuardaContas guardador = new GuardaContas();

		Conta cc = new ContaCorrente(22,11);
		guardador.adiciona(cc);

		Conta cc2 = new ContaCorrente(22,11);
		guardador.adiciona(cc2);
	}
	```
## <a name="arraylist"></a>ArrayList/List
O `ArrayList` é o **mais utilizado nos dias de hoje**.  ArrayList, implementa a interface `List`;
* Por padrão o ArrayList não tem limite de posições (depende somente do limite de memoria da JVM), ou seja, não precisamos definir a quantidade;
	* Caso deseje, é possível definir o tamanho através do construtor `new ArrayList(x)`
* Possui **métodos mais simples** do que o Array;
	* `add`-> adiciona objeto a lista;
		* _quando adicionado é adicionado ao final do ArrayList;_
	* `remove`-> remove objeto da lista;
		* _quando removido, o ArrayList reorganiza as referencias, sempre jogando do último para o primeiro;_
	* `size`-> é igual ao `length`, ira exibir o tamanho do array;
	* `contains(object)`-> verifica se o objeto existe na lista
		* _internamente o contains, utiliza o método `equals` da classe Object, que verificar se o objeto esta na lista;_
	* `get(index)`-> retorna o objeto que esta na referencia selecionada;

Exemplo criação ArrayList **Genérico**:
```java
public static void main(String[] args) {
	ArrayList contas = new ArrayList();
	
	Conta cc = new Conta(2050, 12345);
	Conta cc2 = new Conta(2222, 22222);
	contas.add(cc);
	contas.add(cc2);
	
	System.out.println(contas);
	//[Conta [agencia=2050, numero=12345], Conta [agencia=2222, numero=22222]]
	
	System.out.println(contas.get(1));
	//Irá imprimir o objeto da referencia 1, no caso o cc2
	
	Conta cc3 = new Conta(2222, 22222);
	System.out.println(lista.contains(cc3));
	//Irá imprimir false, pois a referencia cc3 não está na lista

	contas.remove(0); //remove(posicao)
	System.out.println(contas.size());
	//Irá imprimir 1
	
	//Outro metodo de exibir as contas
	
	//for(Tipo objeto: listaObjeto)
	for (Object conta : contas) {
		System.out.println(conta);
	}
}
```
O problema de se criar um ArrayList Genérico, é de que qualquer tipo poderá ser inserido na lista, o que pode resultar em `ClassCastException`.
* Para criar um **ArrayList** de um **tipo específico**, devemos incluir na criação, com `ArrayList<SuaClasse> lista = new ArrayList<SuaClasse>();`
	* Dessa forma, o exemplo acima ficaria:
		```java
		public static void main(String[] args) {
			ArrayList<Conta> contas = new ArrayList<Conta>();
			
			Conta cc = new Conta(2050, 12345);
			Conta cc2 = new Conta(2222, 22222);
			contas.add(cc);
			contas.add(cc2);

			for (Conta conta : contas) { //Conta sendo especificada
				System.out.println(conta);
			}
		}
		```

Agora que conhecemos o ArrayList e a Interface List, podemos **transformar** um Array em um List, através da classe **_java.util.Arrays_**.<br>`List<String> argumentos = Arrays.asList(args);`

## <a name="orderlist"></a>Ordenando Lista
### Com Collections - Para Strings
A Classe `Collections`, possui o método `sort` que irá utilizar por padrão o **alfabeto** para ordernar os valores:
```java
String java = "Java";
String spring = "Spring";
String bancoDeDados = "Banco de Dados";
String angular = "Angular";

List<String> aulas = new ArrayList<String>();
aulas.add(java);
aulas.add(spring);
aulas.add(bancoDeDados);
aulas.add(angular);

//MÉTODO PARA ORDENAR
Collections.sort(aulas);

aulas.forEach(aula -> {
	System.out.println("Aula: " + aula);
});
```
### Com ComparaBLE - Para Classes criadas
A Interface `Comparable`, possui o método `compareTo`, onde poderemos passar o objeto para realizar a comparação.
```java
public class Aula implements Comparable<Aula>{
	private String curso;
	
	@Override
	public int compareTo(Aula aula) {
		return this.curso.compareTo(aula.curso);
	}
}
//methodo main
List<Aula> aulas = new ArrayList<Aula>();
aulas.add(new Aula("Java"));
aulas.add(new Aula("Spring"));
aulas.add(new Aula("Banco de Dados"));
aulas.add(new Aula("Angular"));

Collections.sort(aulas);

aulas.forEach(aula -> {
	System.out.println(aula);
});
```
### Com ComparaTOR - Para Classes criadas
Utilizando a classe List, temos como ordernar os valores da lista, utilizando o método `sort`, porém este método irá requerer um `Comparator`;
* **Comparator** é uma interface que implementa o método `compare`. Este método é responsável por receber o "tipo" de comparação, ou seja, **_eu vou comparar o que com o que?_**
```java
class NumeroDaContaComparator implements Comparator<Conta> {
	
	//Com argumentos
    @Override
    public int compare(Conta c1, Conta c2) {
        if(c1.getNumero() < c2.getNumero()){
			return -1;
		}
		 if(c1.getNumero() > c2.getNumero()){
			return 1;
		}
		return 0;
    }

	//Forma "natural"
	@Override
    public int compare(Conta c1, Conta c2) {
        return Integer.compare(c1.getNumero(), c2.getNumero());
    }
}


//----------------------------------------------------------------
public static void main (String[] args){
	Conta cc1 = new ContaCorrente(22, 33);
	cc1.deposita(333.0);

	Conta cc2 = new ContaPoupanca(22, 44);
	cc2.deposita(444.0);

	List<Conta> lista = new ArrayList<>();
	lista.add(cc1);
	lista.add(cc2);

	for (Conta conta : lista) {
	    System.out.println(conta);
	}

	NumeroDaContaComparator comparator = new NumeroDaContaComparator();
	lista.sort(comparator);

	System.out.println("---------");

	for (Conta conta : lista) {
	    System.out.println(conta);
	}
}
```
### Com Comparator & Comparable
Com a classe implemetando o `Comparable`, podemos implementar também a interface `Comparator`;
```java
Curso java = new Curso("Java");
java.adiciona(new Aula("Java", 10));
java.adiciona(new Aula("Spring", 40));
java.adiciona(new Aula("Banco de Dados", 30));
java.adiciona(new Aula("Angular", 60));
		
List<Aula> aulas = java.getListaAulas();

Collections.sort(aulas);

System.out.println("Ordenando alfabeticamente");
aulas.forEach(aula -> {
	System.out.println(aula);
});

System.out.println("-----------------------");
System.out.println("Ordenando pela duracao");

aulas.sort(Comparator.comparing(Aula::getDuracao));
aulas.forEach(aula -> {
	System.out.println(aula);
});


Ordenando alfabeticamente
Curso: Angular - Duracao: 60
Curso: Banco de Dados - Duracao: 30
Curso: Java - Duracao: 10
Curso: Spring - Duracao: 40
-----------------------
Ordenando pela duracao
Curso: Java - Duracao: 10
Curso: Banco de Dados - Duracao: 30
Curso: Spring - Duracao: 40
Curso: Angular - Duracao: 60
```

### <a name="lambda"></a>Java 8 - Lambda/ForEach
O uso do lambda, vem para simplificar métodos! Mas como? Utilizando `->`<br> <br>Ordenando lista:<br> 
* Com **for**:
	```java
	@Override
	public int compare(Conta c1, Conta c2) {
	    return Integer.compare(c1.getNumero(), c2.getNumero());
	}
	   
	NumeroDaContaComparator comparator = new NumeroDaContaComparator();
	lista.sort(comparator);

	for (Conta conta : lista) {
	    System.out.println(conta);
	}
	```
* Com **forEach + Lambda**:
	```java
	lista.sort( (c1,c2)	-> {
		Integer.compare(c1.getNumero(), c2.getNumero())
	});

	lista.forEach(conta -> {
		System.out.println(conta)
	});
	```
<br>Adicionando total:<br> 
* Com **for**:
	```java
	//Classe curso
	private List<Aula> listaAulas = new ArrayList<Aula>();
	
	public int getDuracaoTotal() {
		for(Aula aula: listaAulas) {
			this.duracaoTotal += aula.getDuracao();
		}
		return duracaoTotal;
	}
	```
* Com **forEach + Lambda**:
	```java
	//Classe curso
	private List<Aula> listaAulas = new ArrayList<Aula>();
	
	public int getDuracaoTotal() {
		return this.listaAulas.stream().mapToInt(Aula::getDuracao).sum();
	}
	```


## <a name="linkedlist"></a>LinkedList vs ArrayList
A LinkedList também implementa a interface `List`, então qual é a **diferença entre a LinkedList e ArrayList?**
* A LinkedList utiliza pontos flutuantes, ou seja, quando adicionamos/removemos um elemento da lista, **automaticamente as posições se ordenam**;
	* O ArrayList,  quando adicionamos/removemos um elemento da lista ele irá mover cada posição, ou seja, **se removermos a posição 10** a ArrayList, irá jogar o array 11 para posição 10, o 12 para 11 e assim em diante...
* O LinkedList quando queremos "procurar" uma posição, irá verificar posição a posição, ou seja, se queremos dar um `get(10)`, ele irá verificar a posição 1, depois 2, depois 3 e assim em diante.
	* O ArrayList, por implementar Arrays, irá direto até a posição 10;

## <a name="set"></a>Set (Conjunto)
O `Set`é uma interface que herda de `Collection`, assim como o `List`!
* A implementação do Set, é feita através do `HashSet<>()`;
	```java
	Set<String> testes = new HahSet<>();
	```
* Por herdar a interface `Collection`, possui o métodos como `contains` - igual a um List;
	```java
	Set<String> testes = new HahSet<>();
	testes.add("Teste A");
	testes.add("Teste B");
	
	boolean contains = aulasSet.contains("Teste A");
	System.out.println(contains); //TRUE
	```
* Pode se **adicionar elementos** ao Set, assim como é feito na List;
	```java
	Set<String> testes = new HahSet<>();
	testes.add("Teste A");
	testes.add("Teste B");
	testes.add("Teste C");
	testes.add("Teste C");
	sysout(testes);
	
	//irá imprimir:
	C
	A
	B
	```
O que houve com a order do `add` ? Por que não foi exibido o segundo elemento `Teste C`? A **diferença** entre um `List` e um `Set`:
* O Set não adiciona os elementos a uma lista, ele simplesmente os "joga em um saco" de elementos do mesmo tipo, ou seja, ele não se preocupa com ordenação;
* O Set não permite que elementos **repetidos** sejam adicionados! 
* O Set é **muito mais rápido para efetuar buscas** do que uma Lista;

### <a name="aplicandoset"></a>Aplicando Set a um Modelo
Um exemplo de uso do `Set` em uma classe!
```java
public class Aluno {
	
	private String nome;
	private int numeroMatricula;
	
	public Aluno(String nome, int numeroMatricula) {
		this.nome = nome;
		this.numeroMatricula = numeroMatricula;
	}
	//getters, setters e toString
}

//--------------------------------------------
public class Curso implements Comparable<Curso> {

	//demais atributos
	private Set<Aluno> alunos = new HashSet<Aluno>();
	
	public Set<Aluno> getAlunos() {
		return alunos;
	}
	
	public void adicionaAluno(Aluno aluno) {
		this.alunos.add(aluno);
	}

	//getters, setters e demais metodos
}

//--------------------------------------------
//Adicionando Aluno dentro de curso...
public static void main(String[] args) {
	Curso java = new Curso("Java");
	java.adiciona(new Aula("Java", 10));
	
	Aluno a1 = new Aluno("Igor", 709853);
	Aluno a2 = new Aluno("Stephanie", 714002);
	Aluno a3 = new Aluno("Augusta", 623545);
	
	java.adicionaAluno(a1);
	java.adicionaAluno(a2);
	java.adicionaAluno(a3);
	
	System.out.println("Alunos matriculados: ");
	java.getAlunos().forEach(aluno -> {
		System.out.println(aluno);
	});

}
```

### <a name="setlist"></a>Set vs List
Para demonstrar a diferença entre a busca de elementos, com Set e List, vamos utilizar o código abaixo:<br><br>
Com ArrayList:
```java
public static void main(String[] args) {
	Collection<Integer> numeros = new ArrayList<Integer>();
	long inicio = System.currentTimeMillis();

	for (int i = 0; i <= 50000; i++) {
		numeros.add(i);
	}
	for (Integer numero : numeros) {
		numeros.contains(numero);
	}

	long fim = System.currentTimeMillis();
	long tempoDeExecucao = fim - inicio;

	System.out.println("Tempo gasto: " + tempoDeExecucao);

}

//Tempo gasto: 1044
```
Com Set:
```java
public static void main(String[] args) {
	Collection<Integer> numeros = new HashSet<>();
	long inicio = System.currentTimeMillis();

	for (int i = 0; i <= 50000; i++) {
		numeros.add(i);
	}
	for (Integer numero : numeros) {
		numeros.contains(numero);
	}

	long fim = System.currentTimeMillis();
	long tempoDeExecucao = fim - inicio;

	System.out.println("Tempo gasto: " + tempoDeExecucao);

}

//Tempo gasto: 18
```
## <a name="equalshash"></a>Equals e HashCode
Utilizando a maior vantagem do Set, que é a busca de elementos, temos os métodos `Equals` e `HashCode`. Onde é **necessário implementar ambos métodos para o correto funcionamento!** <br><br>
Quando buscamos uma referência, através do método `contains`, temoscomo passar um objeto e perguntar se aquele objeto já existe lá dentro:
```java
public class Curso implements Comparable<Curso> {
	private Set<Aluno> alunos = new HashSet<Aluno>();
	
	public boolean alunoEstaMatriculado(Aluno a1) {
		return this.alunos.contains(a1);
	}
}

//------------------------------------------------
public static void main(String[] args) {
	Curso java = new Curso("Java");
	Aluno a1 = new Aluno("Igor", 709853);
	
	java.adicionaAluno(a1);
	
	System.out.println("O aluno A1 está matriculada? " + java.alunoEstaMatriculado(a1));
	//IRÁ RETORNAR TRUE, pq a referência A1, de fato existe
}
```
**O problema** é quando utilizamos um formulário WEB por exemplo, inves de passarmos o objeto, passamos uma `String "Igor"` que **irá apontar** para outra referência, ou seja, será "diferente";<br><br>_Veja o exemplo abaixo_:
```java
Aluno a1 = new Aluno("Igor", 709853);
System.out.println("O aluno A1 está matriculada? " + java.alunoEstaMatriculado(a1));

Aluno igor = new Aluno("Igor", 709853);
System.out.println("O a1 é == ao Igor? " + (a1 == igor));
//O a1 é == ao Igor? FALSE
```
Para evitar que o exemplo acima ocorra **precisamos informar** ao Java, o que será considrado **_igual_** em caso de dois objetos possuírem o mesmo atributo!<br><br> Para isto utilizamos o método `equals` - pertence a classe Object - que **será responsável por informar ao Java o atributo que fará com que o objeto seja igual!**
```java
public class Aluno {
	private String nome;
	//getters and setters
	
	@Override
	public boolean equals(Object obj) {
		Aluno aluno = (Aluno) obj;
		return this.nome.equals(aluno.getNome());
	}
}

//------------------------------------------------
public static void main(String[] args) {
	Aluno a1 = new Aluno("Igor", 709853);	
	Aluno igor = new Aluno("Igor", 709853);
	
	System.out.println("O a1 é == ao Igor? " + igor.equals(a1));
	//TRUE!
}
```
**PORÉMMM**, o `Set` utiliza um número "mágico", chamado `Hash`, como se fossem "gavetas", para os objetos, ou seja, o objeto `a1` foi adicionado em uma gaveta com um determinado `Hash` e o objeto `igor`  em outra gaveta com outro `Hash`.<br><br>Como informamos um número `Hash`para que o `Set` saiba onde adicionar os objetos as gavetas corretamente?
* Um dos métodos é adicionando as gavetas **por caracteres**:
	```java
	public class Aluno {
		@Override
		public int hashCode() {
			return this.nome.charAt(0);
		}
	}	
	```
	*	**PORÉMMM**, este é um meio muito simplista, uma vez que as gavetas podem ficar cheias do mesmo caracter, oq torna o `Set` improdutivo...

Para evitar que muitos objetos sejam inserido dentro de uma gaveta, as IDE's possuem um **autogenerate** para o `equals()` e para o `hashCode()`. Veja como foi gerado pelo Eclipse:
```java
@Override
public int hashCode() {
	final int prime = 31;
	int result = 1;
	result = prime * result + ((nome == null) ? 0 : nome.hashCode());
	result = prime * result + numeroMatricula;
	return result;
}

@Override
public boolean equals(Object obj) {
	if (this == obj)
		return true;
	if (obj == null)
		return false;
	if (getClass() != obj.getClass())
		return false;
	Aluno other = (Aluno) obj;
	if (nome == null) {
		if (other.nome != null)
			return false;
	} else if (!nome.equals(other.nome))
		return false;
	if (numeroMatricula != other.numeroMatricula)
		return false;
	return true;
}
```
# <a name="map"></a>Map
A interface `Map<K,V>` é utilizada para mapear chaves com valores!<br>
* Quando for necessário procurar uma Classe baseado em **um atributo**, utilize `Map`!
* Quando for necessário buscar **à Classe** utilize `Set`.

Imagine uma situação, onde temos milhares de objetos dentro de uma lista e então queremos um método que retorne um objeto em específico baseado em um atributo. Exemplo:<br>
* A Classe `Curso` possui uma lista de `Alunos` e queremos, dado o número de matrícula, que retorne o `Aluno` em especifico. Para isso podemos utilizar um **forEach**:
	```java
	public class Curso {
		private Set<Aluno> alunos = new HashSet<Aluno>();
		
		public Aluno buscaAluno(int numeroMatricula) {
			for (Aluno aluno : alunos) {
				if(aluno.getNumeroMatricula() == numeroMatricula) {
					return aluno;
				}
			}
			throw new NoSuchElementException("Aluno nao encontrado");
		}
	}

	//------------------------------------------------
	public static void main(String[] args) {
		Curso java = new Curso("Java");
		Aluno a1 = new Aluno("Igor", 709853);
		
		System.out.println("Qual o aluno possui a matricula 709853? " + java.buscaAluno(709853));
		//Ira retornar o Aluno Igor
	}
	```
	* **PORÉMMM..** imagine ter que olhar Aluno a Aluno!

Com o `Map`, podemos utilizar o mapa para **guardar uma matricula** para um cada **Aluno**. Para isso, ao adicionarmos um Aluno, teremos que utilizar o método `put` para informar qual vai ser a chave e com o método `get` para retornar o Aluno. Veja:
```java
public class Curso {
	//Atributos omitidos
	private Map<Integer, Aluno> matriculaParaAluno = new HashMap<>();

	public void adicionaAluno(Aluno aluno) {
		this.alunos.add(aluno);
		this.matriculaParaAluno.put(aluno.getNumeroMatricula(), aluno);
	}

	public Aluno buscaAluno(int numeroMatricula) {
		return matriculaParaAluno.get(numeroMatricula);
	}
}
```

# <a name="javaio"></a> Java .io
Um dos principais usos do pacote **Java .io**  esta na leitura e tratamento de arquivos!
## <a name="inputio"></a> Input/Entrada de dados
Veja um exemplo de **como importar um arquivo** texto através de três classes io:
* `FileInputStream ` -> faz a leitura do arquivo;
	* Será gerada uma exceção checked caso o arquivo esteja com o nome errado;
* `InputStreamReader `-> transforma os dados do arquivo em bytes;
* `BufferedReader `-> transforma os bytes em String;
	* `.readline` -> devolve a String
```java
public static void main(String[] args) throws IOException {
	FileInputStream fis = new FileInputStream("oi.txt");
	InputStreamReader isr = new InputStreamReader(fis);
	BufferedReader br = new BufferedReader(isr);
	
	String linha = br.readLine();
	while (linha != null) {
		System.out.println(linha);
		linha = br.readLine();
	}	
	
	br.close();
}
//Irá imprimir todas as linhas do arquivo.txt
```

## <a name="outputio"></a>Output/Saída de dados
Para fazer a saída de dados, é bem parecido com a entrada, apenas trocamos **read** -> **write** e **input** -> **output**.
* `FileOutputStream ` -> faz a leitura do arquivo;
	* Será gerada uma exceção checked caso o arquivo esteja com o nome errado;
* `OutputStreamWriter `-> transforma os dados do arquivo em bytes;
* `BufferedWriter `-> transforma os bytes em String;
	* `.write` -> devolve a String
```java
public static void main(String[] args) throws IOException {
	FileOutputStream fis = new FileOutputStream("oi2.txt");
	Writer writer = new OutputStreamWriter(fis);
	BufferedWriter bw = new BufferedWriter(writer);

	bw.write("Testando adicionar uma linha a um arquivo");
	bw.newLine();
	bw.newLine();
	bw.write("Testando adicionar uma linha a um arquivo 2");

	bw.close();
}
//Irá ESCREVER todas as linhas no arquivo2.txt
```
* Um outro método mais fácil é utilizando a classe `FileWriter`:
```java
public static void main(String[] args) throws IOException {

	FileWriter fw = new FileWriter("oiFileWriter.txt");
	fw.write("oi LINHA 1");
	fw.write(System.lineSeparator()); //quebra a linha
	fw.write(System.lineSeparator()); //adiciona nova linha
	fw.write("oi LINHA 2");
	
	fw.close();
}
```

## <a name="inputoutput"></a>Input -> Output
Podemos fazer a leitura do arquivo e gravar aquele conteúdo em um novo arquivo também!
```java
public static void main(String[] args) throws IOException {
	FileInputStream fis = new FileInputStream("oi.txt");
	InputStreamReader isr = new InputStreamReader(fis);
	BufferedReader br = new BufferedReader(isr);
	
	OutputStream fos = new FileOutputStream("oi2.txt");
	Writer writer = new OutputStreamWriter(fos);
	BufferedWriter bw = new BufferedWriter(writer);

	String linha = br.readLine();
	
	while(linha != null) {
		bw.write(linha);
		bw.newLine();
		linha = br.readLine();
	}

	bw.close();
	br.close();
}
```
## <a name="scanner"></a>Scanner
O Scanner pertence ao pacote Java.util, porém é amplamente **usado para leitura de diversos arquivos** e não somente de arquivos textos (.txt) mas para arquivos .csv por exemplo, pois podemos **parsear** os arquivos!<br><br>Exemplo de uso:
```java
public static void main(String[] args) throws IOException {

	Scanner scanner = new Scanner(new File("contas.csv"));
	
	while(scanner.hasNext()) {
		String nextLine = scanner.nextLine();
		System.out.println(nextLine);
	}
	scanner.close();
}
//Irá imprimir
//CC,22,33,Igor Gomes,210.1
//CP,11,55,Igor Romero,1300.98
//CC,22,44,Igor Vilela,350.40
```
### <a name="parseando"></a>Parseando arquivos/Separando valores
Para realizar a quebra por um delimitador, utilizaremos um **novo Scanner** com o método `useDelimiter(",")`, que recebe o tipo de delimitador.
```java
public static void main(String[] args) throws IOException {

	Scanner scanner = new Scanner(new File("contas.csv"));

	while (scanner.hasNext()) {
		String linha = scanner.nextLine();

		Scanner linhaScanner = new Scanner(linha);
		linhaScanner.useDelimiter(",");

		String valor1 = linhaScanner.next();
		int valor2 = linhaScanner.nextInt();
		System.out.println(valor1 + valor2);
		
		linhaScanner.close();

	}
	scanner.close();
}
```
### <a name="stringformat"></a> String.format
Imagine o cenário onde é temos algumas regras de negócio que estabelecem:
* A agência deve ter sempre **4 dígitos** - caso não, preencha com zeros a esquerda;
* O número deve ter sempre **8 dígitos**;
* O saldo deve ter **3 casas decimais** e no **máximo 10 dígitos**;

A Classe String, possui o método `format`, que através de algumas sintaxes podemos formatar números e caracteres!
* `%s` -> indica que o elemento será uma **string**;
* `%d` -> indica que será **int**;
	* `%4d` -> indica que terá um espaço de 4 casas, ou seja, se for preenchido duas casas, será completado com **+2 espaços** a esquerda
	* `%04d`-> será preenchido com 4 casas, mas caso não seja preenchido, será completado com **zeros**;
* `%f`-> indica que se trata de um **double**;
```java
String tipoConta = linhaScanner.next();
int agencia = linhaScanner.nextInt();
int numero = linhaScanner.nextInt();
String titular = linhaScanner.next();
double saldo = linhaScanner.nextDouble();

String formatado = String.format(new Locale("pt", "br"), 
		"%s - %04d %06d - %s - %010.3f", 
		tipoConta, agencia, numero, titular, saldo);

System.out.println(formatado);
```
# <a name="wrapper"></a>Wrapper vs Primitivos
As classes Wrappers, são as classes **orientadas a objeto** do mundo Primitivo;
* Quando ocorre a transformação de um primitvo -> Wrapper, é chamado de **autoboxing** - ocorre automaticamente;
* Quando ocorre a transformação de um Wrapper-> primitvo , é chamado de **unboxing**;
* Classes Wrapper, não possuem `new` para ser instanciada;

Quais são os primitvos e seus Wrappers?
* int -> Integer;
* long -> Long;
* double -> Double;
* boolean -> Boolean
* char -> Character

### <a name="integer"></a>Integer
As classes Wrappers nos ajudam com o mundo orientado a objeto, como por exemplo, quando um formulário é preenchido.<br>Os dados preenchidos de um formulário, em geral, vêm no formato **String**, porém e se for um formulário perguntando a **idade**?
* Para **converter uma String para um Integer**, temos o método abaixo:
	```java
	String stringIdadeForm = "23";
	Integer numero = Integer.valueOf(stringIdadeForm); //autoboxing

	System.out.println(numero.intValue()); //unboxing com o intValue
	//irá imprimir 23

	//ou
	String stringIdadeForm = "23";
	int numero = Integer.parseInt(stringIdadeForm )
	```
	<br>
	
Outro exemplo da utilização de classes Wrapper vs Primitivo:<br> 
* Pense em um sistema de cadastro, onde **a idade não é necessária**, ou seja, caso não seja preenchida devemos **considera-la** `null`.
	```java
	public class Cliente{
		private int idade;
		private String nome;
	}
	```
	O que acontece com esse `int idade`? Caso ele não seja colocado, será retornado `0`!, para contornar este problema deviamos declara-lo como `Integer`.
	```java
	public class Cliente{
		private Integer idade;
		private String nome;
	}
	```
	* Outro grande benefício de utilizar classes Wrappers, estão como já visto acima, nos métodos que ganhamos! **Tipo primitivos não possuem métodos pois não são OBJETOS.**

_"Wrappers, como o `Integer`, são úteis quando precisamos usar nossa variável em coleções ou queremos deixar algum atributo opcional, leia-se, com valor nulo. Já tipos primitivos são ótimos para quando não queremos nulo e para operações matemáticas, pois ocupam pouco espaço na memória, melhorando a performance da sua aplicação."_

## <a name="encode"></a>Encode
Quando trabalhamos com diversos países, alguns problemas de formatação dos caractéres ocorrem, como por exemplo no Brasil, que possímos **acentuações, caracteres especiais e etc**. <br>
* Para resolver este problema foi criada uma tabela chamada, **UNICODE**, que juntou diversos caracteres de vários países;
	* Porém, ainda preciamos de um **tradutor**, chamados **encodings** (ASCII, UTF-8 e etc);

# <a name="java8"></a>Java 8
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

Alguns exemplos utilizando uma lista de cursos:
```java
List<Curso> cursos = new ArrayList<Curso>();
cursos.add(new Curso("Java", 40));
cursos.add(new Curso("Python", 100));
cursos.add(new Curso("Spring", 110));
cursos.add(new Curso("HTML", 30));
```
* Exemplo 1: quero que seja impresso cursos com a duração >= 100 minutos:
	```java
	cursos.stream()
		.filter(c -> c.getDuracao() >= 100)
		.forEach(c -> System.out.println(c.getNome()));
	```
* Exemplo 2: quero **receber** (_não imprimir, pois quero trabalhar posteriormente com esses numeros_) o tempo dos cursos com a duração >= 100 minutos:
	```java
	cursos.stream()
		.filter(c -> c.getDuracao() >= 100)
		.map(Curso::getDuracao)
		.forEach(System.out::println); //o Map ira devolver somente a duracao
	```
	* O método `map(Curso::getDuracao)` transforma a `Stream<Curso>` em `Stream<Integer>`;

;
* Exemplo 3: quero a soma da duracação dos cursos com +100 minutos;
	* Quando trabalhamos com soma, inves de utilizar `map`, podemos utilizar o `mapToInt`, que terá métodos como `sum()`:
	```java
	int sum = cursos.stream()
			.filter(c -> c.getDuracao() >= 100)
			.mapToInt(Curso::getDuracao)
			.sum();
	System.out.println(sum);
	```

Quando utilizamos o `stream()`, ele não afeta a lista, ou seja, caso seja feito um filtro, e seja impresso após o stream, não será considerado o filtro! <br><br>Para **guardar o resultado do stream** em um List, por exemplo, podemos utilizar o método `collect`
* Exemplo 4: guardar em um `List<Curso>` os cursos com duracao de +100 minutos:
	```java
	 List<String> streamToList = cursos.stream()
		.filter(c -> c.getDuracao() >= 100)
		.map(Curso::getNome)
		.collect(Collectors.toList());
	 
	 System.out.println(streamToList);
	```
### <a name="optional"></a>Optional
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
## <a name="apidatas"></a>API Datas