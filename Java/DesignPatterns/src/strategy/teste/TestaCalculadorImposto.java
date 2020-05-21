package strategy.teste;

import strategy.logica.CalculadorDeImposto;
import strategy.modelo.ICCC;
import strategy.modelo.Imposto;
import strategy.modelo.Orcamento;

public class TestaCalculadorImposto {

	public static void main(String[] args) {
		CalculadorDeImposto calculador = new CalculadorDeImposto();
		Orcamento orcamento = new Orcamento(10000.00);
//		Imposto icms = new ICMS();
//		Imposto iss = new ISS();
		Imposto iccc = new ICCC();
		
		calculador.realizaCalculoImposto(orcamento , iccc);
//		calculador.realizaCalculoImposto(orcamento , iss);
		
		System.out.println(calculador);
	}
}
