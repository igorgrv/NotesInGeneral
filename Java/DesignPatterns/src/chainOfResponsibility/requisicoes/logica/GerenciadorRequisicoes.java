package chainOfResponsibility.requisicoes.logica;

import chainOfResponsibility.requisicoes.modelo.Conta;
import chainOfResponsibility.requisicoes.modelo.Requisicao;
import chainOfResponsibility.requisicoes.modelo.Resposta;
import chainOfResponsibility.requisicoes.modelo.RespostaCSV;
import chainOfResponsibility.requisicoes.modelo.RespostaPorcento;
import chainOfResponsibility.requisicoes.modelo.RespostaXML;

public class GerenciadorRequisicoes {

	public void requisicaoFormato(Requisicao req, Conta conta) {
		Resposta respXml = new RespostaXML();
		Resposta respCsv = new RespostaCSV();
		Resposta respPorCento = new RespostaPorcento();
		
		respXml.setProximo(respCsv);
		respCsv.setProximo(respPorCento);
		
		respXml.resposta(req, conta);
	}
}
