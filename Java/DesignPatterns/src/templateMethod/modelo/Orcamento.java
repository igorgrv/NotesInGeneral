package templateMethod.modelo;

import java.util.ArrayList;
import java.util.List;

public class Orcamento {

	private Double valor;
	private List<Item> itens = new ArrayList<Item>();

	public Orcamento(Double valor) {
		this.valor = valor;
	}

	public Double getValor() {
		return valor;
	}

	public List<Item> getItens() {
		return itens;
	}

}
