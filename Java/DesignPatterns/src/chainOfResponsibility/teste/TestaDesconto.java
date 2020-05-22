package chainOfResponsibility.teste;

import chainOfResponsibility.logica.CalculaDesconto;
import chainOfResponsibility.modelo.Item;
import chainOfResponsibility.modelo.Orcamento;

public class TestaDesconto {

	public static void main(String[] args) {
		CalculaDesconto calculador = new CalculaDesconto();
		
		Orcamento orcamento = new Orcamento(500.00);
		orcamento.adiciona(new Item("CANETA", 250.00));
		orcamento.adiciona(new Item("LAPIS", 250.00));
		
		double desconto = calculador.aplicaDesconto(orcamento);
		
		System.out.println(desconto);
	}
}
