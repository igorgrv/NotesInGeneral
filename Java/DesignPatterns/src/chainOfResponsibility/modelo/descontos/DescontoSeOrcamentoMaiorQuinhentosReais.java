package chainOfResponsibility.modelo.descontos;

import chainOfResponsibility.modelo.Orcamento;

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
