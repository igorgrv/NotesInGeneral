//CURSO DE JAVA - PRIMEIROS PASSOS


/*
//---------- HISTORIA E DADOS SOBRE JAVA ---------------------  

•	Muito popular entre os desenvolvedores;
•	6,5 milhões de desenvolvedores;
•	Serve para quaisquer aplicações;
•	Mercado de trabalho em busca desta linguagem (banco precisa muito);
•	Linguagem multiplataforma (mobile, desktop, diferentes dispositivos);
•	Criada pela SUN Microsystem, foi dado nome pela Ilha de Java (local fazendeiro de café);
•	1995 Java foi lançada, em 96 foi lançado o JDK (kit de desenvolvimento java)
•	2004 a Oracle compra a SUN Microsystem
*/

//INTRODUÇÃO A PROGRAMAÇÃO

/*
---------- DOWNLOAD ---------------------
1º Para começar será necessário baixar o Java SE
https://www.oracle.com/technetwork/java/javase/downloads/index.html

2º Após instalar será necessário configurar o Path no windows
• Ir até sistemas
• Configurações avançadas
• Variáveis de ambiente
• Adicionar diretório c:/Program Files/Java/Jdk/bin

---------- NAVEGANDO PELO PROMPT ---------------------
• CMD
  • Comando "cd" -> cd C:\
  • comando "dir" -> dir (mostra todo conteúdo do diretório)
*/

/*Toda aplicação chava precisa se iniciar nesse layout*/
    println //-> pula linha
    print //-> mantém na mesma linha
    
/*ATENÇÃO AS LETRAS MAIÚSCULAS
    System e não system*/

public class HelloWord {
  public static void main (String[] args){
    System.out.println("HelloWord");
  }
}

/*
---------- COMPILANDO CÓDIGO NO CMD ---------------------
• Acesse a pasta onde se encontra o arquivo .java
• Digite no CMD
  •javac SeuArquivo.java
  •java SeuArquivo

---------- FUNDAMENTOS DE JAVA ---------------------
• Classe: são as programações em si
• Método: são os conteúdos que vão dentro do main

---------- CARACTER SCAPE ---------------------
• \t : representa a tabulação [TAB / ESPAÇO]
• \n : realiza a quebra de linha
• \" : permite colocar a aspas
• \\ : permite colocar a barra

---------- VARIÁVEIS - TIPOS PRIMITIVOS ---------------------
• String: utilizada para textos 
          String x = "Igor disse oi";
• int: letra minúscula, utilizado para nº 
          int x = 23;
• double: recebe numero fracionado
          double altura = 12.45;
• char: recebe 1 caracter
          char sexo = 'M';
• boolean: retorna true ou false
          boolean casado = true;
 
---------- TAMANHOS DAS VARIÁVEIS ---------------------T
• byte b = 127 // até cem
• short s = 32768 // até 32mil
• int i = 2_000_000_000 // até 2bilhões

*Multiplas variáveis podem ser criadas como boa prática, ex.:

String nome, sobrenome, endereço;
int idade, numeroQualquer;
float altura, peso;

---------- CASTING/MOLDANDO ---------------------
//Cast explítico: utilizado para que dois tipos diferentes de variáveis possam ser utilizados, ex.:

int x = 1;
double y = 3.1416

x = y //retornará um erro
x = (int) y //retornará 3


-------- SCANNER / RETORNANDO DADOS DO USUARIO -----------------
// Para utiliza-lo é necessário importar a biblioteca java.util.Scanner
*Quando o usuário deseja perguntar algo, é necessário utilizar o método: nextLine -> 
Scanner s = new Scanner (System.in);
String nome = s.nextLine();
*/

import java.util.Scanner

public class TestandoScanner {
  public static void main (String[] args){
    Scanner s = new Scanner (System.in);
    System.out.println("Digite seu nome");
    String nome = s.nextLine();
    System.out.println("Bem-vindo " + nome);
  }
}

