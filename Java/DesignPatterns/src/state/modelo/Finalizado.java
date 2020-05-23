package state.modelo;

public class Finalizado implements EstadoDeUmOrcamento{

	@Override
	public void aplicaDescontoExtra(Orcamento orcamento) {
		throw new RuntimeException("Orçamento finalizado não pode dar desconto");
	}

	@Override
	public void aprova(Orcamento orcamento) {
		throw new RuntimeException("O orcamento ja esta finalizado");
	}

	@Override
	public void reprova(Orcamento orcamento) {
		throw new RuntimeException("O orcamento ja esta finalizado");
	}

	@Override
	public void finaliza(Orcamento orcamento) {
		throw new RuntimeException("O orcamento ja esta finalizado");
	}

}
