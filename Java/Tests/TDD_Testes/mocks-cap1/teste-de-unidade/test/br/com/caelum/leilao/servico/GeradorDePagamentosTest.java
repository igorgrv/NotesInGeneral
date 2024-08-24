package br.com.caelum.leilao.servico;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.Test;
import org.mockito.ArgumentCaptor;

import br.com.caelum.leilao.builder.CriadorDeLeilao;
import br.com.caelum.leilao.dominio.Leilao;
import br.com.caelum.leilao.dominio.Pagamento;
import br.com.caelum.leilao.dominio.Usuario;
import br.com.caelum.leilao.infra.dao.RepositoDePagamentos;
import br.com.caelum.leilao.infra.dao.RepositorioDeLeiloes;

public class GeradorDePagamentosTest {

	@Test
	public void deveGerarPagamentoParaUmLeilaoEncerrado() {
		Avaliador avaliador = new Avaliador();
		Leilao leilao = new CriadorDeLeilao()
				.para("TV")
				.lance(new Usuario("igor"), 200.00)
				.lance(new Usuario("Stephanie"), 250.00)
				.constroi();
		
		//MOCKAMOS AQUILO QUE IREMOS UTILIZAR MÉTODOS NOS TESTES
		RepositoDePagamentos pagamentos = mock(RepositoDePagamentos.class);
		RepositorioDeLeiloes leiloes = mock(RepositorioDeLeiloes.class);
		
		when(leiloes.encerrados()).thenReturn(asList(leilao));
		
		GeradorDePagamentos gerador = new GeradorDePagamentos(leiloes, pagamentos, avaliador);
		gerador.gera();
		
		 // criamos o ArgumentCaptor que sabe capturar um Pagamento
	    ArgumentCaptor<Pagamento> argumento = ArgumentCaptor.forClass(Pagamento.class);
	    // capturamos o Pagamento que foi passado para o método salvar
	    verify(pagamentos).salva(argumento.capture());
	    
	    Pagamento pagamentoGerado = argumento.getValue();
        assertEquals(250.0, pagamentoGerado.getValor(), 0.00001);
	}

}