/*
-------- JOptionPane / "Textbox" -----------------
//Necessario importar a biblioteca -> import javax.swing.JOptionPane
JOptionPane -> métodos -> 
    .showInputDialog ("Coloque sua pergunta")
    .showMessageDialog (null, MinhaString)
*/

import javax.swing.JOptionPane;

public class testeJOptionPane {
  public static void main (String[] args){
    String nome = JOptionPane.showInputDialog ("Qual seu nome?");
    JOptionPane.showMessageDialog(null, nome);
  }
}

/*
-------- OPERADORES ESPECIAIS -----------------
// Operador ternário -> ? : -> Serve como um if para questionar

https://www.mkyong.com/java/java-convert-string-to-int/

*/
int idade = 15;
String x = (idade >= 18) ? "Ta tranquilo" : "Menor de idade";
System.out.println(x);

ou

import javax.swing.JOptionPane;

public class operadorTernario {
  public static void main (String[] args){   
    
    String idade = JOptionPane.showInputDialog("Digite sua idade");
    int x = Integer.parseInt(idade);
    String msg = x >= 18 ? "Ta tranquilo" : "Menor de idade";
    System.out.println(msg);
  }
}

/*
-------- CÁLCULO IMC -----------------
*/

import javax.swing.JOptionPane;

class IMC {
  public static void main (String[] args){
    String getPeso = JOptionPane.showInputDialog("Qual seu peso?");
    String getAltura = JOptionPane.showInputDialog("Qual sua altura?");
    
    double peso = Double.parseDouble(getPeso);
    double altura = Double.parseDouble(getAltura);
    
    double imc = peso/(altura * altura);
    String msg = (imc>= 20 && imc<=25) ? "Tudo ok" : "Ta fofo";
    msg = "Seu IMC: " + imc + "\n" + msg;
    
    JOptionPane.showMessageDialog(null, msg);
  }
}

/*
-------- ARRAYS -----------------
//Os arrays possuem uma classe -> */
import java.util.Arrays;
//Para declarar o array é necessário informar com chaves [] e {}
String [] paises = {"Brazil", "Rússia"};
int [] impares = {0,1,3};
//Para acessar um elemento do array, é necessário informar a posição
System.out.println(paises[0]);
//Outra forma de declarar o array é colocando a quantidade de elementos
int[] impares = new int [3];
impares [0] = 1;
impares [1] = 3;
impares [3] = 5;

//Para descobrir a quantidade de elementos de um array, podemos usar a propriedade "length"
System.out.println(paises.length);

//Para transformar todo array em uma string, podemos utilizar a class Arrays.toString(paises);
System.out.println(Arrays.toString(paises));

//Para fazer uma pesquisa, saber qual posição do array;
int posicao = Arrays.binarySearch(paises, "Russia");
System.out.println(posicao);
//retornará a posição 1

//Para ordenar o array, podemos utilizar o metodo Sort
//Arrays.sort(paises, 1 posição do array, ultima posição do array);
Arrays.sort(paises, 0 , paises.length);

//Para trazer um número aleatório, utilizamos a classe RANDOM
import java.util.Random;

Random r = new Random();
//r.nextInt(NumeroMaximo);
r.nextInt(10);

//exemplo array
import java.util.Arrays;
import javax.swing.JOptionPane;

public class playingArray {
  public static void main (String[] args){
    String[] linguagens = {"English", "Spanish" , "French", "Portuguese"};
    String getArray = Arrays.toString(linguagens);
    JOptionPane.showMessageDialog(null, "Essas são as linguagens mais faladas \n" + getArray);
    
    String msg = JOptionPane.showInputDialog("Digite um número");
    int numero = Integer.parseInt(msg);
    
    System.out.println("Voce prefere: " + linguagens[numero]);
  }
}
/*
-------- ARRAY LIST-----------------
//Frameowrk Collection - ArrayList - muito utilizado para adicionar ou remover campos -> */
//Necessário importar a class
import java.util.ArrayList;

