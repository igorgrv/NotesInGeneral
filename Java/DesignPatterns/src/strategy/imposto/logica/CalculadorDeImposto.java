package strategy.imposto.logica;

import strategy.imposto.modelo.Imposto;
import strategy.imposto.modelo.Orcamento;

public class CalculadorDeImposto {

	public void realizaCalculoImposto(Orcamento orcamento, Imposto impostoQualquer) {
		double calculo = impostoQualquer.calcula(orcamento);
		System.out.println(calculo);
	}
}
