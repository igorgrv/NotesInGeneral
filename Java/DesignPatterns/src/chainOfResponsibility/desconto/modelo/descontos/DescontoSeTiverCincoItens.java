package chainOfResponsibility.desconto.modelo.descontos;

import chainOfResponsibility.desconto.modelo.Orcamento;

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