//Para criar o ArrayList
//porém é necessário informar o tipo de dados do arraylist
Arraylist <String> cores = new ArrayList   <String>();

//Para adicionar elementos:
cores.add("Branco");
//Para adicionar na posição desejada:
cores.add(0, "Vermelho);
//Imprimindo ficaria
System.out.println(cores.toString());
//[Vermelho, Branco]

//Para remover:
cores.remove("Branco");

//Para saber se tem a cor (se contem a cor) -> retorna um boolean:
cores.contains("Branco");

//Para saber a quantidade de elementos:
String quantidade = cores.size();
System.out.println("Quantidade de elementos: " + quantidade);

//Para retornar o elemento do Array:
String elemento = cores.get(1);
System.out.println("Elemento 1 selecionado e o : " + elemento);

//Para saber a posição do elemento
System.out.println("A cor branca está em: " + cores.indexOf("branco"));

/*
-------- SWITCH -----------------
//Switch, permite que avaliemos condições (mais rapido que o if) */
//Por padrão:

char sexo = 'M';

switch(sexo) {
  case 'M':
    System.out.println("Algo");
    break
  case 'F':
    ...
    break
  default:
    ...
}

/*
---------------- DESAFIO DO DADO ------------------
*/
import javax.swing.JOptionPane;
import java.util.Random;

public class JogoDado {
  public static void main (String[] args){
    String cases;
  
    String palpite = JOptionPane.showInputDialog("De um palpite do numero do dado");
    int getPalpite = Integer.parseInt(palpite);
    
    Random r = new Random();
    int dado = r.nextInt(6);
    if(dado == 0){
      dado ++;
    }    
    
    if (getPalpite == dado){
        cases = "ACERTOU!";
    } else if (getPalpite != dado) {
        cases = "TENTE NOVAMENTE";
    } else {
        cases = "Digite um numero valido";
    }
    
    String msg = ("Seu palpite foi: " + getPalpite + "\n O numero do dado foi: " + dado + "\n" + cases);
    
    JOptionPane.showMessageDialog(null, msg);
    
  }
}

/*
---------------- FOR EACH / FOR ------------------
//O for é utilizado como uma condicional aprimorada */

int [] pares = {2,4,6,8}

for (int i = 0; i<pares.length ; i++) {
  int par = pares[i]
  System.out.println(par);
  //irá o array
}

//O foreach se trata de uma aprimoração do for para certas ocasiões
for(int par : pares){
  System.out.println(par);
}

/*
---------------- DO WHILE ------------------
//o DO serve para executar pelo menos uma vez o código */

int i = 3;

do {
  i++
  System.out.println(i);
} while (i<10) {
}

/*
---------------- EXERCICIO DE VERIFICAÇÃO ------------------
//Adicione produtos a lista até que seja digitado FIM*/
import java.util.Scanner;
import java.util.ArrayList;

public class ListaProdutos {
  public static void main (String[] args){
    ArrayList <String> produtos = new ArrayList <String>();
    Scanner s = new Scanner(System.in);    
    System.out.println("Digite os produtos que quer e ao final digite FIM");
    
    String produto;    
    while (!"FIM".equals(produto = s.nextLine())){
      produtos.add(produto);
    }
    
    System.out.println(produtos.toString());
  }
}


/*
--------------- EXERCICIO FIBONACCI -------------------
*/
// 1,2,3,5,8
public class NumeroFibonacci {
  public static void main (String[] args){
    int anterior = 0;
    int proximo = 1;
    
    System.out.println(anterior);//1
    System.out.println(proximo);//2
             
    while (proximo<2600) {
      proximo = proximo + anterior;//5
      System.out.println(proximo);//5
      anterior = proximo - anterior;//3
    }
  }
}

/*
--------------- BREAK CONTINUE ROTULOS -------------------
// break -> para o código inteiro */
// continue -> para aquela condicional

for( int i=0; i<10 ; i++) {
  if ( i == 5 ){
    continue; // irá pular o numero 5
  }
  System.out.println(i);
}

/*
--------------- ECLIPSE -------------------
//ATALHOS 
Ctrl + 1 -> Correção de erros
Ctrl + Space -> Completa códigos
Ctrl + Shift + f -> Formata o código
Ctrl + O -> Navegação rápida
Ctrl + Shift + O -> Importa automatica as classes


--------------- JAVA ORIENTADO OBJETOS -------------------
CACHORRO - > TIPO (CLASSE)
  TAMANHO: int -> ATRIBUTOS (VARIÁVEIS)
    latir(): void -> AÇÕES (MÉTODOS)
*/
//Ao criar um objeto (Cachorro por exemplo), para chamar os atributos e ações deste cachorro:

//Objeto:
public class Cachorro {
  int tamanho;
  String raca;
  
  void latir(){
    System.out.println("Au, au");
  }
}

//Instancia do objeto (derivação do objeto)
public class umCachorro {
  public static void main (String[] args){
    Cachorro pitbull = new Cachorro();
    pitbull.raca = "Pitbull";
    pitbull.tamanho = 100;
    pitbull.latir();
    
    Cachorro viralata = new Cachorro();
    viralata.raca = "viralata";
    viralata.tamanho = 80;
    viralata.latir();
  }
}

/*
--------------- METODOS C/ PARAMETROS ------------------- 
*/
//Para declarar um método com parâmetro, basta informa-lo entre os ()
//**O Método c/ VOID não precisa dar retorno algum ao usuário;

//metodo c/ parametro:
void saca (double valor){
}

//metodo s/ parametro:
void exibeSaldo (){
}

//metodo c/ parametro e retorno
int maior(int um, int dois){
  //necessário ter um retorno
  if ( um > dois){
    return um;
  } else {
    return dois;
  };
}

//para comentar um método, deve-se utilizar

/**
	 * 
	 * @param x
	 * @param y
	 * @return
	 */
	int valores (int x, int y) {
		return x;
	}

/*
--------------- GET/IS & SET ------------------- 
*/
//Get é utilizado para retornar o valor de uma classe private
  private String nome;

  public String getNome(){
    return nome;
  }

//Set é utilizado para aplicar um valor a variavel privada
  public void setNome(String n){
    this.nome = n;
  }

//Is é quando a variável é booleana
  private boolean ativo;
  
  public boolean isAtivo(){
    return ativo;
  }
  
  public void setAtivo(boolean a) {
    this.ativo = a;
  }
  
/*
---------- VARIÁVEIS E MÉTODOS ESTÁTICOS (STATIC) ------------ 
*/
//VARIÁVEIS
//Um método static não pode ser alterado, para declarar:
public static int ovosDaGranja;

//Para ser acessada dentro de uma class, não se deve utilizar o "this"
public Galinha botar () {
  Galinha.ovosDaGranja++;
}

//MÉTODOS
//Os métodos static não acessa variáveis e metodos "locais", ou seja, não pode usar "this" dentro

public static double mediaDeOvos (int galinhas) {
  return ovosDaGranja / galinhas;
}

/*
---------- CONSTRUTORES ------------ 
*/
//Quando criamos uma class, o Java automaticamente cria um construtor padrão

public class ContaOO{
  //construtor padrão
  ContaOO(){
   
  }
}

//Quando colocamos parâmetros nos construtores, forçamos que o usuário preencha os dados
ContaOO(String t, int cc, int ag) {
		this.agencia = ag;
		this.numero = cc;
		this.titular = t;
		ContaOO.qntdContas ++;
	}

/*
---------- JAR e JAVADOC ------------ 
//o JAR é a extensão de Java ARchive, que seria um executavel do java;
//o JAVADOC é a documentação do projeto, lá irá informar todos os pacotes, métodos e atributos
*/


/*
---------- HERENÇA -> EXTENDS ------------ 
//A Herença serve para herdar dados de uma classe. Divididas em Superclasse e subclasse
Como exemplo, a classe

Superclass: Animal
Subclasses: cachorro, galinha, gato

Para acessar uma Superclasse é necessário utilizar o parâmetro extends;
*/

//Superclasse
public class Animal {
  String nome;
  int idade;
  
  void dormir(){
    System.out.pritnln("Dormiu");
  }
}

//subclasse
public class Cachorro extends Animal {
}

//Classe para testar a subclasse
public class Teste {

  public static void main (String[] args){
    Cachorro cacau = new Cachorro();
    cacau.nome = "Cacau";
    
    cacau.dormir();
  }
}

//Para descorbri se uma classe deve herdar algo de outra, temos que nos perguntar "É um/uma?"
// Quadrado extends Forma? -> Quadrado é uma Forma? Sim!
// Bebida extends Cerveja? -> Bebida é uma cerveja? Não!


/*
---------- HERENÇA -> CONSTRUTOR SUPER ------------ 
// Quando o construtor possui parâmetros a serem retornados, a subclasse precisa informa-los
utilizando a funcao super

Exemplo:
*/

//Superclass
public class Animal {
  String nome;
  int idade;
  
  public Animal (String nomeDog, int idadeDog){
    this.nome = nomeDog;
    this.idade = idadeDog;
  }
  
  void dormir(){};
  
  public int getIdade(){
    return this.idade;
  }
}

//subclasse
public class Cachorro extends Animal {

  public Cachorro(){
    super("cacau" , 30);
  }
  
  public int getIdade(){
    return super.idade;
  }
  
}

//Quando se tem um método igual na Superclasse e na subclasse, por prática é necessário informar que se trata de um @override, ou seja está se sobescrevendo o método

//void dormir() possui nas duas classe;

/*
---------- POLIMORFISMO ------------ 
O polimorfismo é a sobescrita de um método.

Exemplo:
O método FazerBarulho() da classe Super, pode variar dependendo do animal
- O cachorro irá fazer Auau e Galinha CóCó

Para este método ficar dinámico é necessário utilizar o Polimorfismo
*/

/*
---------- CLASSES ABSTRATAS/FINAL -> abstract/final ------------ 
As classes abstratas não geram objetos! Não se poder por na classe abstrata Pessoa p1 = new Pessoa();

Exemplo
*/

public abstract class Animal {
  //método sem {} pois não precisa de retorno
  abstract void fazerBarulho();
}

//A sublclasse cachorro, é obrigada a informar o méotodo fazerBarulho();
public class Cachorro extends Animal {
  
  public void fazerBarulho(){
    System.out.println("AuAu");
  }
}

//METODO ABSTRATO -> só pode ser declarado, mas não pode ser implementado

//CLASSE FINAL -> Não pode ser herdada por outra classe, utilizada em classes "Folha"/aquela que não tem filhos
//METODO FINAL -> não pode ser sobescrito pelas sub-classes, obrigatoriamente herdado;

/*
---------- ENCAPSULAMENTO -> INTERFACE ------------ 
ENCAPSULAR -> Ocultar partes independentes da implementação, permitindo construir partes invisíveis ao mundo exterior.
* não importa como é feito o código, o resultado será sempre o mesmo.
* serve para mandar MENSAGENS e ter respostas

Vantangem de encapsular:
- Tornar mudanças invisíveis (o código para o mundo exterior será o mesmo).
- Facilita a reutilização de código.
- Reduzir efeitos colaterais.


O encapsulamento usa INTERFACES, como comunicação com o mundo exterior;
INTERFACE -> Lista de serviços fornecidos por um componente. é o contato com o mundo exterior, que define o que pode ser feito com um objeto dessa classe.
*A interface so possui métodos abstratos (não possui atributos);
*Utilizada como uma ação genérica, o detalhe da ação é feita por classes

Exemplo para interface:
*/
//ControleRemotoInterface - so fica na interface coisas "visíveis" ao usuario

public interface ControleRemotoInterface {

//métodos da interface:
public abstract void ligar();
public abstract void desligar();
public abstract void abrirMenu();
public abstract void fecharMenu();
public abstract void aumentarVolume();
public abstract void diminuirVolume();
public abstract void ligarMudo();
public abstract void desligarMudo();

}

//Para a class:
public class ControleRemotoClass implements ControleRemotoInterface


/*
---------- AGREGAÇÃO/TEM UM  ------------ 
*A agregação é conhecida como "tem um".
Ex.: A classe Luta "tem um" Lutador?
A class b tem um atributo da classe a.
*/
public class Luta {
  private Lutador desafiado;
  private Lutador desafiante;
  
  public void setDesafiado (Lutador dd){
    this.Lutador = dd;
  }
}

/*
---------- TRY/CATCH  ------------
*/

try{
  //Coloque seu codigo, se der o erro você pegará pelo catch
} catch(ColoqueOMetodoCProblema e){
  //Ação quando der erro
} catch (coloqueOOutroErro){
}

//*Por prática é uma boa utilidade usar o do while para continuar o coidgo

public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		boolean teste = true;

		do {
			try {
				System.out.println("Digite o numeros");
				System.out.print("Divisor:");
				float x = s.nextFloat();
				System.out.print("Dividendo:");
				float y = s.nextFloat();
				float z = x / y;
				System.out.println("Resultado: " + z);
				teste = false;

			} catch (java.lang.ArithmeticException e1) {
				System.out.println("Divisão por1 zero não pode. \n");
				s.nextLine();
			} catch (java.util.InputMismatchException e2) {
				System.out.println("Sem letras \n");
				s.nextLine();
			}

		} while (teste);
}

