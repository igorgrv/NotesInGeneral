
# Sumário
1. [Design Patterns](#designpatterns)
	* [Strategy](#strategypat)

## <a name="designpatterns"></a>Design Patterns
Os design patterns, vieram para resolver problemas comuns no dia a dia dos desenvolvedores, como:
* Classes gigantescas;
* Métodos cheios de ifs | fors;
* Necessidade de efetuar mudanças em diversas classes por causa de uma única mudança (**_métodos muito acoplados_**)

Ao criar um projeto, devemos pensar sempre na possibilidade de, **novidades e alterações**, o que nem sempre é fácil de prever, então para isso, foram dados nomes alguns procedimentos, conhecidos como **_Padrões de Projetos_** , que buscam  ter classes com:
* Baixo acoplamento;
* Alta coesão!

## <a name="strategypat"></a>Strategy
Dado o desenvolvimento:
* Calcular os impostos de um orçamento, onde dado um valor e o tipo de imposto, deve retornar o valor total a ser pago daquele orçamento;

Perguntas:
* Quantos impostos teremos?
* Qual vai ser a alíquota para cada imposto?

Possíveis soluções:
1. Criar a classe Orçamento, recebe construtor (valor e uma `List<Itens>`);
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
A idéia de implementar o Strategy, é fazer com que o `CalculadorDeImpostos` receba um tipo **Genérico** de impostos, de modo que a **regra de negócio, fique com cada imposto**! <br><br>Cada imposto terá:
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
	