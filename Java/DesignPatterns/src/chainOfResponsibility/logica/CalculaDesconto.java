package chainOfResponsibility.logica;

import chainOfResponsibility.modelo.Orcamento;
import chainOfResponsibility.modelo.descontos.Desconto;
import chainOfResponsibility.modelo.descontos.DescontoNulo;
import chainOfResponsibility.modelo.descontos.DescontoSeOrcamentoMaiorQuinhentosReais;
import chainOfResponsibility.modelo.descontos.DescontoSeTiverCincoItens;

public class CalculaDesconto {

	public double aplicaDesconto(Orcamento orcamento) {
		Desconto d1 = new DescontoSeTiverCincoItens();
		Desconto d2 = new DescontoSeOrcamentoMaiorQuinhentosReais();
		Desconto d3 = new DescontoNulo();
		
		//caso d1 falhe, será chamado d2 e assim em diante
		d1.setProximoDesconto(d2);
		d2.setProximoDesconto(d3);
		
		return d1.desconta(orcamento);
	}
}
