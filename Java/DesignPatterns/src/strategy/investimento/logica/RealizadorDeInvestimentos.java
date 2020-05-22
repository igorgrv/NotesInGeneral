package strategy.investimento.logica;

import strategy.investimento.modelo.Investidor;
import strategy.investimento.modelo.Investimento;

public class RealizadorDeInvestimentos {

	public void realizaInvestimento(Investidor investidor, Investimento tipoQualquer) {
		double investimento = tipoQualquer.investe(investidor);
		investidor.deposita(investimento * 0.75);
		System.out.println("Novo saldo:" + investidor.getSaldo());
	}
}
