package chainOfResponsibility.desconto.modelo.descontos;

import chainOfResponsibility.desconto.modelo.Orcamento;

public class DescontoPorVendaCasada implements Desconto {

	private Desconto descontoQualquer;

	@Override
	public double desconta(Orcamento orcamento) {
		if (aconteceuVendaCasada(orcamento)) {
			return orcamento.getValor() * 0.05;
		} else {
			return descontoQualquer.desconta(orcamento);
		}
	}

	@Override
	public void setProximoDesconto(Desconto descontoQualquer) {
		this.descontoQualquer = descontoQualquer;
	}

	private boolean aconteceuVendaCasada(Orcamento orcamento) {
		return existeCanetaOuLapis(orcamento, "CANETA") && existeCanetaOuLapis(orcamento, "LAPIS");
	}

	public boolean existeCanetaOuLapis(Orcamento orcamento, String nomeItem) {
		return orcamento.getItens().stream()
				.anyMatch(item -> item.getNome().equals(nomeItem));
	}

}
