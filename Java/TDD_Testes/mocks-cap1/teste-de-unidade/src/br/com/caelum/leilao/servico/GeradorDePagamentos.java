package br.com.caelum.leilao.servico;

import java.util.Calendar;
import java.util.List;

import br.com.caelum.leilao.dominio.Leilao;
import br.com.caelum.leilao.dominio.Pagamento;
import br.com.caelum.leilao.infra.dao.RepositoDePagamentos;
import br.com.caelum.leilao.infra.dao.RepositorioDeLeiloes;

public class GeradorDePagamentos {

	private RepositorioDeLeiloes leiloes;
	private RepositoDePagamentos pagamentos;
	private Avaliador avaliador;

	public GeradorDePagamentos(RepositorioDeLeiloes leiloes, RepositoDePagamentos pagamentos, Avaliador avaliador) {
		this.leiloes = leiloes;
		this.pagamentos = pagamentos;
		this.avaliador = avaliador;
	}
	
	public void gera () {
		List<Leilao> leiloesEncerrados = leiloes.encerrados();
		for (Leilao leilao : leiloesEncerrados) {
			avaliador.avalia(leilao);
			
			Pagamento pagamento = new Pagamento(avaliador.getMaiorLance(), Calendar.getInstance());
			pagamentos.salva(pagamento);
		}
	}
}
