# O início com Java
O surgimento do Java veio com padrões que outras linguagens já utilizavam, então, o que torna o Java diferente é a **plataforma**, porquê? <br>
A plataforma Java é:
- Portátil;
- Fácil;
- Segura;
- Amplamente utilizada por outras linguágens;


## Sumário
1. [História](#historia)
2. [Versões/Instalação](#versoes)
3. [Compilando/Rodando primeiro código](#compilando)
4. [IDEs + Java Project](#ides)
5. [Tipos/Variáveis](#tipos)
	* [Casting](#casting)
6. [Condicionais](#condicionais)
7. [Orientação a objetos](#oo)
	* [O que é](#oqueeoo)
	* [Objeto/Instância](#classe)
		* [Referência vs Objeto](#refvsob)
	* [Associação/Composição](#composicao)
	* [Encapsulamento & visibilidade](#encapsul)
	* [Construtores](#construtores)
	* [Static](#static)


## <a name="historia"></a>Um pouco sobre a historia...
James Gosling, este foi o "pai" do Java _(linguagem em si foi criada por um grupo)_. James trabalhava na **Sun Microsystems** que na época era uma start-up que era voltada a trabalhar com Hardware, que na época era o que dava dinheiro! - **_Foi um fracasso_**.
A Sun foi atacar o problema que ocorria na década de 90 - _muitos dispositivos eletrônico  e cada eletrônico precisava de um código fonte, ou seja, para cada televisão/VHS era necessário reescrever o código._ Criaram então um "processador/hardware" que **traduzia** o código para cada tipo de aparelho, **porém** por ser **necessário um hardware novo** para equipamento, se tornou algo que as fabricantes **não queriam!**<br> **Anos depois...** surgiu o BUM da web, então a ideia de uma "máquina virtual/tradutor" se encaixou como **software**, porque agora existiam Sistemas operacionais distintos que caia no mesmo problemas dos hardwares, **cada software precisava de um código distinto para S.O. diferentes**.

<img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/java.png?raw=true" widht=500 height=200>

- A **JVM** é a máquina virtual, mas o conceito de integração com sistemas existe para várias áreas do Java, como para banco de dados e etc...!

## <a name="versoes"></a>Versões do Java/Instalação
O java teve grandes versões:
- Java 5;
- Java 8;

_A Oracle invez de lançar diversas versões a cada 3 anos, estará lançando versões semestralmente, atualmente está na versão 14._

### Instalando
Devemos prestar atenção ao instalar o Java, pois existe o Java para:
- Rodar aplicações (JRE - Java Runtime Environment = JVM + Bibliotecas);
- Criar aplicações (JDK - Java Development Kit = JRE + Bibliotecas);

1. Baixaremos a [versão JDK](https://www.oracle.com/java/technologies/javase-downloads.html) que irá vir o JRE junto;
2. Devemos instalar no Path do Windows o caminho do Java;
	* Ir até Sistemas > Configurações avançadas > Variáveis de ambiente >  Adicionar diretório c:/Program Files/Java/Jdk/bin;

## <a name="compilando"></a>Compilando/Rodando primeiro código

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

## <a name="ides"></a>IDEs
As três maiores IDEs são:
* Eclipse - versão  [Eclipse EE](https://www.eclipse.org/downloads/packages/);
* Netbeans;
* Intellij;

## <a name="tipos"></a>Tipos

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

	### <a name="casting"></a>Casting
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

## <a name="condicionais"></a>Condicionais

#### if
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
#### boolean
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

#### switch
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

#### while
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
#### for
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

## <a name="oo"></a>Orientação a objetos
### <a name="oqueeoo"></a> O que é a orientação a objetos?
A orientação a objetos veio para resolver problemas de repetibilidade de códigos. <br>_Ex.: imagine que um sistema, com **10 desenvolvedores**, possui diversos formulários que utilizam o CPF do cliente. Em um sistema **procedural** será necessário copiar e colar o mesmo trecho de código para que seja utilizado o campo CPF. Agora, imagine se inves do CPF for utilizado um CNPJ... terá de ser alterado **todas as linhas de código** que utilizam CPF e todos desenvolvedores terão de se atentar!_<br> A proposta da **O.O.** é de fazer **dados/atributos** e **métodos/comportamentos** andarem juntos!

### <a name="classe"></a> Classe
A classe é um **_Tipo_**, ou seja, é a especificação de algo, onde este Tipo conterá atributos e comportamentos.<br>
Ex.: A classe Conta, possui **_atributos_** como:
* saldo;
* agencia;
* numero;
* titular;

**_comportamentos_**, como:
* sacar;
* depositar;

### <a name="objeto"></a>Objeto/Instância
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

### <a name="refvsob"></a>Referência vs Objeto
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

### <a name="composicao"></a>Associação/Composição de Classes
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
### <a name="encapsul"></a>Encapsulamento/Visibilidade
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
### <a name="construtores"></a>Construtores
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
### <a name="static"></a>Static
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

### <a name="super"></a>super. ou this.?
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
### Sobrecarga de métodos
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

#### Métodos Abstratos
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
#### Classe Abstrata extends Classe Abstrata?
Imagine o cenário em que a classe abstrata `Funcionario` possui 4 classes filhas, sendo: `Gerente, Diretor, Editor e Analista` e dessas classes filhas, somente o **Gerente e Diretor** possuem uma senha mestre, como implementariamos?
 1. Uma das maneiras seria implementar dentro das classes Gerente e Diretor o método `autenticaFuncionario()`, porém ambas classes teriam o MESMO MÉTODO - **quando classes possuem o mesmo método É SINAL DE REPETIÇÃO**!
 2. Outra maneira seria **cria uma outra classe abstrata** que conteria o método a `autenticaFuncionario()` para que então o Gerente e Diretor extendesse esta classe abstrata e não mais a classe abstrata Funcionário!

## <a name="interface"></a> Interface
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
## <a name="excecoes"></a>Exceções
### Pilha (stack)
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

### Tratando exceções
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

### <a name="trycatch"></a>Try/Catch/Finally
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
#### Finally
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

### <a name="throw"></a>Throw new/Throws
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

## <a name="package"></a>Packages
O pacote vem com o intuito de organizar as classes, para que não fique tudo misturado/bagunçado!
#### Como criar?
Basta selecionar a pasta `src` e clicar com o botão direito > new > package!
* Quando um package é criado, as classes que **não estão** no mesmo package irão pedir para realizar um `import`!
* Por convenção, os pacotes são iniciados como sites: **_br.com.igor.projetox_**!
* Quando classes estão no pacote **_default package_**, apenas classes do mesmo pacote podem acessar as informações;

#### Modificador de acesso - package
Assim como os modificadores, `private e public`, existe o modificador de acesso `package`.
* Se uma classe esta dentro de um pacote, por padrão **se não informarmos** o modificador o modificador será `package` - porém este modificador não permite que outros pacotes tenham acesso **nem mesmo se extender**!

## <a name="javadoc"></a>JavaDoc
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

#### Anotações
-   `@author`  (usado na classe ou interface)
-   `@version`  (usado na classe ou interface)
-   `@param`  (usado no método e construtor)
-   `@return`  (usado apenas no método)
-   `@exception`  ou  `@throws`  (no método ou construtor)
-   `@see`
-   `@since`
-   `@serial`
-   `@deprecated`

## <a name="jar"></a>Jar
Imagine que queremos passar o projeto para outra equipe, teriamos que sair **copiando e colando?** Não! O `.jar` - **_java archive_** - é um código copilado, ou seja, em um único arquivo terão todos as classes e etc...

#### Como exportar/gerar o Jar?
Clique com o botão direito no **projeto** > Export > Java > Jar file > Selecionar o conteudo que desejar > finish.

#### Como importar/usar o Jar?
Importe o .jar para a pasta lib > clique com direito no .jar > build path > add to the build path!
Desta forma será possível utilizar as classes e etc...

## <a name="classes"></a>Pacotes Java
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

## <a name="util"></a>Java.util
### <a name="array"></a>Array
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

#### Array de referência
Quando criamos um array de uma classe, chamamos este array de **referência**. - _no exemplo acima, haviamos criado um array de um tipo primitivo (int)_.
```java
ContaCorrente contas [] = new ContaCorrente[2]; 
//contas é um objeto do tipo array que guarda objetos do tipo ContaCorrente

ContaCorrente c1 = new ContaCorrente(22,12345);
contas[0] = c1;

sysout(contas[0].getNumero); //irá imprimir 22
```