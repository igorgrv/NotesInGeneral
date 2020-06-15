# Design Patterns<a name="designpatterns"></a> 

Os design patterns, vieram para resolver problemas comuns no dia a dia dos desenvolvedores, como:

* Classes gigantescas;
* Métodos cheios de ifs | fors;
* Necessidade de efetuar mudanças em diversas classes por causa de uma única mudança (**_métodos muito acoplados_**)

Ao criar um projeto, devemos pensar sempre na possibilidade de, **novidades e alterações**, o que nem sempre é fácil de prever, então para isso, foram dados nomes alguns procedimentos, conhecidos como **_Padrões de Projetos_** , que buscam  ter classes com:

* Baixo acoplamento;
* Alta coesão! -> _coesão: uma única responsabilidade;_

Design Patterns mais utilizados:

* Factory Method -> criador de objetos;
* Strategy -> Para cada tipo de exercicio, tem um tipo de calculo diferente e um jeito comum é criar classes que implementem uma interface em comum, com métodos em comum;

DDD (Domain Driven Design): deixa implicito que as classes/métodos tenham nomes do mundo real, por exemplo, classes que vão estar conversando com o analista, sem que seja algo que so o desenvolvedor saiba;

Quando utilizar um padrão?

* Primeiro, pensar que temos um problema e queremos resolver;
  * Pode começar ocm um código cheio de ifs e “feio”;, mas se atentar ao passo abaixo!
* Segundo, pensar que precisaremos fazer manutenção e isso deve ser fácil para qualquer um que vá dar manutenção;
  * Aqui é hora de deixar o código bonito e utilizando os patterns;

# Tipos de Design Patterns

