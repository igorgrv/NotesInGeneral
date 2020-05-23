package chainOfResponsibility.desconto.modelo;

import java.util.ArrayList;
import java.util.List;

public class Orcamento {

	private double valor;
	private List<Item> itens = new ArrayList<Item>();

	public Orcamento(double valor) {
		this.valor = valor;
	}

	public double getValor() {
		return valor;
	}
	
	public void adiciona(Item item) {
		this.itens.add(item);
	}

	public List<Item> getItens() {
		return itens;
	}
	
}
