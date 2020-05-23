package state.teste;

import state.modelo.Orcamento;

public class TestaState {

	public static void main(String[] args) {
		Orcamento orcamento = new Orcamento(500.00);
		
		orcamento.aplicaDescontoExtra();
		
		System.out.println(orcamento.getValor());
		
		orcamento.aprovaOrcamento();
		orcamento.aplicaDescontoExtra();
		
		System.out.println(orcamento.getValor());
		
		orcamento.finalizaOrcamento();
		orcamento.aplicaDescontoExtra();
		
		System.out.println(orcamento.getValor());
	}

}