1. [Strategy](#strategypat)
2. [Chain of Responsibility](#chainpat)
3. [Template Method](#templatepat)
4. [Decorator](#decoratorpat)
5. [State](#statepat)
6. [Builder](#builderpat)
7. [Observer](#observerpat)
8. [Factory](#factorypat)
9. [FlyWeight](#flyweightpat)
10. [Memento](#mementopat)
11. [Bridge / Adapter](#bridgeadapterspat)
12. [Command](#commandpat)
13. [Façade / Singleton](#singletonpat)
14. [SOLID](#solidpat)

## Strategy<a name="strategypat"></a>
**Quando utilizar o padrão Strategy?**

* _O padrão strategy é muito útil quando temos um conjunto de algoritmos similares, e precisamos alternar entre eles em diferentes pedaços da aplicação._<br><img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/strategypat.png?raw=true" width="700" height="300">

**Dado o desenvolvimento:**

* Calcular os impostos de um orçamento, onde dado um valor e o tipo de imposto, deve retornar o valor total a ser pago daquele orçamento;

**Perguntas:**

* Quantos impostos teremos?
* Qual vai ser a alíquota para cada imposto?

**Possíveis soluções:**

1. Criar a classe Orçamento, recebe construtor (valor);
2. Criar a classe Item, que irá ter um valor e um titulo;
3. Opções de `CalculadorDeImpostos`:
* **Através de if's** verificar qual o imposto;
  
    ```java
    public void realizaCalculoImposto(Orcamento orcamento, String imposto) {
        if(imposto.equals("ICMS")) {
            double icms = orcamento.getValor() * 0.1;
            System.out.println("ICMS:" + icms);
        } else if (imposto.equals("ISS")) {
            double iss = orcamento.getValor() * 0.06;
            System.out.println("ISS: " + iss);
        }
        
        //MUITOS IFS!
    }
    ```
* Criar **classe para cada** imposto;
    ```java
    public void realizaCalculoImposto(Orcamento orcamento, String imposto) {
        if(imposto.equals("ICMS")) {
            double icms = new ICMS().calculaICMS(orcamento);
            System.out.println("ICMS:" + icms);
        } else if (imposto.equals("ISS")) {
            double iss = new ISS().calculaISS(orcamento);
            System.out.println("ISS: " + iss);
        }
        
        //AINDA COM MUITOS IF's
    }
    ```
### Aplicando o Strategy
A ideia de implementar o Strategy, é fazer com que o `CalculadorDeImpostos` receba um tipo **Genérico** de impostos, de modo que a **regra de negócio, fique com cada imposto**! <br><br>Cada imposto terá:
* Sua própria alíquota (o que torna fácil a manutenção);
* Terá o método `calcula(Orcamento orcamento)`;

Quando temos um padrão em classes, como métodos que fazem a mesma coisa, podemos julgar que temos um **Contrato**, ou seja, precisamos de uma **Interface**!<br><br>

```java
//IRÁ RECEBER UM TIPO DE IMPOSTO GENÉRICO
public class CalculadorDeImposto {

    public void realizaCalculoImposto(Orcamento orcamento, Imposto impostoQualquer) {
        double calculo = impostoQualquer.calcula(orcamento);
        System.out.println(calculo);
    }
}

//------------------------------------------------------------------
//REGRA DE NEGÓCIO
public interface Imposto {
    double calcula(Orcamento orcamento);
}

public class ICMS implements Imposto{

    @Override
    public double calcula(Orcamento orcamento) {
        return orcamento.getValor() * 0.1;
    }
}

public class ISS implements Imposto{
    
    @Override
    public double calcula(Orcamento orcamento) {
        return orcamento.getValor() * 0.06;
    }
}

//------------------------------------------------------------------
//Teste
public static void main(String[] args) {
    Imposto icms = new ICMS();
    Imposto iss = new ISS();
    
    Orcamento orcamento = new Orcamento(1000.00);
    
    CalculadorDeImposto calculador = new CalculadorDeImposto();
    calculador.realizaCalculoImposto(orcamento , icms);
    calculador.realizaCalculoImposto(orcamento , iss);
    
    System.out.println(calculador);
}
```
Com este padrão, caso seja necessário adicionar mais um tipo de impostos, não será problema!
* Adicionando o imposto ICCC, seguindo as regras:
    * menor do que R$ 1.000,00 reais, 5% imposto;
    * maior do que R$ 1.000,00 reais e menor do que R$ 3.000,00, 7% imposto;
    * maior do que R$ 3.000,00, 8% imposto + R$ 30,00 reais;

```java
public class ICCC implements Imposto {

    @Override
    public double calcula(Orcamento orcamento) {
        if (orcamento.getValor() < 1000.00) {
            return orcamento.getValor() * 0.05;
        } else if (orcamento.getValor() <= 3000.00) {
            return orcamento.getValor() * 0.07;
        } else {
            return (orcamento.getValor() * 0.08) + 30.00;
        }
    }

    //ATENÇÃO AOS IFS, SINAL DE Q PRECISA DE UM DESIGN PATTERN!
}

//IMPLEMENTANDO
public static void main(String[] args) {
    CalculadorDeImposto calculador = new CalculadorDeImposto();
    Orcamento orcamento = new Orcamento(10000.00);
    Imposto iccc = new ICCC();
    
    calculador.realizaCalculoImposto(orcamento , iccc);
    
    System.out.println(calculador);
}
```

### Aplicando Strategy - Investimento
* Independentemente do investimento escolhido, o titular da conta recebe apenas 75% do lucro do investimento, pois 25% é imposto;
* Os possíveis tipos de investimento são:

	-   "CONSERVADOR", que sempre retorna 0.8% do valor investido;
	-   "MODERADO", que tem 50% de chances de retornar 2.5%, e 50% de chances de retornar 0.7%;

* Crie a classe `RealizadorDeInvestimentos` que recebe uma estratégia de investimento, a executa sobre uma conta bancária, e adiciona o resultado seguindo a regra acima no saldo da conta.

```java
public class RealizadorDeInvestimentos {

	public void realizaInvestimento(Investidor investidor, Investimento tipoQualquer) {
		double investimento = tipoQualquer.investe(investidor);
		investidor.deposita(investimento * 0.75);
		System.out.println("Novo saldo:" + investidor.getSaldo());
	}
}


//---------------------------------------------------
//REGRA
public interface Investimento {
	double investe(Investidor investidor);
}



public class Conservador implements Investimento{
	
	@Override
	public double investe(Investidor investidor) {
		return investidor.getSaldo() * 0.08;
	}
}



public class Moderado implements Investimento{

	private Random random;
	
	public Moderado() {
        this.random = new Random();
     }
	
	@Override
	public double investe(Investidor investidor) {
		if(random.nextInt(2) == 0) {
			return investidor.getSaldo() * 0.025;
		} else {
			return investidor.getSaldo() * 0.07;
		}
	}
}


//-------------------------------------------------------
public class TestaInvestimento {

	public static void main(String[] args) {
		Investidor investidor = new Investidor("Igor", 1000.00);
//		Investimento conservador = new Conservador();
		Investimento moderado = new Moderado();
		
		RealizadorDeInvestimentos realizador = new RealizadorDeInvestimentos();
		realizador.realizaInvestimento(investidor, moderado);
		
		System.out.println(realizador);
	}

}
```

## Chain of Responsibility<a name="chainpat"></a>

**Quando utilizar o padrão Chain of Responsibility?**

* _Quando temos uma **lista de comandos a serem executados** de acordo com algum cenário em específico, e sabemos também qual o próximo cenário que deve ser validado, caso o anterior não satisfaça a condição._

  <img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/chainpat.png?raw=true" width="700" height="450">

**Dado o desenvolvimento:**

* Se o cliente comprou mais de 5 itens, ele recebe 10% de desconto;
* Se o orçamento for maior que R$ 500,00, ele recebe 7% de desconto, e assim por diante.
* Se o cliente comprou uma CANETA e também um LAPIS, ele recebe 5% de desconto;

<br>

Classes base:

```java
public class Orcamento {

	private Double valor;
	private List<Item> itens;

	public Orcamento(Double valor) {
		this.valor = valor;
		this.itens = new ArrayList<Item>();
	}
    
    //getters and setters
}


public class Item {

	private double valor;
	private String nome;
    
    //getters and setters
}    
```

**Perguntas:**

* Quantos tipo de desconto teremos?
* Qual vai ser a alíquota para cada desconto?
* Como um desconto irá chamar o outro?

**Possíveis soluções:**

1. Crie a classe Item, recebe construtor(valor e nome do Item);

2. Criar a classe Orçamento, recebe construtor (valor e uma `List<Item>`);

3. Crie a classe que irá receber a lógica de Desconto, chamada `CalculadorDeDescontos` e implemente as regras de negocio. Opções:

   * com **if’s**:

     ```java
     public class CalculadorDeDescontos {
     	
     	public double calcula(Orcamento orcamento) {
     		if(orcamento.getItens().size() > 5)	return orcamento.getValor() * 0.1;
     		else if(orcamento.getValor() > 500) return orcamento.getValor() * 0.07;
     		return 0;
     	}
         
         //Teremos um problema, para cada novo desconto, será necessário um novo IF
     
     }
     ```

   * com **Classes**:
   
     ```java
     
     public class DescontoSeTiverCincoItens {
     
     	public double desconta(Orcamento orcamento) {
     		if(orcamento.getItens().size() > 5) {
     			return orcamento.getValor() * 0.1;
     		} else {
     			return 0;
     		}
     	}
     }
     
     public class DescontoPorMaisQuinhentosReais {
     
     	public double desconta(Orcamento orcamento) {
     		if(orcamento.getValor() > 500) {
     			return orcamento.getValor()* 0.07;
     		} else {
     			return 0;
     		}
     	}
     }
     
     
     public class CalculadorDeDescontos {
     	
     	public double calcula(Orcamento orcamento) {
     		double desconto = new DescontoSeTiverCincoItens().desconta(orcamento);
     		if(desconto == 0) new DescontoPorMaisQuinhentosReais().desconta(orcamento);
     		// if desconto == 0 para cada desconto e como a classe saberia "sozinha" qual seria o próximo desconto? Ela tem q saber?
             
             //O ideal é que as Classes que aplicam o método desconta, soubessem passar qual seria o proximo Desconto!
             
             return 0;
     	}
     }
     
     
     ```
   
     

### Aplicando o Chain

O principal problema de nossa classe é quando um Desconto não é aplicado e precisamos verificar se o próximo seria considerado, sem a utilização de **ifs**. <br><br>Então, nossas classes que possuem a lógica de desconto, precisam:

1. Ter um método que iria chamar um `descontoQualquer` - caso aquele desconto falhasse;
2. Por último, quando não tivesse outro Desconto, seria retornado `zero`;

Desta forma, quando nossa classe que recebe a Lógica de Desconto, iria apenas setar a **sequência de descontos**!<br><br>

Modelo `Desconto`

```java
public interface Desconto {

	double desconta(Orcamento orcamento);

	void setProximoDesconto(Desconto descontoQualquer);
}


public class DescontoSeTiverCincoItens implements Desconto {

	private Desconto descontoQualquer;

	@Override
	public double desconta(Orcamento orcamento) {
		if (orcamento.getItens().size() >= 5)
			return orcamento.getValor() * 0.1;
		else
			return descontoQualquer.desconta(orcamento);
	}

	@Override
	public void setProximoDesconto(Desconto descontoQualquer) {
		this.descontoQualquer = descontoQualquer;
	}

}

public class DescontoSeOrcamentoMaiorQuinhentosReais implements Desconto {

	private Desconto descontoQualquer;

	@Override
	public double desconta(Orcamento orcamento) {
		if (orcamento.getValor() >= 500)
			return orcamento.getValor() * 0.07;
		else
			return descontoQualquer.desconta(orcamento);
	}

	@Override
	public void setProximoDesconto(Desconto descontoQualquer) {
		this.descontoQualquer = descontoQualquer;
	}

}

public class DescontoPorVendaCasada implements Desconto {

	private Desconto descontoQualquer;

	@Override
	public double desconta(Orcamento orcamento) {
		if (aconteceuVendaCasada(orcamento)) {
			return orcamento.getValor() * 0.05;
		} else {
			return descontoQualquer.desconta(orcamento);
		}
	}

	@Override
	public void setProximoDesconto(Desconto descontoQualquer) {
		this.descontoQualquer = descontoQualquer;
	}

	private boolean aconteceuVendaCasada(Orcamento orcamento) {
		return existeCanetaOuLapis(orcamento, "CANETA") && existeCanetaOuLapis(orcamento, "LAPIS");
	}

	public boolean existeCanetaOuLapis(Orcamento orcamento, String nomeItem) {
		return orcamento.getItens().stream()
				.anyMatch(item -> item.getNome().equals(nomeItem));
	}

}


public class DescontoNulo implements Desconto {

	@Override
	public double desconta(Orcamento orcamento) {
		return 0;
	}

	@Override
	public void setProximoDesconto(Desconto d2) {
	}

}
```

Logica:

```java
public class CalculaDesconto {

	public double aplicaDesconto(Orcamento orcamento) {
		Desconto d1 = new DescontoSeTiverCincoItens();
		Desconto d2 = new DescontoSeOrcamentoMaiorQuinhentosReais();
		Desconto d3 = new DescontoPorVendaCasada();
		Desconto d4 = new DescontoNulo();
		
		//caso d1 falhe, será chamado d2 e assim em diante
		d1.setProximoDesconto(d2);
		d2.setProximoDesconto(d3);
		d3.setProximoDesconto(d4);
		
        //se inicia pelo primeiro elemento, a partir do metodo desconta
        //sera chamado as demais classes Desconto
		return d1.desconta(orcamento);
	}
}
```

Teste:

```java
public static void main(String[] args) {
    CalculaDesconto calculador = new CalculaDesconto();

    Orcamento orcamento = new Orcamento(500.00);
    orcamento.adiciona(new Item("CANETA", 250.00));
    orcamento.adiciona(new Item("LAPIS", 250.00));

    double desconto = calculador.aplicaDesconto(orcamento);

    System.out.println(desconto);
}
```



## Template Method<a name="templatepat"></a>

**Quando utilizar o padrão Template Method?**

* _Imagine que temos uma série de algoritmos matemáticos a serem implementados. Todos eles são bem parecidos, possuem a mesma estrutura. As variações são mínimas, por exemplo, um deles deve iterar até o fim da lista, enquanto o outro deve iterar até a metade dela._

  * O Template Method cairia como uma luva, já que ele possibilita que o desenvolvedor escreva a "estrutura" do algoritmo apenas uma vez, e a reutilize nas implementações específicas de cada um dos algoritmos.
  
* _O corpo dos métodos são parecidos? Com o Template Method, a ideia é criar uma **classe abstrata** que implemente esses metodos, fazendo com quem extende-la siga aquele padrão! _

  <img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/templatepat.png?raw=true" width="700" height="450">

**Dado o desenvolvimento:**

* Crie 3 novos impostos, onde o imposto:
  * ICPP, irá ser de 7% caso o orcamento **seja maior** do que 500 reais e **caso contrário**, será de 5%;
  * IKCV, irá ser de 10% caso o orcamento **seja maior** do que 500 reais e também se tiver um item no orçamento maior do que 100 reais, **caso contrário**, será de 6%;
  * IHIT, irá ser de 13% + R$ 100,00 caso o orcamento possua 2 itens com o mesmo nome, **caso contrário**, será de 1% * o número de itens do orçamento;

<br>

Classes base:

```java
public class Orcamento {

	private Double valor;
	private List<Item> itens;

	public Orcamento(Double valor) {
		this.valor = valor;
		this.itens = new ArrayList<Item>();
	}
    
    //getters and setters
}


public class Item {

	private double valor;
	private String nome;
    
    //getters and setters
}

//padrão de impostos
public interface Imposto {
	double calcula(Orcamento orcamento);
}
```

**Possíveis soluções:**

1. Crie uma classe para cada imposto;

2. Implemente a interface Imposto;

3. Dentro do método `calcula` realiza as verificações:

   * com **if’s**:

     ```java
     public class ICPP implements Imposto {
     
     	@Override
     	public double calcula(Orcamento orcamento) {
     		if(orcamento.getValor() > 500) {
     			return orcamento.getValor() * 0.07;
     		} else {
     			return orcamento.getValor() * 0.05;
     		}
     	}
     
     }
     
     
     public class IKCV implements Imposto{
     
     	@Override
     	public double calcula(Orcamento orcamento) {
     		if(orcamento.getValor() > 500 && temUmItemQueCustaMaisCemReais(orcamento)) {
     			return orcamento.getValor() * 0.1;
     		} else {
     			return orcamento.getValor() * 0.6;
     		}
     	}
     	
     	public boolean temUmItemQueCustaMaisCemReais(Orcamento orcamento) {
     		return orcamento.getItens().stream().anyMatch(orc -> orc.getValor() >= 100);
     	}
     
     }
     ```

     

### Aplicando o Template Method

Note, que temos duas classes de Impostos, que estão fazendo o mesmo tipo de verificação:

* Se tal condição for atendida, **aplique o maior Imposto**;
* **Caso contrário** aplique um menor imposto;

Ou seja, temos um “template” que pode ser implementado, uma vez que ambas classes seguem a mesma lógica, sendo assim, devemos cria uma classe “Template”, que obrigue as outras classes a aplicarem os métodos!

```java
public abstract class ImpostoTemplate implements Imposto {

    //A CLASSE TEMPLATE QUE IRÁ TER A LÓGICA PARA APLICAR O MAIOR OU MENOR IMPOSTO
    //O método calcula, ira´ ser a lógica inalterada! -> final
	@Override
	public final double calcula(Orcamento orcamento) {
		if(seMaiorTaxacao(orcamento))
			return maiorTaxacao(orcamento);
		else
			return menorTaxacao(orcamento);
	}
	
	public abstract boolean seMaiorTaxacao (Orcamento orcamento);
	
	public abstract double maiorTaxacao(Orcamento orcamento);
	
	public abstract double menorTaxacao(Orcamento orcamento);
	
}


public class ICPP extends ImpostoTemplate {


	@Override
	public boolean seMaiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() > 500;
	}

	@Override
	public double maiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.07;
	}

	@Override
	public double menorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.05;
	}

}


public class IKCV extends ImpostoTemplate {

	public boolean temUmItemQueCustaMaisCemReais(Orcamento orcamento) {
		return orcamento.getItens().stream().anyMatch(orc -> orc.getValor() >= 100);
	}

	@Override
	public boolean seMaiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() > 500 && temUmItemQueCustaMaisCemReais(orcamento);
	}

	@Override
	public double maiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.1;
	}

	@Override
	public double menorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.6;d
	}

}


public class IHIT extends ImpostoTemplate{

	@Override
	public boolean seMaiorTaxacao(Orcamento orcamento) {
		List<String> noOrcamento = new ArrayList<String>();
		for(Item item : orcamento.getItens()) {
	          if(noOrcamento.contains(item.getNome())) 
	        	  return true;
	          else 
	        	  noOrcamento.add(item.getNome());
	        }
		return false;
	}

	@Override
	public double maiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.13 + 100;
	}

	@Override
	public double menorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * (0.01 * orcamento.getItens().size());
	}

}
```



## Decorator<a name="decoratorpat"></a>

**Quando utilizar o padrão Decorator?**

* `Imposto imposto = new ICMS(new ISS())` -> decorator permite compor uma classe na outra

* _Sempre que percebemos que temos comportamentos que podem ser compostos por comportamentos de outras classes envolvidas em uma mesma hierarquia, como foi o caso dos impostos, que podem ser composto por outros impostos_

* _Imagine que estamos implementando uma sequência de filtros. Esses filtros precisam eliminar diversas faturas de uma lista, de acordo com algumas regras de negócio: faturas menores que 2000 devem ser eliminadas, faturas maiores do que 8000 devem ser eliminadas, faturas entre 3000 e 4500 que foram emitidas no estado de São Paulo devem ser eliminadas, e assim por diante._

  _Uma implementação procedural produziria uma sequência de ifs enorme para verificar todas essas condições._ 

  * O Decorator, cairia bem neste caso, cada filtro teria sua própria classe, simples e fácil de ser compreendida e mantida.

**Dado o desenvolvimento:**

* Após os impostos terem sido criados, o cliente gostaria de poder compor um imposto no outro, ou seja, `new ICMS(new ISS())`, porém, precisaremos fazer com que o construtor de cada imposto receba este tipo de imposto, mas como?

<br>

Classes base:

```java
public class Orcamento {

	private Double valor;
	private List<Item> itens;

	public Orcamento(Double valor) {
		this.valor = valor;
		this.itens = new ArrayList<Item>();
	}
    
    //getters and setters
}
```

### Aplicando o Decorator

A ideia do Decorator, é fazer com que uma **Classe Abstrata Mãe** tenha em seu construtor um parâmetro dela mesma! `public Imposto(Imposto outroImposto)` e também um construtor vazio, para que seja possível implementar as classes filhas com o construtor vazio.<br>

<br>

Essa classe mãe, terá métodos (não abstratos) que poderam ser utilizados pela classe filha, não tendo a necessidade da reescrita do código!<br>

<br>

Class Abstrata mãe:

```java
public abstract class Imposto {
	
	private Imposto outroImposto;
	public Imposto(Imposto outroImposto) {
		this.outroImposto = outroImposto;
	}
	
	public Imposto() {
		this.outroImposto = null;
	}
	
	public abstract double calcula(Orcamento orcamento);
	
	public double calculaOutroImposto(Orcamento orcamento) {
		return (outroImposto == null ? 0 : this.outroImposto.calcula(orcamento));
	}
}
```



Classes filhas:

```java
public class ICMS extends Imposto{

	public ICMS(Imposto outroImposto) {
		super(outroImposto);
	}
	
	public ICMS() {}

	@Override
	public double calcula(Orcamento orcamento) {
		return orcamento.getValor() * 0.05 + calculaOutroImposto(orcamento);
	}
}


public class ISS extends Imposto{
	
	public ISS(Imposto outroImposto) {
		super(outroImposto);
	}
	
	public ISS() {}

	@Override
	public double calcula(Orcamento orcamento) {
		return orcamento.getValor() * 0.06 + calculaOutroImposto(orcamento);
	}

}
```

Testando:

```java
public static void main(String[] args) {
	 Imposto impostoComplexo = new ISS(new ICMS());     
     Orcamento orcamento = new Orcamento(500.0);

     double valor = impostoComplexo.calcula(orcamento);

     System.out.println(valor);
}
```


## State<a name="statepat"></a>

* _Um Contrato pode sofrer tipos de alterações, descontos, ajustes enquanto está EM ANDAMENTO. O mesmo pode acontecer quando ele está FALTANDO ASSINATURA DO CLIENTE. Mas, após ASSINADO, o contrato não pode mais sofrer alterações._

  * O State facilitaria o trabalho do desenvolvedor, já que ele possibilitaria que as ações de cada estado fiquem centralizadas em classes específicas, evitando a possível bagunça de um código procedural cheio de ifs.
  
* O State é utilizado para os casos onde determina classe terá Estados com regras, como por exemplo, um Orçamento “EM_APROVACAO” pode ir depois para “APROVADO” ou “RECUSADO”, mas nunca direto para “FINALIZADO”. Quando temos este tipo de Regra, utilizamos o Design State! 

  <img src="https://github.com/igorgrv/NotesInGeneral/blob/master/images/statepat.png?raw=true" width="700" height="450">

**Dado o desenvolvimento:**

* Crie um desconto extra, seguindo a ordem de que:
  * Se EM_APROVACAO, desconto de +5%;
  * Se APROVADO, desconto de +2%;
  * Se REPROVADO, sem desconto;

Classes base:

```java
public class Orcamento {

	private Double valor;
	private List<Item> itens;

	public Orcamento(Double valor) {
		this.valor = valor;
		this.itens = new ArrayList<Item>();
	}
    
    //getters and setters
}


public class Item {

	private double valor;
	private String nome;
    
    //getters and setters
}    
```

**Possíveis soluções:**

1. Criar um método dentro da Classe Orçamento que irá `aplicarDescontoExtra()` e que irá receber um novo parâmetro chamado `estadoAtual`, onde será verificado o estado para dar o desconto;

2. Acrescentar ao construtor, que todo novo Orçamento, começa com o `estadoAtual = EM_APROVACAO`;

   * Com **ifs**:

     ```java
     public class Orcamento {
     
     	private Double valor;
     	private List<Item> itens = new ArrayList<Item>();
     	private int estadoAtual;
     	private static final int EM_APROVACAO = 1;
     	private static final int APROVADO = 2;
         
         //PARA CADA NOVO ESTADO, SERA NECESSÁRIO UM NOVO IF
         public void aplicaDescontoExtra() {
                 if(estadoAtual == EM_APROVACAO) {
                     valor -= valor * 0.05;
                 } else if (estadoAtual == APROVADO) {
                     valor -= valor * 0.02;
                 } else {
                     throw new RuntimeException("Somente se em_provacao ou aprovado, recebem desconto extra");
                 }
             }
     }
     ```



### Aplicando o State

O conceito de State, é que através de um Contrato/Interface, tenhamos todos os estados possíveis e desta forma podemos controlar para qual estado é permitido e tudo isso podendo ser feito dentro da própria classe Orcamento:

```java
//TERÁ TODOS OS ESTADOS POSSÍVEIS
public interface EstadoDeUmOrcamento {

	void aplicaDescontoExtra(Orcamento orcamento);
	void aprova(Orcamento orcamento);
	void reprova(Orcamento orcamento);
	void finaliza(Orcamento orcamento);
}

//CADA ESTADO POSSUIRA SEU DESCONTO E DARÁ A REGRA!
public class EmAprovacao implements EstadoDeUmOrcamento{

	@Override
	public void aplicaDescontoExtra(Orcamento orcamento) {
		orcamento.valor -= orcamento.valor * 0.05;
	}

	@Override
	public void aprova(Orcamento orcamento) {
		orcamento.estadoAtual = new Aprovado();
	}

	@Override
	public void reprova(Orcamento orcamento) {
		orcamento.estadoAtual = new Reprovado();
	}

	@Override
	public void finaliza(Orcamento orcamento) {
		throw new RuntimeException("Orcamento deve estar aprovado ou finalizado");
	}

}


public class Aprovado implements EstadoDeUmOrcamento{

	@Override
	public void aplicaDescontoExtra(Orcamento orcamento) {
		orcamento.valor -= orcamento.valor * 0.02;
	}

	@Override
	public void aprova(Orcamento orcamento) {
		throw new RuntimeException("O orcamento ja esta aprovado");
	}

	@Override
	public void reprova(Orcamento orcamento) {
		throw new RuntimeException("O orcamento aprovado não pode ser reprovado");
	}

	@Override
	public void finaliza(Orcamento orcamento) {
		orcamento.estadoAtual = new Finalizado();
	}
	
}

//CLASSES REPROVA E FINALIZA

//----------------------------------------------------------------------------
public class Orcamento {

	protected Double valor;
	protected EstadoDeUmOrcamento estadoAtual;
	
    //DENTRO DO CONSTRUTOR IREMOS INFORMAR EM QUAL ESTADO COMEÇA
	public Orcamento(Double valor) {
		this.valor = valor;
        //CADA ESTADO PODERÁ CHAMAR OUTRO ESTADO, SEGUINDO A LOGICA DE NEGOCIO
		this.estadoAtual = new EmAprovacao();
	}
    
    public void aplicaDescontoExtra() {
		this.estadoAtual.aplicaDescontoExtra(this);
	}
	
    //MÉTODOS ABAIXO REPRESENTARAM OS ESTADOS
    /*
    * No inicio, o estado é EM_APROVACAO
    * todos estados possuiram APROVA, REPROVA e FINALIZA
    * portanto, ao chamar o metodo aprova do EM_APROVACAO, será alterado o Estado
    */
	public void aprovaOrcamento() {
		this.estadoAtual.aprova(this);
	}
	
	public void reprovaOrcamento() {
		this.estadoAtual.reprova(this);
	}
	
	public void finalizaOrcamento() {
		this.estadoAtual.finaliza(this);
	}
    
}

//----------------------------------------------------------------------------
//TESTANDO
public class TestaState {

	public static void main(String[] args) {
		Orcamento orcamento = new Orcamento(500.00);
		
        //Se inicio EM_APROVACAO
		orcamento.aplicaDescontoExtra();
		System.out.println(orcamento.getValor());
		//475, foi aplicado o DescontoExtra do EM_APROVACAO
        
		orcamento.aprovaOrcamento();
		orcamento.aplicaDescontoExtra();	
		System.out.println(orcamento.getValor());
        //465, foi aplicado o DescontoExtra do APROVADO
		
		orcamento.finalizaOrcamento();
		orcamento.aplicaDescontoExtra();
		System.out.println(orcamento.getValor());
        //465, não possui desconto extra, lançará expection
	}

}
```

## Builder <a name="builderpat"></a>

O Builder é utilizado para deixar a construção de uma classe mais simples! Imagine a classe nota fiscal, que recebe:

* Razão Social;
* CNPJ;
* Data;
* Valor;
* Lista de itens;
* Observações

Fazer a criação desta classe se torna algo trabalhoso, veja:

```java
List<Item> itens = Arrays.asList(new Item("Item1", 200.0)), new Item("Item2", 10;0));

NotaFiscal nf = 
    new NotaFiscal("Razao Social", 12345678910, LocalDate.now(), 500.00, itens, impostos, "Observações")
    
NotaFiscal nf2 =
    new NotaFiscal("Nova Razao Social", 99999999999, LocalDate.now(), 1000.00, itens, impostos, "Observações 2222")
```

### Aplicando o Builder

A ideia do builder, é **ter uma classe Criadora** que irá “montar” a classe através de métodos e depois invocalos, como:

```java
class BuilderDeNotaFiscal {
      private String razaoSocial;
      private String cnpj;
      private double valorTotal;
      private double impostos;
      private List<ItemDaNota> todosItens = new ArrayList<ItemDaNota>();

      public void paraEmpresa(String razaoSocial) {
        this.razaoSocial = razaoSocial;
      }

      public void comCnpj(String cnpj) {
        this.cnpj = cnpj;
      }
    
      public void comItem(ItemDaNota item) {
        todosItens.add(item);
        valorBruto += item.getValor();
        impostos += item.getValor() * 0.05;
      }
    
      //outros métodos
    
     public NotaFiscal constroi() {
        return new NotaFiscal(razaoSocial, cnpj, data, valorBruto, impostos, todosItens, observacoes);
      }
}
```

Desta forma, utilizando o criador de notas, podemos criar uma nota desta forma:

```java
public static void main(String[] args) {
    BuilderDeNotaFiscal builder = new CriadorDeNotaFiscal();
    builder.paraEmpresa("Igor");
    builder.comCnpj("123.456.789/0001-10");
    builder.comItem(new Item("item 1", 100.0));
    builder.comItem(new Item("item 2", 200.0));
    builder.comItem(new Item("item 3", 300.0));
    builder.comObservacoes("entregar nf pessoalmente");
    builder.naDataAtual();

    NotaFiscal nf = builder.constroi();
}
```

Para não repetir a palavra `builder`, podemos invez de ter métodos `void` termos métodos que retornam o próprio `NotaFiscalBuilder`, passando o this como retorno!

```java
 class NotaFiscalBuilder {
      private String razaoSocial;
      private String cnpj;
      private double valorTotal;
      private double impostos;
      private Calendar data;
      private String observacoes;

      private List<ItemDaNota> todosItens = new ArrayList<ItemDaNota>();

      public NotaFiscalBuilder paraEmpresa(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this; // retorno eu mesmo, o próprio builder, para que o cliente continue utilizando
      }

      public NotaFiscalBuilder comCnpj(String cnpj) {
        this.cnpj = cnpj;
        return this;
      }

      public NotaFiscalBuilder comItem(ItemDaNota item) {
        todosItens.add(item);
        valorBruto += item.getValor();
        impostos += item.getValor() * 0.05;
        return this;
      }

      // código continua aqui com a mesma ideia
      // substituindo void por NotaFiscalBuilder e retornando this em todos eles...
 }
```

```java
public static void main(String[] args) {
    NotaFiscal nf = new NotaFiscalBuilder().paraEmpresa("Igor")
        .comCnpj("123.456.789/0001-10")
        .comItem(new Item("item 1", 100.0))
        .comItem(new Item("item 2", 200.0))
        .comItem(new Item("item 3", 300.0))
        .comObservacoes("entregar nf pessoalmente")
        .naDataAtual()
        .constroi();
}
```

### Aplicando o builder ao Item

Note que o Item, temos que ficar passando um `new Item("String", 100.00)`, podemos criar um builder para ele também:

```java
class ItemDaNotaBuilder {
    private String descricao;
    private double valor;

    public ItemDaNotaBuilder comDescricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public ItemDaNotaBuilder comValor(double valor) {
        this.valor = valor;
        return this;
    }

    public ItemDaNota constroi() {
        return new ItemDaNota(descricao, valor);
    }
}
```

E então, poderiamos apenas chamar o método `constroi`

```java
public static void main(String[] args) {
    ItemDaNotaBuilder itemUm = new ItemDaNotaBuilder().comDescricao("Item 1")
        .comValor(100.0)
        .constroi();
    
    ItemDaNotaBuilder itemDois = new ItemDaNotaBuilder().comDescricao("Item 1")
        .comValor(100.0)
        .constroi();
    
    NotaFiscal nf = new NotaFiscalBuilder().paraEmpresa("Igor")
        .comCnpj("123.456.789/0001-10")
        .comItem(itemUm)
        .comItem(itemDois)
        .comObservacoes("entregar nf pessoalmente")
        .naDataAtual()
        .constroi();
}
```

## Observer<a name="observerpat"></a>

* Imagina que você precise avisar 3 sistemas externos (auditoria, financeiro, e agências), assim que uma conta bancária receber um depósito.
  * O Observer se encaixaria muito bem. Ele permite que você notifique e execute ações após algum acontecimento no seu sistema.

Imagine que depois de criarmos uma Nota Fiscal, através do nosso `NotaFiscalBuilder`, fosse necessário ações, como:

* enviaPorEmail(NotaFiscal nf);
* salvaNoBanco(NotaFiscal nf);
* enviaPorSms(NotaFiscal nf);
* imprime(NotaFiscal nf);

```java
class NotaFiscalBuilder {

    public NotaFiscal constroi() {
        NotaFiscal notaFiscal = new NotaFiscal(razaoSocial, cnpj, valorTotal, impostos, data, observacoes);

        // invocando as ações posteriores
        enviaPorEmail(notaFiscal);
        salvaNoBanco(notaFiscal);
        enviaPorSms(notaFiscal);
        imprime(notaFiscal);

        return notaFiscal;
    }

    // resto da classe aqui
}
```

Se criarmos estes métodos dentro da classe Builder, estaremos **aumentando o acoplamento a esta classe**. Para corrigir este problema, poderiamos então criar “miniClasses”:

```java
class NotaFiscalBuilder {
        // código aqui...

    public NotaFiscal constroi() {
        NotaFiscal notaFiscal = new NotaFiscal(razaoSocial, cnpj, valorTotal, impostos, data, observacoes);

        new EnviadorDeEmail().enviaPorEmail(notaFiscal);
        new NotaFiscalDao().salvaNoBanco(notaFiscal);
        new EnviadorDeSms().enviaPorSms(notaFiscal);
        new Impressora().imprime(notaFiscal);
    }
}


//"MINI-CLASSES"
public class EnviadorDeEmail {

    public void enviaPorEmail(NotaFiscal notaFiscal) {
        System.out.println("enviando por e-mail");
    }
}

public class NotaFiscalDao {
    public void salvaNoBanco(NotaFiscal notaFiscal) {
        System.out.println("salvando no banco");
    }
}

public class EnviadorDeSms {
    public void enviaPorSms(NotaFiscal notaFiscal) {
        System.out.println("enviando por sms");
    }
}

public class Impressora {
    public void imprime(NotaFiscal notaFiscal) {
        System.out.println("imprimindo notaFiscal");
    }
}
```

Porém, ainda mantivemos o **alto acoplamento **para a classe `NotaFiscalBuilder`.

### Aplicando o Observer

Com o observer, o 1º passo é verificar **o que se tem em comum entre as classes**, que em nosso exemplo, é que todas as classes possuem uma **ação**, sendo assim, poderiamos ter uma Interface que implemente uma ação!

```java
interface AcaoAposGerarNota {
    void executa(NotaFiscal notaFiscal);
}

public class EnviadorDeEmail implements AcaoAposGerarNota {
    public void executa(NotaFiscal notaFiscal) {
        System.out.println("enviando por e-mail");
    }
}

public class NotaFiscalDao implements AcaoAposGerarNota {
    public void executa(NotaFiscal notaFiscal) {
        System.out.println("salvando no banco");
    }
}

public class EnviadorDeSms implements AcaoAposGerarNota {
    public void executa(NotaFiscal notaFiscal) {
        System.out.println("enviando por sms");
    }
}

public class Impressora implements AcaoAposGerarNota {
    public void executa(NotaFiscal notaFiscal) {
        System.out.println("imprimindo notaFiscal");
    }
}
```

Desta forma, o método `constroi` não irá precisar saber quais ações estão sendo feitas, apenas irá executar o que estiver dentro da lista:

```java
public class NotaFiscalBuilder {
    private List<AcaoAposGerarNota> todasAcoesASeremExecutadas;
	//outros atributos omitidos
    
    public NotaFiscalBuilder() {
          this.todasAcoesASeremExecutadas = new ArrayList<AcaoAposGerarNota>();
        }

    public void adicionaAcao(AcaoAposGerarNota novaAcao) {
        this.todasAcoesASeremExecutadas.add(novaAcao);
    }
    
    
    //DEMAIS MÉTODOS    
    public NotaFiscal constroi() {

        NotaFiscal notaFiscal = new NotaFiscal(razaoSocial, cnpj, valorTotal, impostos, data, observacoes);

        for(AcaoAposGerarNota acao : todasAcoesASeremExecutadas) {
            acao.executa(notaFiscal);
        }
    }
}
```

Então, podemos adicionar a sequência de ações que quisermos:

```java
public class TesteAcao {
    public static void main(String[] args) {
        NotaFiscalBuilder builder = new NotaFiscalBuilder();
        builder.adicionaAcao(new EnviadorDeEmail());
        builder.adicionaAcao(new NotaFiscalDao());
        builder.adicionaAcao(new EnviadorDeSms());
        builder.adicionaAcao(new Impressora());

        NotaFiscal notaFiscal = builder.paraEmpresa("Caelum")
            .comCnpj("123.456.789/0001-10")
            .comItem(new ItemDaNota("item 1", 100.0))
            .comItem(new ItemDaNota("item 2", 200.0))
            .comItem(new ItemDaNota("item 3", 300.0))
            .comObservacoes("entregar notaFiscal pessoalmente")
            .naDataAtual()
            .constroi();
    }
}
```

## Factory <a name="factorypat"></a>
* Imagine um pedaço de código que irá se repetir exatamente igual em outras classes. 
	* A solução, criamos uma classe com um método que irá possuir o código X, onde as classes irão chamar este método;
* O padrão factory mais conhecido, é quando estamos aprendendo **JDBC**  e criamos a famosa classe **ConnectionFactory** - Este nome não é atoa!
* _Usamos uma fábrica quando temos que isolar o processo de criação de um objeto em um único lugar. Essa fábrica pode descobrir como criar o objeto dentro dela própria, mas geralmente ela não precisa de muitas informações para criar o objeto._

SEM FACTORY (a cada query será necessário escrever o caminho do banco):
```java
public class MeuAplicativo {

    public static void main(String[] args) throws SQLException {
        Connection conexao = 
                DriverManager.getConnection("jdbc:mysql://localhost:3306/banco", "usuario", "senha");

        PreparedStatement ps = conexao.prepareStatement("select * from ...");
        // codigo continua aqui
    }
}
```
COM FACTORY (instanciamos sempre a classe ConnectionFactory):
```java
public class ConnectionFactory {

    public Connection getConnection() {
        try {
            Connection conexao = 
                    DriverManager.getConnection("jdbc:mysql://localhost:3306/banco", "usuario", "senha");

            return conexao;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}


//MÉTODO MAIN
public class MeuAplicativo {

    public static void main(String[] args) throws SQLException {
        Connection conexao = new ConnectionFactory.getConnection();
		
		//métodos
	}
}
```

### BUILDER vs FACTORY <a name="factorybuilder"></a>
O Builder e o Factory, tem o mesmo intuito, otimizar a criação de classes, porém possuem semânticas diferentes.<br><br>
* Builder:
	* Quando temos classes com muitos atributos, como no exemplo da criação da Nota Fiscal

## FlyWeight <a name="flyweightpat"></a>
* Imagine que precisamos instanciar vários objetos parecidos de uma classe, por exemplo, imagine que temos a classe `NotasMusicais` e queremos criar uma música, onde cada nota será um objeto:
	```java
	List<NotasMusicais> musica = Arrays.asList(new Do(), new Re(), new Mi(), new Fa(), new Fa(), new Fa(), new Do(), new Re())
	```
Perceba que há apesar de serem objetos identicos, precisam ser instanciados várias vezes!

* O padrão FlyWeight, utiliza um **Mapa** `Map` que através do método `get` irá retornar o objeto!
```java
public class NotasMusicais {

		private static Map<String, Nota> notas = 
			new HashMap<String, Nota>();

		static {

			notas.put("do", new Do());
			notas.put("re", new Re());
			notas.put("mi", new Mi());
			notas.put("fa", new Fa());
			notas.put("sol", new Sol());
			notas.put("la", new La());
			notas.put("si", new Si());

		}
		public Nota pega(String nome) {
			return notas.get(nome);
		}
}

	//INTERFACE NOTA
	public interface Nota {
		String simbolo();
	}

	//NOTAS MUSICAIS
	public class Do implements Nota {

		@Override
		public String simbolo() {
		return "C";
		}
	}

	// re, mi, fa, sol, la, si...
	
	//IMPLEMETANDO
	public static void main(String[] args) {

        NotasMusicais notas = new NotasMusicais();

        List<Nota> doReMiFa = Arrays.asList(
            notas.pega("do"),    
            notas.pega("re"),    
            notas.pega("mi"),    
            notas.pega("fa"),    
            notas.pega("fa"),    
            notas.pega("fa"),    

            notas.pega("do"),    
            notas.pega("re"),    
            notas.pega("do"),    
            notas.pega("re"),
			//DEMAIS NOTAS
        );        
		
		//Se impremissimos o código, iriamos ver que a referência é ao mesmo objeto!
    }
}
```

## Memento <a name="mementopat"></a>
* Imagine que queremos fazer um **rollback**, ou o famoso **CTRL + Z** de um status,  ou seja, voltar ao que era anteriormente. O padrão de projeto **Memento** nos ajuda a voltar `Estados` anteriores!
	* Exemplo.: Imagine que temos os `Estados` de um `Contrato` como "NOVO", "EM_ANDAMENTO", "ACERTADO", "CONCLUIDO" e queremos tanto `avancar()` quanto `voltarEstado(X)`. Como fazer?

### Aplicando o Memento
O Memento é um padrão que irá utilizar:
* Classe mãe, no nosso caso `Contrato`;
* Classe que encapsulará `Contrato`, responsável pelos `Estados`;
* Classe responsável por **guardar os Estados**;

Classe Contrato:
```java
public enum TipoContrato {
    NOVO,
    EM_ANDAMENTO,
    ACERTADO,
    CONCLUIDO
}

public class Contrato {

    private Calendar data;
    private String cliente;
    private TipoContrato tipo;

    public Contrato(Calendar data, String cliente, TipoContrato tipo) {
        this.data = data;
        this.cliente = cliente;
        this.tipo = tipo;
    }
	
	//Getters
	
	//Método responsável por avançar os Estados
	 public void avanca() {
        if(tipo == TipoContrato.NOVO) tipo = TipoContrato.EM_ANDAMENTO;
        else if(tipo == TipoContrato.EM_ANDAMENTO) tipo = TipoContrato.ACERTADO;
        else if(tipo == TipoContrato.ACERTADO) tipo = TipoContrato.CONCLUIDO;
    }
	
	//método que irá armazenar o Estado
	public Estado salvaEstado() {
        return new Estado(new Contrato(data, cliente, tipo));
    }

}
```

Classe Estado:
```java
public class Estado {

    private Contrato contrato;

    public Estado(Contrato contrato) {
        this.contrato = contrato;
    }

    public Contrato getEstado() {
        return contrato;
    }

}
```

Classe Histórico:
```java
public class Historico {

    private List<Estado> estadosSalvos = new ArrayList<Estado>();

    public Estado pega(int index) {
        return estadosSalvos.get(index);
    }

    public void adiciona(Estado estado) {
        estadosSalvos.add(estado);
    }

}
```

Testando o Memento:
```java
public static void main(String[] args) {

        Historico historico = new Historico();

        Contrato contrato = new Contrato(Calendar.getInstance(), "Mauricio", TipoContrato.NOVO);
		//salvando a posição 0 -> Estado "NOVO"
        historico.adiciona(contrato.salvaEstado());
		
		//avançando para posição 1 -> Estado "EM_ANDAMENTO"
        contrato.avanca();
        historico.adiciona(contrato.salvaEstado());

		//avançando para posição 2 -> Estado "ACERTADO"
        contrato.avanca();
        historico.adiciona(contrato.salvaEstado());

		//avançando para posição 3 -> Estado "CONCLUÍDO"
        contrato.avanca();
        historico.adiciona(contrato.salvaEstado());

        System.out.println(contrato.getTipo()); //Irá imprimir "CONCLUÍDO"
        contrato.restaura(historico.pega(1)); //Selecionado posição 1
        System.out.println(contrato.getTipo()); //Irá imprimir "EM_ANDAMENTO"
}
```

## Bridges e Adapters <a name="bridgeadapterspat"></a>
* O padrão Bridge serve para abstrair a implementação de uma API;

Imagine o cenário onde temos uma implementação de uma API de Mapas, ou seja, podemos utilizar o `GoogleMaps` ou o `MapLink` por exemplo:

```java
public static void main (String[] args) {
	String url = "http://maps.google.com.br/maps?q=endereco+aqui"
	URL google = new URL(url);
	InputStream stream = google.openStream();
	
	//irá lançar excções e etc
}
```
O problema desta implementação é, e se quisessemos alterar a API? Imagine quantas outras classes não precisariamos alterar.... Para isto surgiu o padrão **Bridge**, quer serve para abstrair a implementação da API!
### Aplicando o Bridge
Para implementar o Bridge, precisamos de **Uma Interface**, que irá ser responsável pelo padrão da API
```java
public interface Mapa {
	String devolveMapa(String rua);
}


public class GoogleMaps implements Mapa {
	public String devolveMapa(String rua) {
		String url = "http://maps.google.com.br/maps?q=endereco+aqui"
		URL google = new URL(url);
		InputStream stream = google.openStream();
	}
}

public static void main (String[] args) {
	Mapa mapa = new GoogleMaps();
	//Mapa mapa = new MapLink();
	String conteudo = mapa.devolveMapa("Rua Vergueiro, 3185");
}
```
Desta forma, encapsulamos o nosso código do mapa, de uma forma que a aplicação não precisa saber a implementação, apenas passar a String!

### Adapter
O Adapter segue o mesmo modelo do Bridge, a diferença está em que o Bridge implementa serviços externos e o Adapter, implementa serviços internos!
* Exemplo: Imagine que temos que melhorar um projeto legado, ou seja, precisamos ir migrando em partes, pacotes antigos, classes antigas e etc. 
Com o Adapter, podemos implementar uma classe que abstrai classes antigas

A classe `Calendar` é um ótimo exemplo de uma classe "antiga" que foi substituida pelo `LocalDate`:
```java
class Relogio {
	public Calendar hoje() {
		return Calendar.getInstance();
	}
}

public static void main (String[] args) {
	Calendar agora = new Relogio().hoje();
}
```

## Command <a name="commandpat"></a>
É uma aplicação com um **Fluxo/Worflow**? Se sim, devemos utilizar esse padrão de projeto para nos ajudar a executar as etapas!
* Imaginemos que temos um fluxo de `Pedidos`, que seguirá as etapas:
```java
public enum Status {
	NOVO,
	PROCESSANDO,
	PAGO,
	ITEM_SEPARADO,
	ENTREGUE;
}

public class Pedido {

private String cliente;
private double valor;
private Status status;
private Calendar dataFinalizacao;

public Pedido(String cliente, double valor) {
super();
this.cliente = cliente;
this.valor = valor;
}
public String getCliente() {
return cliente;
}
public double getValor() {
return valor;
}
public Status getStatus() {
return status;
}

public void paga() {
status = Status.PAGO;
}

public Calendar getDataFinalizacao() {
return dataFinalizacao;
}

public void finaliza() {
dataFinalizacao = Calendar.getInstance();
status = Status.ENTREGUE;
}
}
```
O segredo deste Design Pattern é criar uma `FilaDeTrabalho `  e criar um padrão de `Comando`, ou seja, uma Interface:

```java
public class FilaDeTrabalho {

    private List<Comando> comandos;

    public FilaDeTrabalho() {
        comandos = new ArrayList<Comando>();
    }

    public void adiciona(Comando comando) {
        comandos.add(comando);
    }

	//Irá executar o método 'executa' de cada Comando
    public void processa() {
        for(Comando comando : comandos) {
            comando.executa();
        }
    }
}


//PADRÃO PARA COMANDO
public interface Comando {
	void executa();
}

//Para cada tipo de Comando, teremos uma nova classe que extenderá Comando
public class ConcluiPedido implements Comando {

    private Pedido pedido;

    public ConcluiPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    @Override
    public void executa() {
        pedido.finaliza();
    }

}

public class PagaPedido implements Comando {

    private Pedido pedido;

    public PagaPedido(Pedido pedido){
        this.pedido = pedido;
    }
    @Override
    public void executa() {
        pedido.paga();
    }

}
```

Testando o programa:
```java
public class Programa {

    public static void main(String[] args) {
        Pedido pedido1 = new Pedido("Mauricio", 150.0);
        Pedido pedido2 = new Pedido("Marcelo", 250.0);

        FilaDeTrabalho fila = new FilaDeTrabalho();

        fila.adiciona(new PagaPedido(pedido1));
        fila.adiciona(new PagaPedido(pedido2));
        fila.adiciona(new ConcluiPedido(pedido1));

        fila.processa();
    }
}
```

## Façades e Singleton <a name="singletonpat"></a>

Imagine que temos uma classe que possui diversas implementações:

```java
public class Programa {
    public static void main(String[] args) {
        String cpf = /// pega cpf
        Cliente cliente = new ClienteDao().buscaPorCpf(cpf);

        Fatura fatura = new Fatura(cliente, valor);

        Cobranca cobranca = new Cobranca(Tipo.BOLETO, fatura);
        cobranca.emite();

        ContatoCliente contato = new ContatoCliente(cliente, cobranca);
        contato.dispara();
    }
}
```

Deste modo, nosso código esta muito “aberto”. O **Façades** vem com o intuito de abstrair o código criando uma **Fachada**.

* Criemos uma classe que irá ser a fachada:

  ```java
  public class EmpresaFacade {
  
      public Cliente buscaCliente(String cpf) {
          return new ClienteDao().buscaPorCpf(cpf);
      }
      public Fatura criaFatura(Cliente cliente, double valor) {
          Fatura fatura = new Fatura(cliente, valor);
          return fatura;
      }
  
      public Cobranca geraCobranca(Fatura fatura) {
          Cobranca cobranca = new Cobranca(Tipo.BOLETO, fatura);
          cobranca.emite();
  
          return cobranca;
      }
  
      public ContatoCliente fazContato(Cliente cliente, Cobranca cobranca) {
          ContatoCliente contato = new ContatoCliente(cliente, cobranca);
          contato.dispara();
  
          return contato;
      }
  }
  ```

* Para implementar o programa agora, basta darmos new na nossa faixada:

  ```java
  public class Programa {
      public static void main(String[] args) {
   	    EmpresaFacade empresa = new EmpresaFacade();
          empresa.buscaCliente("cpf");
          empresa.criaFatura
  	    //demais métodos
      }
  }
  ```

  

### Singleton

O padrão Singleton, serve para impedir que por exemplo, a fachada seja implementada **mais de uma vez:**

```java
public class EmpresaFacadeSingleton {

    private static EmpresaFacade instancia;

    public EmpresaFacade getInstancia() {
        if(instancia == null) {
            instancia = new EmpresaFacade();
        }

        return instancia;
    }
}

//Para implementar:
EmpresaFacade fachada = new EmpresaFacadeSingleton().getInstancia();
```

## SOLID <a name="solidpat"></a>