package state.modelo;

public class Reprovado implements EstadoDeUmOrcamento{

	@Override
	public void aplicaDescontoExtra(Orcamento orcamento) {
		throw new RuntimeException("Orcamento reprovado não pode dar desconto");
	}

	@Override
	public void aprova(Orcamento orcamento) {
		throw new RuntimeException("O orcamento reprovado não pode ser aprovado");
	}

	@Override
	public void reprova(Orcamento orcamento) {
		throw new RuntimeException("O orcamento ja esta reprovado");
	}

	@Override
	public void finaliza(Orcamento orcamento) {
		orcamento.estadoAtual = new Finalizado();
	}

}
