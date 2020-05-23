package templateMethod.modelo;

public class IKCV extends ImpostoTemplate {

	public boolean temUmItemQueCustaMaisCemReais(Orcamento orcamento) {
		return orcamento.getItens().stream().anyMatch(orc -> orc.getValor() >= 100);
	}

	@Override
	public boolean seMaiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() > 500 && temUmItemQueCustaMaisCemReais(orcamento);
	}

	@Override
	public double maiorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.1;
	}

	@Override
	public double menorTaxacao(Orcamento orcamento) {
		return orcamento.getValor() * 0.6;
	}

}
