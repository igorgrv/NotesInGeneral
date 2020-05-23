package chainOfResponsibility.requisicoes.teste;

import chainOfResponsibility.requisicoes.logica.GerenciadorRequisicoes;
import chainOfResponsibility.requisicoes.modelo.Conta;
import chainOfResponsibility.requisicoes.modelo.Formato;
import chainOfResponsibility.requisicoes.modelo.Requisicao;

public class TestaRequisicao {

	public static void main(String[] args) {
		Conta conta = new Conta("Igor", 500.00);
		Requisicao reqCsv = new Requisicao(Formato.CSV);
		Requisicao reqXml = new Requisicao(Formato.XML);
		Requisicao reqPercentual = new Requisicao(Formato.PORCENTO);
		
		GerenciadorRequisicoes gerenciador = new GerenciadorRequisicoes();
		gerenciador.requisicaoFormato(reqPercentual, conta);
		
		
	}
}
