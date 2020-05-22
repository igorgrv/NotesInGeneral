
# Sumário
1. [Design Patterns](#designpatterns)
    * [Strategy](#strategypat)
    * [Chain of Responsibility](#chainpat)

## Design Patterns<a name="designpatterns"></a> 
Os design patterns, vieram para resolver problemas comuns no dia a dia dos desenvolvedores, como:
* Classes gigantescas;
* Métodos cheios de ifs | fors;
* Necessidade de efetuar mudanças em diversas classes por causa de uma única mudança (**_métodos muito acoplados_**)

Ao criar um projeto, devemos pensar sempre na possibilidade de, **novidades e alterações**, o que nem sempre é fácil de prever, então para isso, foram dados nomes alguns procedimentos, conhecidos como **_Padrões de Projetos_** , que buscam  ter classes com:
* Baixo acoplamento;
* Alta coesão!

## Strategy<a name="strategypat"></a>
**Quando utilizar o padrão Strategy?**

* _O padrão strategy é muito útil quando temos um conjunto de algoritmos similares, e precisamos alternar entre eles em diferentes pedaços da aplicação._

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

**Dado o desenvolvimento:**

* Se o cliente comprou mais de 5 ítens, ele recebe 10% de desconto;
* Se o orçamento for maior que R$ 500,00, ele recebe 7% de desconto, e assim por diante.

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

	void setProximoDesconto(Desconto d2);
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
		Desconto d3 = new DescontoNulo();
		
		//chain of resposibility, aplicando a sequencia
		d1.setProximoDesconto(d2);
		d2.setProximoDesconto(d3);
		
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





