/*
------------- ENUM ----------------
*/
• O Enum consiste em um grupo de STATIC FINAL, ou seja, uma lista de valores pre-definidos!
• Nao permite extender esta classe;

Quando usar:
  • Quando necessitar 'cravar' valores fixo, ou seja, aquele elemento so possui aquelas X caracteristicas.
  EX.:
    /**
    * Um curso, pode ter N nomes e N horarios, porem tera 3 tipos de TURNOS
    * Turno sera um ENUM, que contem os campos MANHA, TARDE e NOITE
    */
    public class Curso{
      
      private String nome;
      private int horas;
      private Turno turno;
    
    }
    
    /**
    * Um enum pode possuir campos, como a descricao, Construtores e metodos
    * Ao criar o enum Manha, sera automaticamente atribuido a descricaoEnum
    * que podera ser instanciada por getTurno().getDescricaoEnum()
    */
    public enum Turno {
      MANHA("manhã"),
      TARDE("tarde"),
      NOITE("noite");
      
      private String descricaoEnum;
      
      Turno(String descricao) {
        this.descricaoEnum = descricao;
      }
      
      public String getDescricaoEnum(){
        return descricaoEnum;
      }
    }
    
    /**
    * Chamando o metodo enum
    */
    public class main {
      public static void main (String args[]){
        Curso curso = new Curso();
        curso.setNome("Farmacia");
        curso.setHoras(3600);
        curso.setTurno(Turno.MANHA);7y8
        
        sysout("disponivel no turno da " + curso.getTurno().getDescricaoEnum());
        //disponivel no turno da manhã
      }    
    }

Características:
  • As instancias d tipo enum sao criadas e nomeadas com a declaracao da classe
  • Por convencao, os nomes recebem LETRAS MAISCULAS;
  • O construtor e declarado Private;
      Ex.:
        public enum TipoIngresso(){
          INTEIRO (new SemDesconto()),
          ESTUDANTE (new DescontoParaEstudante()),
          BANCO (new DescontoParaBanco());
        
        }



















