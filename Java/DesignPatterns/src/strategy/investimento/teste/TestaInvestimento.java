package strategy.investimento.teste;

import strategy.investimento.logica.RealizadorDeInvestimentos;
import strategy.investimento.modelo.Investidor;
import strategy.investimento.modelo.Investimento;
import strategy.investimento.modelo.Moderado;

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
