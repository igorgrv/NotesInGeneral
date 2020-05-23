package chainOfResponsibility.desconto.teste;

import chainOfResponsibility.desconto.logica.CalculaDesconto;
import chainOfResponsibility.desconto.modelo.Item;
import chainOfResponsibility.desconto.modelo.Orcamento;

public class TestaDesconto {

	public static void main(String[] args) {
		CalculaDesconto calculador = new CalculaDesconto();
		
		Orcamento orcamento = new Orcamento(500.00);
		orcamento.adiciona(new Item("CANETA", 150.00));
		orcamento.adiciona(new Item("LAPIS", 150.00));
		
		double desconto = calculador.aplicaDesconto(orcamento);
		
		System.out.println(desconto);
	}
}
