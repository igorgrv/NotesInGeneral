package state.modelo;

import java.util.ArrayList;
import java.util.List;

public class Orcamento {

	protected Double valor;
	protected EstadoDeUmOrcamento estadoAtual;
	
	private List<Item> itens = new ArrayList<Item>();

	public Orcamento(Double valor) {
		this.valor = valor;
		this.estadoAtual = new EmAprovacao();
	}

	public Double getValor() {
		return valor;
	}

	public List<Item> getItens() {
		return itens;
	}

	public void aplicaDescontoExtra() {
		this.estadoAtual.aplicaDescontoExtra(this);
	}
	
	public void aprovaOrcamento() {
		this.estadoAtual.aprova(this);
	}
	
	public void reprovaOrcamento() {
		this.estadoAtual.reprova(this);
	}
	
	public void finalizaOrcamento() {
		this.estadoAtual.finaliza(this);
	}

}
