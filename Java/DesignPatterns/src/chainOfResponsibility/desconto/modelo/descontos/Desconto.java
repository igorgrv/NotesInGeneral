package chainOfResponsibility.desconto.modelo.descontos;

import chainOfResponsibility.desconto.modelo.Orcamento;

public interface Desconto {

	double desconta(Orcamento orcamento);

	void setProximoDesconto(Desconto descontoQualquer);
}
