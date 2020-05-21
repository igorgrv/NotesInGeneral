package strategy.logica;

import strategy.modelo.Imposto;
import strategy.modelo.Orcamento;

public class CalculadorDeImposto {

	public void realizaCalculoImposto(Orcamento orcamento, Imposto impostoQualquer) {
		double calculo = impostoQualquer.calcula(orcamento);
		System.out.println(calculo);
	}
}
