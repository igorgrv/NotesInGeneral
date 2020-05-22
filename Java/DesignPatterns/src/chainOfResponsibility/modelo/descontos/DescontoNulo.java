package chainOfResponsibility.modelo.descontos;

import chainOfResponsibility.modelo.Orcamento;

public class DescontoNulo implements Desconto {

	@Override
	public double desconta(Orcamento orcamento) {
		return 0;
	}

	@Override
	public void setProximoDesconto(Desconto d2) {
	}

}
