package chainOfResponsibility.desconto.logica;

import chainOfResponsibility.desconto.modelo.Orcamento;
import chainOfResponsibility.desconto.modelo.descontos.Desconto;
import chainOfResponsibility.desconto.modelo.descontos.DescontoNulo;
import chainOfResponsibility.desconto.modelo.descontos.DescontoPorVendaCasada;
import chainOfResponsibility.desconto.modelo.descontos.DescontoSeOrcamentoMaiorQuinhentosReais;
import chainOfResponsibility.desconto.modelo.descontos.DescontoSeTiverCincoItens;

public class CalculaDesconto {

	public double aplicaDesconto(Orcamento orcamento) {
		Desconto d1 = new DescontoSeTiverCincoItens();
		Desconto d2 = new DescontoSeOrcamentoMaiorQuinhentosReais();
		Desconto d3 = new DescontoPorVendaCasada();
		Desconto d4 = new DescontoNulo();
		
		//caso d1 falhe, será chamado d2 e assim em diante
		d1.setProximoDesconto(d2);
		d2.setProximoDesconto(d3);
		d3.setProximoDesconto(d4);
		
		return d1.desconta(orcamento);
	}
}
