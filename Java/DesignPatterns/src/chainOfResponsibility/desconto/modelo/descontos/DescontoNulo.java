package chainOfResponsibility.desconto.modelo.descontos;

import chainOfResponsibility.desconto.modelo.Orcamento;

public class DescontoNulo implements Desconto {

	@Override
	public double desconta(Orcamento orcamento) {
		return 0;
	}

	@Override
	public void setProximoDesconto(Desconto d2) {
	}

}
