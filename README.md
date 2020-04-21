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
###  O que é a orientação a objetos?
A orientação a objetos veio para resolver problemas de repetibilidade de códigos. <br>_Ex.: imagine que um sistema, com **10 desenvolvedores**, possui diversos formulários que utilizam o CPF do cliente. Em um sistema **procedural** será necessário copiar e colar o mesmo trecho de código para que seja utilizado o campo CPF. Agora, imagine se inves do CPF for utilizado um CNPJ... terá de ser alterado **todas as linhas de código** que utilizam CPF e todos desenvolvedores terão de se atentar!_<br> A proposta da **O.O.** é de fazer **dados/atributos** e **métodos/comportamentos** andarem juntos!

###  Classe
A classe é um **_Tipo_**, ou seja, é a especificação de algo, onde este Tipo conterá atributos e comportamentos.<br>
Ex.: A classe Conta, possui **_atributos_** como:
* saldo;
* agencia;
* numero;
* titular;

**_comportamentos_**, como:
* sacar;
* depositar;

### Objeto/Instância
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

### Referência/Objeto
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