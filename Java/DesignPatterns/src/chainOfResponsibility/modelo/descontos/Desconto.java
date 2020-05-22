package chainOfResponsibility.modelo.descontos;

import chainOfResponsibility.modelo.Orcamento;

public interface Desconto {

	double desconta(Orcamento orcamento);

	void setProximoDesconto(Desconto d2);
}
